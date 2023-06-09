// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAH7tdhD0dQUGjaqHPrUloG6tlQDKiyJOw',
	authDomain: 'react-forum-43222.firebaseapp.com',
	projectId: 'react-forum-43222',
	storageBucket: 'react-forum-43222.appspot.com',
	messagingSenderId: '1580747562',
	appId: '1:1580747562:web:182e31842c2fd701b3ac53',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
