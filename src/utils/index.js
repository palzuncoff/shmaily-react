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
    const uploadTask = storageRef.child(`images/${pictureName}`).put(picture, metadata(picture.name));

    return uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress} % done`);
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                default:
                    console.log('Upload is done');
            }
        }, (error) => {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                default:
                    throw error;
            }
        }, () => {
            console.log(uploadTask.snapshot.downloadURL);
            return uploadTask.snapshot.downloadURL
        });
};