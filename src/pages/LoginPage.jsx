import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from '../components/Alert';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const { login, loginWithGoogle, resetPassword } = useAuth();
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async e => {
		e.preventDefault();
		setError('');
		try {
			await login(user.email, user.password);
			navigate('/dashboard');
			toast.success('Welcome!');
		} catch (error) {
			setError(error.message);
		}
	};

	const handleChange = ({ target: { value, name } }) =>
		setUser({ ...user, [name]: value });

	const handleGoogleSignin = async () => {
		try {
			await loginWithGoogle();
			navigate('/dashboard');
		} catch (error) {
			setError(error.message);
		}
	};

	const handleResetPassword = async e => {
		e.preventDefault();
		if (!user.email) return setError('Write an email to reset password');
		try {
			await resetPassword(user.email);
			setError('We sent you an email. Check your inbox');
		} catch (error) {
			setError(error.message);
		}
	};
	return (
		<div className='w-full'>
			<div className='flex justify-center py-24'>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col gap-2 bg-white text-neutral-800 rounded p-6 '
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
							className='py-1 px-2 rounded focus:outline-none text-neutral-800 border focus:bg-neutral-100 placeholder:text-sm placeholder:text-neutral-300'
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
							className='py-1 px-2 rounded focus:outline-none text-neutral-800 border focus:bg-neutral-100 placeholder:text-sm placeholder:text-neutral-300'
						/>
					</div>
					<div className='flex flex-col gap-2 mt-3'>
						<button
							type='submit'
							className='py-1 px-2 rounded bg-red-600 hover:bg-red-500 text-white font-semibold'
						>
							Login
						</button>
						<button
							onClick={handleGoogleSignin}
							className='text-neutral-700 flex justify-center items-center text-sm gap-2 hover:underline'
						>
							...Sign in with Google
							<img
								src='https://cdn-icons-png.flaticon.com/512/300/300221.png'
								alt='google'
								className='w-4'
							/>
						</button>
						<button
							onClick={handleResetPassword}
							className='text-sm text-red-500'
						>
							Reset password
						</button>
						<p className='text-xs text-neutral-700 flex justify-between px-3 font-light'>
							Do not have an account?
							<Link to='/register' className='font-semibold'>
								Register
							</Link>
						</p>
					</div>
				</form>
				{error && <Alert message={error} />}
			</div>
		</div>
	);
};

export default LoginPage;
