import { createContext, useContext, useEffect, useState } from 'react';
import {
	createPost,
	getPosts,
	deletePost,
	updatePost,
} from '../controllers/postsController';
import { toast } from 'react-hot-toast';

const postContext = createContext();

export const usePosts = () => {
	const context = useContext(postContext);
	if (!context) {
		throw new Error('usePosts must be used within a PostsProvider');
	}
	return context;
};

export function PostsProvider({ children }) {
	const [mode, setMode] = useState('add');
	const initialState = {
		title: '',
		description: '',
	};
	const [post, setPost] = useState(initialState);
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const initializePosts = async () => {
		getPosts()
			.then(t => setPosts([...t]))
			.catch(e => console.error(e));
	};

	const createNewPost = async () => {
		await createPost(post);
		setPost(initialState);
		toast.success('Post added successfully!');
		initializePosts();
	};

	const editPost = id => {
		setMode('update');
		const postToEdit = posts.find(t => t.id === id);
		setPost({ ...postToEdit });
	};

	const updateExistingPost = async () => {
		await updatePost(post);
		toast.success('Post updated successfully!');
		initializePosts();
		setMode('add');
		setPost(initialState);
	};

	const removePost = async id => {
		await deletePost(id);
		toast.success('Post deleted successfully!');
		initializePosts();
	};

	useEffect(() => {
		initializePosts();
	}, []);

	return (
		<postContext.Provider
			value={{
				createNewPost,
				editPost,
				updateExistingPost,
				initializePosts,
				removePost,
				setMode,
				setPost,
				setPosts,
				setError,
				setLoading,
				error,
				loading,
				mode,
				post,
				posts,
			}}
		>
			{children}
		</postContext.Provider>
	);
}
