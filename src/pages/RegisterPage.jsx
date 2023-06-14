import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const RegisterPage = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const { signup } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState(null);

	const handleChange = ({ target: { name, value } }) => {
		setUser({
			...user,
			[name]: value,
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setError(null);
		try {
			await signup(user.email, user.password);
			navigate('/posts');
			toast.success('Registered!');
		} catch (error) {
			setError(error.message);
			toast.error(error.message);
		}
	};

	return (
		<div className='w-full'>
			<div className='flex justify-center py-24'>
				<div className='flex flex-col'>
					<form
						onSubmit={handleSubmit}
						className='flex flex-col gap-2 bg-neutral-100 text-neutral-800 rounded p-6 '
					>
						<div className='flex flex-col gap-1'>
							<label
								htmlFor='email'
								className='font-semibold text-lg text-neutral-700'
							>
								Email
							</label>
							<input
								type='email'
								name='email'
								id='email'
								onChange={handleChange}
								placeholder='email@youremail.com'
								className='w-64 py-1 px-2 rounded focus:outline-none text-neutral-800 border focus:bg-neutral-100 placeholder:text-sm placeholder:text-neutral-300'
							/>
						</div>
						<div className='flex flex-col gap-1'>
							<label
								htmlFor='password'
								className='font-semibold text-lg text-neutral-700'
							>
								Password
							</label>
							<input
								type='password'
								name='password'
								id='password'
								placeholder='********'
								onChange={handleChange}
								className='w-64 py-1 px-2 rounded focus:outline-none text-neutral-800 border focus:bg-neutral-100 placeholder:text-sm placeholder:text-neutral-300'
							/>
						</div>
						<div className='flex flex-col gap-4 mt-3'>
							<button
								type='submit'
								className='py-1 px-2 rounded bg-red-600 hover:bg-red-500 text-white font-semibold shadow'
							>
								Register
							</button>
							<p className='text-sm text-neutral-900 flex justify-between px-2'>
								Have you an account?
								<Link to='/login' className='font-semibold'>
									Login
								</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
