import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';
import { FiUser } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { getApiData } from '../controllers/apiController';

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
			<div className='flex flex-col gap-5'>
				{user && (
					<div className='p-10 bg-glow2 text-neutral-700 rounded shadow shadow-neutral-800 flex flex-col gap-5'>
						<FiUser className='text-4xl text-neutral-800 bg-neutral-200 rounded p-1' />
						<h1 className='text-2xl font-semibold bg-neutral-200 rounded px-2 py-1'>
							Email: {user.email}
						</h1>
						<hr />
						<div className='flex flex-col gap-1'>
							<p className='bg-neutral-200 rounded py-1 px-2'>
								<span className='font-semibold text-xl'>Joined: </span>{' '}
								{user.metadata.creationTime}
							</p>
							<p className='bg-neutral-200 rounded py-1 px-2'>
								<span className='font-semibold text-xl'>Last login: </span>{' '}
								{user.metadata.lastSignInTime}
							</p>
						</div>
						<hr />
						<div className='flex flex-col gap-1'>
							<div className='text-xl  flex flex-col gap-1'>
								<p className='bg-neutral-200 rounded py-1 px-2'>
									<span className='font-semibold'>Total posts: </span> (
									{posts.length})
								</p>
								<p className='bg-neutral-200 rounded py-1 px-2'>
									<span className='font-semibold'>Today posts: </span>(
									{todaysPosts.length})
								</p>
								<p className='bg-neutral-200 rounded py-1 px-2 font-semibold'>
									Last posts:
								</p>
							</div>
							<ul className='flex flex-col gap-1'>
								{posts.slice(-3).map(post => (
									<li
										key={post.id}
										className='italic bg-neutral-200 rounded py-1 px-2 flex justify-between'
									>
										<span>- {post.title}</span>
									</li>
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
				<h1 className='text-2xl w-52'>Today you feel like <span className='font-semibold'>{name}</span> !</h1>
			</div>
		</div>
	);
};

export default PerfilPage;
