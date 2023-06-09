import { useContext, createContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	GoogleAuthProvider,
	sendPasswordResetEmail,
	signInWithRedirect,
	getRedirectResult,
} from 'firebase/auth';
import { auth } from '../firebase';

const authContext = createContext();

export const useAuth = () => {
	const context = useContext(authContext);
	if (!context) {
		throw new Error('useAuth must be used within a AuthProvider');
	}
	return context;
};

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const signup = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const login = (email, password) =>
		signInWithEmailAndPassword(auth, email, password);

	const loginWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		return signInWithRedirect(auth, provider);
	};

	const logout = () => signOut(auth);

	const resetPassword = async email => sendPasswordResetEmail(auth, email);

	useEffect(() => {
		const unsuscribe = onAuthStateChanged(auth, async currentUser => {
			if (currentUser) {
				// Use getRedirectResult to handle the redirect after Google authentication
				try {
					await getRedirectResult(auth);
				} catch (error) {
					console.log('Error handling redirect:', error);
				}
			}
			setUser(currentUser);
			setLoading(false);
		});

		return () => unsuscribe();
	}, []);

	return (
		<authContext.Provider
			value={{
				signup,
				login,
				logout,
				user,
				loading,
				loginWithGoogle,
				resetPassword,
			}}
		>
			{children}
		</authContext.Provider>
	);
}
