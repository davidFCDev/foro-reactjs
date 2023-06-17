import {
	addDoc,
	doc,
	collection,
	getDocs,
	deleteDoc,
	serverTimestamp,
	orderBy,
	query,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

export const createPost = async post => {
	const newPost = {
		...post,
		createdAt: serverTimestamp(),
		liked: false,
		comments: [],
	};

	await addDoc(collection(db, 'posts'), newPost);
};

export const getPosts = async () => {
	const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
	const querySnapshot = await getDocs(q);

	const posts = querySnapshot.docs.map(doc => {
		return { ...doc.data(), id: doc.id };
	});
	return posts;
};

export const updatePost = async post => {
	await updateDoc(doc(db, 'posts', post.id), {
		liked: post.liked,
		comments: post.comments,
	});
};

export const deletePost = async id => {
	await deleteDoc(doc(db, 'posts', id));
};
