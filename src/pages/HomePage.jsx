import { useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostContext';
import { useEffect } from 'react';
import { getApiData } from '../controllers/apiController';
import { BiRightArrow } from 'react-icons/bi';

const HomePage = () => {
	const navigate = useNavigate();
	const { posts, post, setPost, createNewPost } = usePosts();

	const addNewPost = e => {
		e.preventDefault();
		const currentDate = new Date();
		const updatedPost = { ...post, createdAt: currentDate };
		createNewPost(updatedPost);
		console.log(updatedPost);
	};

	const redirectToPost = postId => {
		navigate(`/posts/${postId}`);
	};

	useEffect(() => {
		const fetchRandomImage = async () => {
			const response = await getApiData();
			const image = response.data.image;
			setPost(prevPost => ({ ...prevPost, image }));
		};

		if (posts.length > 0) {
			fetchRandomImage();
		}
	}, [posts]);

	return (
		<div className='w-full min-h-screen'>
			<h1 className='text-2xl font-semibold text-center p-3 border-b bg-red-600'>
				Welcome to R&M forum
			</h1>
			<section className='flex py-5 gap-20'>
				<form onSubmit={addNewPost} className='flex flex-col gap-5 px-5 w-72'>
					<h1 className='font-semibold text-2xl flex items-center gap-1'>
						<BiRightArrow />
						New Post
					</h1>
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
					<h1 className='font-semibold text-2xl flex items-center gap-1'>
						<BiRightArrow /> Posts ({posts.length})
					</h1>
					<div className='flex flex-wrap gap-3'>
						{posts.map(post => {
							return (
								<div
									key={post.id}
									className='flex gap-6 items-center w-96 border p-4 border-neutral-700 hover:border-neutral-500 hover:cursor-pointer'
									onClick={() => redirectToPost(post.id)}
								>
									<img
										src={post.image}
										alt='random'
										className='w-14 h-14 rounded-full shadow shadow-neutral-500'
									/>
									<div className='flex flex-col w-full'>
										<h2 className='text-2xl'>{post.title}</h2>
										<p className='text-xs'>Created: {post.createdAt}</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>
		</div>
	);
};

export default HomePage;
