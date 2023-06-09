import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IoMdLogOut } from 'react-icons/io';
import { RxDashboard } from 'react-icons/rx';
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
		<nav className='border-b '>
			<div className='w-full flex justify-between items-center p-4'>
				<Link to='/' className='flex items-center gap-3'>
					<img src='/public/logo.png' alt='logo' className='w-14' />
					<img src='/public/tituloLogo.png' alt='logo' className='w-36' />
				</Link>
				{user ? (
					<div>
						<p>{user.email}</p>
						<Link to='/dashboard'>
							<p>
								<RxDashboard />
							</p>
						</Link>
						<button onClick={handleLogout}>
							<IoMdLogOut />
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
