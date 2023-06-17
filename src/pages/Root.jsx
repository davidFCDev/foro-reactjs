import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Root = () => {
	const navigate = useNavigate();
	const { user } = useAuth();

	const handleJoin = () => {
		if (!user) {
			navigate('/register');
		} else {
			navigate('/posts');
		}
	};

	return (
		<section className='w-full py-16 gap-10 flex flex-col items-center principal'>
			<div className='flex justify-center items-center gap-44'>
				<div className='flex flex-col gap-10 p-3 w-96'>
					<h1 className='text-3xl font-semibold text-secondary'>
						Wubba lubba dub dub!
					</h1>
					<div className='flex flex-col gap-2'>
						<p className='text-lg'>Welcome to the Rick and Morty Forum!</p>
						<p className='text-sm text-neutral-300'>
							Dive into the captivating universe of the smartest and wildly
							creative animated series: Rick and Morty. Join a passionate
							community of fans as we delve into the depths of interdimensional
							adventures, mind-bending concepts, and hilarious shenanigans. So
							buckle up and get ready for an exhilarating journey through the
							multiverse with Rick and Morty!
						</p>
					</div>
				</div>
				<div>
					<img
						src='https://i.pinimg.com/originals/82/d8/a4/82d8a4fec91792a434f77392d36d56e7.gif'
						alt='body'
						className='rounded-full w-80 h-80 shadow-md shadow-neutral-800 hover:scale-105 transition-all duration-300'
					/>
				</div>
			</div>
			<div>
				<button className='btn-main' onClick={handleJoin}>
					join us !
				</button>
			</div>
		</section>
	);
};

export default Root;
