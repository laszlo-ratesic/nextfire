// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from 'firebase/firebase-app-compat';
import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import 'firebase/auth-compat';
import 'firebase/firestore-compat';
import 'firebase/storage-compat';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA8K3avroeTalf80hnNnXtCvojFpaWpzwQ',
  authDomain: 'nextfire-c4d11.firebaseapp.com',
  projectId: 'nextfire-c4d11',
  storageBucket: 'nextfire-c4d11.appspot.com',
  messagingSenderId: '857102046174',
  appId: '1:857102046174:web:c1edf763ad52726e3b034f',
  measurementId: 'G-1M0GLTQW8H',
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();

if (location.hostname === 'localhost') {
  // firebase.firestore.setLogLevel('debug');

  firestore.settings({
    host: 'localhost:8080',
    ssl: false,
    experimentalForceLongPolling: true,
  });

  functions.useFunctionsEmulator('http://localhost:5001');
}
