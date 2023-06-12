import React from 'react';
import { Link } from 'react-router-dom';

const Root = () => {
	return (
		<section className='w-full py-28'>
			<div className='flex justify-center items-center gap-20'>
				<div className='flex flex-col gap-10 p-3 w-96'>
					<h1 className='text-3xl font-semibold text-secondary'>Wubba lubba dub dub!</h1>
					<div className='flex flex-col gap-2'>
						<p>Foro de discusión sobre la serie Rick & Morty</p>
						<p>Para poder participar en el foro es necesario registrarse</p>
					</div>
					<div>
						<Link to='/register'>
							<button className='btn-main'>únete !</button>
						</Link>
					</div>
				</div>
				<div>
					<img
						src='https://i.pinimg.com/originals/82/d8/a4/82d8a4fec91792a434f77392d36d56e7.gif'
						alt='body'
						className='rounded-full w-96'
					/>
				</div>
			</div>
		</section>
	);
};

export default Root;
