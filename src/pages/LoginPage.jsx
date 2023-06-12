import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from '../components/Alert';
import { useAuth } from '../context/AuthContext';
import { GrPowerReset } from 'react-icons/gr';

const LoginPage = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const { login, resetPassword } = useAuth();
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
				<div className='flex flex-col'>
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
							<p className='text-xs text-neutral-700 flex justify-between px-3 font-light'>
								Do not have an account?
								<Link to='/register' className='font-semibold'>
									Register
								</Link>
							</p>
							<button
								onClick={handleResetPassword}
								className='text-xs text-red-500 flex justify-center items-center gap-1 px-3 font-light hover:underline'
							>
								Reset password
								<GrPowerReset />
							</button>
						</div>
					</form>
					{error && <Alert message={error} />}
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
