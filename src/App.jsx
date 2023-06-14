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
import PostPage from './pages/PostPage';
import PerfilPage from './pages/PerfilPage';
import Sound from './components/Sound';

function App() {
	return (
		<main>
			<AuthProvider>
				<PostsProvider>
					<Navbar />
					<Sound />
					<div className='flex min-h-screen'>
						<Routes>
							<Route path='/' element={<Root />} />
							<Route
								path='/posts'
								element={
									<ProtectedRoute>
										<HomePage />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/posts/:id'
								element={
									<ProtectedRoute>
										<PostPage />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/perfil'
								element={
									<ProtectedRoute>
										<PerfilPage />
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
