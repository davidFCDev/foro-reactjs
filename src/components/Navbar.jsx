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
		<nav>
			<div>
				<Link to='/' className='py-1'>
					<h1>
						FORUM
						<img src='' alt='' />
					</h1>
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
					<div>
						<Link to='/login'>
							<p>Login</p>
						</Link>
						<Link to='/register'>
							<p>Register</p>
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
