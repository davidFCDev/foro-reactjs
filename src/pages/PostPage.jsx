import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { usePosts } from '../context/PostContext';
import { MdOutlineKeyboardReturn } from 'react-icons/md';
import { RiSendPlane2Fill } from 'react-icons/ri';
import {
	AiTwotoneLike,
	AiOutlineLike,
	AiTwotoneDislike,
	AiOutlineDislike,
} from 'react-icons/ai';

const PostPage = () => {
	const { id } = useParams();
	const {
		posts,
		removePost,
		togglePostLiked,
		togglePostDisliked,
		updatePostComments,
	} = usePosts();
	const navigate = useNavigate();
	const selectedPost = posts.find(post => post.id === id);
	const [showToggleLike, setShowToggleLike] = useState(true);
	const [showToggleDislike, setShowToggleDislike] = useState(true);
	const [comment, setComment] = useState('');

	const handleDelete = () => {
		window.confirm('Are you sure you want to delete this post?') &&
			setTimeout(() => {
				removePost(id);
				navigate('/posts');
			}, 500);
	};

	const handleLike = async () => {
		await togglePostLiked(id);
		setShowToggleDislike(!showToggleDislike);
	};

	const handleDislike = async () => {
		await togglePostDisliked(id);
		setShowToggleLike(!showToggleLike);
	};

	const handleComment = async e => {
		e.preventDefault();
		const newComment = {
			id: Date.now().toString(),
			comment,
		};
		const updatedComments = [...selectedPost.comments, newComment];
		await updatePostComments(id, updatedComments);
		setComment('');
	};

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
				<div className='flex flex-col gap-5 w-full'>
					<div className='flex justify-between items-center'>
						<h1 className='text-2xl font-semibold'>{selectedPost.title}</h1>
						<div className='flex gap-3 justify-end items-center'>
							<button className='text-3xl transition ' onClick={handleLike}>
								{showToggleLike === true &&
									(selectedPost.liked === true ? (
										<AiTwotoneLike className='text-purple-500' />
									) : (
										<AiOutlineLike />
									))}
							</button>
							<button className='text-3xl pt-2' onClick={handleDislike}>
								{showToggleDislike === true &&
									(selectedPost.disliked === true ? (
										<AiTwotoneDislike className='text-purple-500' />
									) : (
										<AiOutlineDislike />
									))}
							</button>
							<button
								className='bg-red-600 rounded py-2 px-2 text-md hover:bg-red-500'
								onClick={handleDelete}
							>
								Delete
							</button>
							{/* <Link to='/posts'>
								<MdOutlineArrowBack className='text-4xl bg-glow text-white p-2 rounded hover:cursor-pointer' />
							</Link> */}
						</div>
					</div>
					<hr />
					<p className=' text-lg text-neutral-200'>
						{selectedPost.description}
					</p>
					<hr />
					<h2 className='font-semibold text-xl'>Comments:</h2>
					<div className='flex flex-col gap-1'>
						{selectedPost.comments.length > 0 ? (
							selectedPost.comments.map(comment => (
								<div key={comment.id}>
									<p>- {comment.comment}</p>
								</div>
							))
						) : (
							<p>No comments available</p>
						)}
					</div>
					<div className='flex'>
						<input
							type='text'
							value={comment}
							onChange={e => setComment(e.target.value)}
							placeholder='Comment'
							className='w-full rounded shadow bg-neutral-100 border p-2 focus:outline-none text-neutral-700'
							rows={1}
						/>
						<button
							type='submit'
							onClick={handleComment}
							className='bg-purple-500 text-white rounded px-3 hover:bg-purple-600'
						>
							<RiSendPlane2Fill className='text-xl' />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostPage;
