import { useNavigate } from 'react-router-dom';
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
	const [error, setError] = useState('');
	const handleChange = ({ target: { name, value } }) => {
		setUser({
			...user,
			[name]: value,
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setError('');
		try {
			await signup(user.email, user.password);
			navigate('/dashboard');
			toast.success('Registered!');
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor='email'>Email</label>
				<input type='email' name='email' id='email' onChange={handleChange} />
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					name='password'
					id='password'
					onChange={handleChange}
				/>
				<button type='submit'>Register</button>
			</form>
		</div>
	);
};

export default RegisterPage;
