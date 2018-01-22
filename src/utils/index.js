import firebase from 'firebase';
import randomString from 'random-string';

const fire = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
});

export const db = fire.database().ref('posts/');

export const storageRef = fire.storage().ref();

export const getPostList = db.orderByKey().limitToLast(10);

export const getPost = postId => fire.database().ref(`posts/${postId}`);

export const metadata = fileName => {
    const extension = fileName.split('.').reverse()[0];
    return {
        contentType: `image/${extension}`,
    };
};

export function uploadImg(picture) {
    const solt = randomString();
    const pictureName = `${solt}-${picture.name}`;
    return storageRef.child(`images/${pictureName}`).put(picture, metadata(picture.name));
};