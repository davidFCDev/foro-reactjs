import {
	addDoc,
	setDoc,
	doc,
	collection,
	getDocs,
	deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

export const createPost = async post => {
	await addDoc(collection(db, 'posts'), post);
};

export const getPosts = async () => {
	const querySnapshot = await getDocs(collection(db, 'posts'));

	const posts = querySnapshot.docs.map(doc => {
		return { ...doc.data(), id: doc.id };
	});
	return posts;
};

export const updatePost = async post => {
	await setDoc(doc(db, 'posts', post.id), {
		title: post.title,
		description: post.description,
	});
};

export const deletePost = async id => {
	await deleteDoc(doc(db, 'posts', id));
};
