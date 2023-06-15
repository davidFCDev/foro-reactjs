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
		<nav className='px-10 py-6 font-warp nav'>
			<div className='w-full flex justify-between items-center'>
				<Link to='/' className='flex items-center gap-3'>
					<img src='/logo.png' alt='logo' className='w-14' />
					<img src='/tituloLogo.png' alt='logo' className='w-36' />
				</Link>
				{user ? (
					<div className='flex gap-5 items-center'>
						<p>{user.email}</p>
						<Link to='/posts'>
							<p>
								<MdForum className='text-2xl hover:text-red-600' />
							</p>
						</Link>
						<Link to='/perfil'>
							<p>
								<FiUser className='text-2xl hover:text-red-600' />
							</p>
						</Link>
						<button onClick={handleLogout}>
							<IoMdLogOut className='text-2xl hover:text-red-600' />
						</button>
					</div>
				) : (
					<div className='flex gap-2'>
						<Link to='/login'>
							<p className='px-4 py-2 border border-red-600 bg-red-600 rounded hover:bg-red-500'>
								Login
							</p>
						</Link>
						<Link to='/register'>
							<p className='px-4 py-2 border border-red-600 rounded hover:bg-red-600'>
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
