import { Link, useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../context/PostContext';
import { MdOutlineArrowBack } from 'react-icons/md';

const PostPage = () => {
	const { id } = useParams();
	const { posts, removePost } = usePosts();
	const navigate = useNavigate();
	const post = posts.find(post => post.id === id);

	const handleDelete = () => {
		window.confirm('Are you sure you want to delete this post?') &&
			setTimeout(() => {
				removePost(id);
				navigate('/posts');
			}, 500);
	};

	if (!post) {
		return <div>Loading...</div>;
	}

	return (
		<div className='p-14 w-full min-h-screen'>
			<div className='flex shadow shadow-black p-10 gap-10 mx-44 bg-glow2'>
				<div className='bg-neutral-200 w-32 h-28 flex justify-center items-center rounded-full'>
					<img
						src={post.image}
						alt='random'
						className='p-1 rounded-full shadow'
					/>
				</div>
				<div className='flex flex-col gap-4 w-full'>
					<div className='flex justify-between items-center'>
						<h1 className='text-2xl font-semibold'>{post.title}</h1>
						<Link to='/posts'>
							<MdOutlineArrowBack className='text-3xl bg-neutral-400 text-white p-1 rounded hover:bg-neutral-500 hover:cursor-pointer' />
						</Link>
					</div>
					<hr />
					<p className='h-52 text-lg'>{post.description}</p>
					<div className='flex gap-2 justify-end'>
						<button className='bg-neutral-400 rounded py-2 px-2 text-md hover:bg-neutral-500'>
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
			</div>
		</div>
	);
};

export default PostPage;
