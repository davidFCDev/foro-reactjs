import { useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostContext';
import { useEffect, useState } from 'react';
import { getApiData } from '../controllers/apiController';
import { BiRightArrow } from 'react-icons/bi';
import {RiRadioButtonLine} from 'react-icons/ri';

const HomePage = () => {
	const navigate = useNavigate();
	const { posts, post, setPost, createNewPost } = usePosts();
	const [currentTime, setCurrentTime] = useState(new Date());

	const addNewPost = e => {
		e.preventDefault();
		createNewPost();
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
		fetchRandomImage();
	}, [posts]);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className='w-full min-h-screen'>
			<h1 className='text-4xl font-semibold text-center py-2 '>
				Main forum
			</h1>
			<section className='flex py-5 gap-20'>
				<form onSubmit={addNewPost} className='flex flex-col gap-5 px-5 w-72'>
					<h1 className='font-semibold text-2xl flex items-center gap-1 bg-g rounded p-1'>
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
							className='p-2 rounded text-neutral-700 bg-neutral-100 focus:bg-neutral-200 focus:outline-none'
						/>
						<textarea
							placeholder='Description'
							value={post.description}
							onChange={e => setPost({ ...post, description: e.target.value })}
							rows={4}
							className='p-2 rounded text-neutral-700 bg-neutral-100 focus:bg-neutral-200 focus:outline-none'
						/>
						<button className='bg-red-600 rounded py-2 text-md hover:bg-red-500'>
							Add
						</button>
					</div>
				</form>

				<div className='w-full flex flex-col gap-5'>
					<h1 className='font-semibold text-2xl flex items-center gap-1'>
						<BiRightArrow /> Posts ({posts.length}):
					</h1>
					<div className='flex flex-col gap-2'>
						{posts.map(post => {
							const postCreatedAt = post.createdAt.toDate();
							const timeDiffMinutes = Math.floor(
								(currentTime - postCreatedAt) / (1000 * 60)
							);
							const isNewPost = timeDiffMinutes <= 10;
							return (
								<div
									key={post.id}
									className='flex gap-6 items-center w-[80%] border px-5 py-2 bg-glow2 border-neutral-600 hover:border-neutral-400 hover:cursor-pointer'
									onClick={() => redirectToPost(post.id)}
								>
									<img
										src={post.image}
										alt='random'
										className='w-10 h-10 rounded-full shadow shadow-neutral-500'
									/>
									<div className='flex w-full items-center justify-between'>
										<div>
											<h2 className='text-2xl'>{post.title}</h2>
										</div>
										<div className='text-sm flex items-center gap-4'>
											{isNewPost && (
												<p className='text-sm flex items-center gap-4'>
													<span className='text-red-500 animate-pulse'>
														<RiRadioButtonLine />
													</span>
												</p>
											)}
											<span>
												{new Date(post.createdAt.toDate()).toLocaleString()}
											</span>
										</div>
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
