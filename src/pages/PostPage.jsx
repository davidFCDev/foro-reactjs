import { Link, useNavigate, useParams } from 'react-router-dom';
import { usePosts } from '../context/PostContext';
import { MdOutlineArrowBack, MdOutlineKeyboardReturn } from 'react-icons/md';

const PostPage = () => {
	const { id } = useParams();
	const { posts, removePost, togglePostLiked } = usePosts();
	const navigate = useNavigate();
	const selectedPost = posts.find(post => post.id === id);

	const handleDelete = () => {
		window.confirm('Are you sure you want to delete this post?') &&
			setTimeout(() => {
				removePost(id);
				navigate('/posts');
			}, 500);
	};

	const handleLike = async () => {
    await togglePostLiked(id);
  };
	console.log(posts[0].liked);

	if (!selectedPost) {
		return (
			<div className='flex flex-col items-center w-full'>
				<img src='/notFound.png' alt='notfound' className='w-72' />
				<Link
					to='/posts'
					className='hover:underline text-3xl text-neutral-100 flex gap-2 items-center'
				>
					Return to the main page!{' '}
					<MdOutlineKeyboardReturn className='text-white' />
				</Link>
			</div>
		);
	}

	return (
		<div className='p-14 w-full min-h-screen'>
			<div className='flex shadow shadow-black p-10 gap-10 mx-44 bg-glow2'>
				<div className='bg-neutral-200 w-32 h-28 flex justify-center items-center rounded-full'>
					<img
						src={selectedPost.image}
						alt='random'
						className='p-1 rounded-full shadow'
					/>
				</div>
				<div className='flex flex-col gap-4 w-full'>
					<div className='flex justify-between items-center'>
						<h1 className='text-2xl font-semibold'>{selectedPost.title}</h1>
						<Link to='/posts'>
							<MdOutlineArrowBack className='text-3xl bg-glow text-white p-1 rounded hover:scale-110 hover:cursor-pointer' />
						</Link>
					</div>
					<hr />
					<p className='h-52 text-lg'>{selectedPost.description}</p>
					<div className='flex gap-2 justify-end'>
						<button
							className='bg-blue-600 rounded py-2 px-2 text-md hover:bg-blue-500'
							onClick={handleLike}
						>
							{selectedPost.liked === true ? 'Unlike' : 'Like'}
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
