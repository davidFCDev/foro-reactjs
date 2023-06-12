import { useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostContext';
import { MdDelete } from 'react-icons/md';

const HomePage = () => {
	const navigate = useNavigate();
	const {
		posts,
		post,
		setPost,
		createNewPost,
	} = usePosts();

	const addNewPost = e => {
		e.preventDefault();
		createNewPost();
	};

	const redirectToPost = postId => {
		navigate(`/posts/${postId}`);
	};

	return (
		<section className='flex py-10 gap-10'>
			<form onSubmit={addNewPost} className='flex flex-col gap-5 px-5 w-72'>
				<h1 className='font-semibold text-2xl'>New Post</h1>
				<div className='flex flex-col gap-2'>
					<input
						type='text'
						placeholder='Title'
						autoFocus
						value={post.title}
						onChange={e => setPost({ ...post, title: e.target.value })}
						className='p-2 rounded text-neutral-700 focus:bg-neutral-100 focus:outline-none'
					/>
					<textarea
						placeholder='Description'
						value={post.description}
						onChange={e => setPost({ ...post, description: e.target.value })}
						rows={4}
						className='p-2 rounded text-neutral-700 focus:bg-neutral-100 focus:outline-none'
					/>
					<button className='bg-red-600 rounded py-2 text-md hover:bg-red-500'>
						Add
					</button>
				</div>
			</form>

			<div className='w-full flex flex-col gap-5'>
				<h1 className='font-semibold text-2xl'>Posts ({posts.length})</h1>
				<div className='flex flex-col gap-3'>
					{posts.map(post => {
						return (
							<div
								key={post.id}
								className='flex gap-5 items-center w-96'
								onClick={() => redirectToPost(post.id)}
							>
								<img
									src='https://laverdadnoticias.com/__export/1596653493935/sites/laverdad/img/2020/08/05/rick_and_morty_cambios_evolucion.jpg_1902800913.jpg'
									alt='random'
									className='w-10 h-10 rounded-full'
								/>
								<div className='flex items-center justify-between w-full'>
									<h2 className='text-2xl hover:underline hover:cursor-pointer'>
										{post.title}
									</h2>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default HomePage;
