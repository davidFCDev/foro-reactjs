import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { usePosts } from '../context/PostContext';
import { MdOutlineKeyboardReturn } from 'react-icons/md';
import { VscCommentDiscussion } from 'react-icons/vsc';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { AiTwotoneLike, AiOutlineLike } from 'react-icons/ai';

const PostPage = () => {
	const { id } = useParams();
	const { posts, removePost, togglePostLiked, updatePostComments } = usePosts();
	const navigate = useNavigate();
	const selectedPost = posts.find(post => post.id === id);
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
		console.log('liked');
	};
	console.log(selectedPost);

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
				<div className='flex flex-col gap-2 w-full'>
					<div className='flex justify-between items-center'>
						<h1 className='text-2xl font-semibold text-neutral-200 flex items-center gap-2'>
							<VscCommentDiscussion className='text-3xl' />
							{selectedPost.title}
						</h1>
						<div className='flex gap-3 justify-end items-center'>
							<button className='text-3xl transition ' onClick={handleLike}>
								{selectedPost.liked === true ? (
									<AiTwotoneLike className='text-purple-500' />
								) : (
									<AiOutlineLike />
								)}
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

					<div className='text-neutral-200 bg-glow p-2 rounded shadow flex flex-col gap-2'>
						<h2 className='font-semibold text-xl text-neutral-800'>
							Description:
						</h2>
						<p className='text-lg p-2'>{selectedPost.description}</p>
					</div>

					<div className='w-full bg-glow p-2 flex flex-col gap-2 rounded shadow'>
						<h2 className='font-semibold text-xl text-neutral-800'>
							Comments:
						</h2>
						<div className='p-2 flex flex-col gap-2'>
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
									placeholder='Add a comment'
									className='w-full rounded-l shadow bg-neutral-100 p-2 focus:outline-none text-neutral-700'
									rows={1}
								/>
								<button
									type='submit'
									onClick={handleComment}
									className='bg-tertiary text-white rounded-r px-3 hover:bg-purple-800'
								>
									<RiSendPlane2Fill className='text-xl' />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostPage;
