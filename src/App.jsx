import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './pages/ProtectedRoute';
import Root from './pages/Root';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';
import { PostsProvider } from './context/PostContext';
import { Toaster } from 'react-hot-toast';

function App() {
	return (
		<main>
			<AuthProvider>
				<PostsProvider>
					<Navbar />
					<div className='flex min-h-screen'>
						<Routes>
							<Route path='/' element={<Root />} />
							<Route
								path='/dashboard'
								element={
									<ProtectedRoute>
										<HomePage />
									</ProtectedRoute>
								}
							/>
							<Route path='/login' element={<LoginPage />} />
							<Route path='/register' element={<RegisterPage />} />
						</Routes>
					</div>
				</PostsProvider>
			</AuthProvider>
			<Toaster />
		</main>
	);
}

export default App;
