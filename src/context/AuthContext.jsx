import { useContext, createContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
	sendPasswordResetEmail,
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

	const logout = () => signOut(auth);

	const resetPassword = async email => sendPasswordResetEmail(auth, email);

	useEffect(() => {
		const unsuscribe = onAuthStateChanged(auth, currentUser => {
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
				resetPassword,
			}}
		>
			{children}
		</authContext.Provider>
	);
}
