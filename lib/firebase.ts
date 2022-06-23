// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export const storage = firebase.storage();
// export const functions = firebase.functions();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// if (location.hostname === 'localhost') {
//   // firebase.firestore.setLogLevel('debug');

//   firestore.settings({
//     host: 'localhost:8080',
//     ssl: false,
//     experimentalForceLongPolling: true,
//   });

//   functions.useFunctionsEmulator('http://localhost:5001');
// }

/// HELPER FUNCTIONS

/**
 * Gets a users/{uid} document with username
 * @param {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**
 * Converts a firestore document to JSON
 * @param {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  }
}