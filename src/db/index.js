import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyDUaWvDy5yaRSiZiiX0qdjqaTkzh5YVi7A',
    authDomain: 'shmaily-3bc12.firebaseapp.com',
    databaseURL: 'https://shmaily-3bc12.firebaseio.com',
    projectId: 'shmaily-3bc12',
    storageBucket: 'shmaily-3bc12.appspot.com',
    messagingSenderId: '943435953686',
};

export const db = firebase.initializeApp(config);