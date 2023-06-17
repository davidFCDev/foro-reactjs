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
		image: '',
		createdAt: '',
		liked: false,
		comments: [],
	};
	const [post, setPost] = useState(initialState);
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const initializePosts = async () => {
		try {
			const fetchedPosts = await getPosts();
			setPosts([...fetchedPosts]);
		} catch (error) {
			console.error(error);
		}
	};

	const createNewPost = async () => {
		try {
			await createPost(post);
			setPost(initialState);
			toast.success('Post added successfully!');
			initializePosts();
		} catch (error) {
			console.error(error);
		}
	};

	const removePost = async id => {
		try {
			await deletePost(id);
			toast.success('Post deleted successfully!');
			initializePosts();
		} catch (error) {
			console.error(error);
		}
	};

	const togglePostLiked = async id => {
		try {
			const updatedPosts = posts.map(post =>
				post.id === id ? { ...post, liked: !post.liked } : post
			);
			setPosts(updatedPosts);
			const postFound = updatedPosts.find(post => post.id === id);
			await updatePost(postFound);
		} catch (error) {
			console.error(error);
		}
	};

	const updatePostComments = async (id, comments) => {
		try {
			const updatedPosts = posts.map(post =>
				post.id === id ? { ...post, comments } : post
			);
			setPosts(updatedPosts);
			const postFound = updatedPosts.find(post => post.id === id);
			await updatePost(postFound);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		initializePosts();
	}, []);

	return (
		<postContext.Provider
			value={{
				createNewPost,
				initializePosts,
				updatePostComments,
				removePost,
				togglePostLiked,
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
