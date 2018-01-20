import firebase from 'firebase';

const fire = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
});

export const db = fire.database().ref('posts/');

export const getPostList = db.orderByKey().limitToLast(10);

export const getPost = postId => fire.database().ref(`posts/${postId}`);

export const PostModel = {
    author: '',
    title: 'first-post-title',
    body: 'body',
    pictures: ['url/img.jpg', ],
    videos: [],
    coubs: [],
};