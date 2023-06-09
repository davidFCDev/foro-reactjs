import React from 'react';

const Root = () => {
	return (
		<section className='w-full py-10'>
			<div className='flex justify-center items-center gap-20'>
				<div className='flex flex-col gap-2 p-3 w-96'>
					<h1 className='text-3xl font-semibold'>FORO</h1>
					<div className=''>
						<p>Foro de discusión sobre la serie Rick & Morty</p>
						<p>Para poder participar en el foro es necesario registrarse</p>
					</div>
				</div>
        <img src='/public/fondoRM.png' alt='body' className='w-80' />
			</div>
		</section>
	);
};

export default Root;
