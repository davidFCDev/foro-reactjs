import React from 'react';
import { usePosts } from '../context/PostContext';

const HomePage = () => {
	const { posts } = usePosts();

  const onSubmit = handleSubmit(async data => {
		if (params.id) {
			await updateTask(params.id, data);
			toast.success('Task updated');
		} else {
			await createTask(data);
			toast.success('New Task Added');
		}
	});

	return (
		<section>
			<div>
				<h1>New Post</h1>
				<form onSubmit={onSubmit}>
					<label htmlFor='title'>Title</label>
					<input type='text' name='title' id='title' />
					<label htmlFor='description'>Description</label>
					<textarea
						name='description'
						id='description'
						cols='30'
						rows='10'
					></textarea>
					<button>Post</button>
				</form>
			</div>
			<div>List posts</div>
		</section>
	);
};

export default HomePage;
