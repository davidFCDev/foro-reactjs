import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';
import { FiUser } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { getApiData } from '../controllers/apiController';
import { Link } from 'react-router-dom';

const PerfilPage = () => {
	const { user } = useAuth();
	const { posts } = usePosts();
	const [image, setImage] = useState('');
	const [name, setName] = useState('');

	const today = new Date().toLocaleDateString();

	const todaysPosts = posts.filter(post => {
		const postDate = new Date(post.createdAt.toDate()).toLocaleDateString();
		return postDate === today;
	});

	const findLikedPosts = (posts) => {
		return posts.filter((post) => post.liked === true).length;
	};
	const likedPostsCount = findLikedPosts(posts);

	useEffect(() => {
		const fetchRandomImage = async () => {
			const response = await getApiData();
			const name = response.data.name;
			const image = response.data.image;
			setImage(image);
			setName(name);
		};
		fetchRandomImage();
	}, []);

	return (
		<div className='w-full flex justify-center py-5 gap-20'>
			<div className='flex flex-col'>
				{user && (
					<div className='p-10 bg-glow2 rounded shadow shadow-neutral-800 flex flex-col gap-5'>
						<div className='flex items-end justify-between'>
							<FiUser className='text-4xl bg-glow rounded p-2' />
							<h2 className='font-bold text-3xl'>PROFILE</h2>
						</div>
						<h1 className='text-2xl font-semibold bg-glow rounded px-4 py-1'>
							Email: {user.email}
						</h1>

						<hr />

						<div className='flex flex-col gap-1'>
							<p className='bg-glow rounded py-1 px-4'>
								<span className='font-semibold text-xl'>Joined: </span>{' '}
								{user.metadata.creationTime}
							</p>
							<p className='bg-glow rounded py-1 px-4'>
								<span className='font-semibold text-xl'>Last login: </span>{' '}
								{user.metadata.lastSignInTime}
							</p>
						</div>

						<hr />

						<div className='flex flex-col gap-1'>
							<div className='text-xl flex flex-col gap-1'>
								<div className='flex gap-1 justify-between'>
									<p className='bg-glow rounded py-1 px-4'>
										<span className='font-semibold'>Posts: </span> (
										{posts.length})
									</p>
									<p className='bg-glow rounded py-1 px-4'>
										<span className='font-semibold'>Today: </span>(
										{todaysPosts.length})
									</p>
									<p className='bg-glow rounded py-1 px-4'>
										<span className='font-semibold'>Liked: </span>(
										{likedPostsCount})
									</p>
								</div>
							</div>
						</div>

						<hr />

						<div className='flex flex-col gap-1'>
							<p className='bg-glow rounded py-1 px-4 font-semibold text-xl'>
								Last posts:
							</p>
							<ul className='flex flex-col gap-1'>
								{posts.slice(-3).map(post => (
									<Link to={`/posts/${post.id}`} key={post.id} className='hover:underline hover:cursor-pointer'>
										<li
											key={post.id}
											className='italic bg-glow rounded py-1 px-4 flex justify-between'
										>
											<span>- {post.title}</span>
										</li>
									</Link>
								))}
							</ul>
						</div>
					</div>
				)}
			</div>
			<div className='flex flex-col gap-10 items-center'>
				<div className='bg-glow2 rounded-full p-5'>
					<img
						src={image}
						alt='random'
						className='rounded-full w-56 shadow shadow-neutral-800'
					/>
				</div>
				<h1 className='text-2xl w-52'>
					Today you feel like <span className='font-semibold'>{name}</span> !
				</h1>
			</div>
		</div>
	);
};

export default PerfilPage;
