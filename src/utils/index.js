import firebase from 'firebase';

require('firebase/firestore');

const fire = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
});

export const db = fire.firestore().collection('posts');

export const getStart = db.orderBy('createdAt', 'desc').limit(1);

export const storageRef = fire.storage().ref();

export const getPostList = db.orderBy('createdAt').limit(10);

export const getPost = postId => db.doc(postId);

export const metadata = fileName => {
    const extension = fileName.split('.').reverse()[0];
    return {
        contentType: `image/${extension}`,
    };
};

export function uploadImg(picture, pictureName) {
    return storageRef.child(`images/${pictureName}`).put(picture, metadata(pictureName));
};

export function removePictures(pictureNames) {
    return Promise.all(pictureNames.map(pictureName =>
        storageRef.child(`images/${pictureName}`).delete()));
}

export function paginatePostList (lastPost) {
    return db.orderBy('createdAt', 'desc').startAfter(lastPost).limit(10);
};