import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IoMdLogOut } from 'react-icons/io';
import { MdForum } from 'react-icons/md';
import { FiUser } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const Navbar = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logout();
			navigate('/');
			toast.success('See you soon!');
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<nav className='px-3 sm:px-10 py-4 sm:py-6 font-warp nav'>
			<div className='w-full flex justify-between items-center text-neutral-100'>
				<Link to='/' className='flex items-center gap-3'>
					<img src='/logo.png' alt='logo' className='w-10 sm:w-14' />
					<img src='/tituloLogo.png' alt='logo' className='sm:block hidden w-36' />
				</Link>
				{user ? (
					<div className='flex gap-1 items-center'>
						<p className='bg-tertiary rounded p-2 shadow'>{user.email}</p>
						<Link to='/posts'>
							<p className='bg-tertiary rounded p-2 shadow'>
								<MdForum className='text-2xl hover:text-red-600' />
							</p>
						</Link>
						<Link to='/perfil'>
							<p className='bg-tertiary rounded p-2 shadow'>
								<FiUser className='text-2xl hover:text-red-600' />
							</p>
						</Link>
						<button
							onClick={handleLogout}
							className='bg-tertiary rounded p-2 shadow'
						>
							<IoMdLogOut className='text-2xl hover:text-red-600' />
						</button>
					</div>
				) : (
					<div className='flex gap-2'>
						<Link to='/login'>
							<p className='px-2 sm:px-4 py-2 bg-red-600 rounded hover:bg-red-400'>
								Login
							</p>
						</Link>
						<Link to='/register'>
							<p className='px-2 sm:px-4 py-2 shadow bg-tertiary rounded hover:bg-glow'>
								Register
							</p>
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
