import { useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../context/PostContext';

const PostPage = () => {
	const { id } = useParams();
	const { posts, removePost } = usePosts();
	const navigate = useNavigate();
	const post = posts.find(post => post.id === id);

	const handleDelete = () => {
		removePost(post.id);
		navigate('/posts');
	};

	if (!post) {
		return <div>Loading...</div>;
	}

	return (
		<div className='p-14 w-full min-h-screen'>
			<div className='flex flex-col gap-3 border p-5'>
				<div className='flex justify-between items-center'>
					<h1 className='text-2xl'>{post.title}</h1>
					<div className='flex gap-2'>
						<button className='bg-red-400 rounded py-2 px-2 text-md hover:bg-red-500'>
							Edit
						</button>
						<button
							className='bg-red-600 rounded py-2 px-2 text-md hover:bg-red-500'
							onClick={handleDelete}
						>
							Delete
						</button>
					</div>
				</div>
				<hr />
				<p className='h-52 text-lg'>{post.description}</p>
			</div>
		</div>
	);
};

export default PostPage;
