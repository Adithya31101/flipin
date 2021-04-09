import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBPDSEIFegmqcQsyy17o1F4l2M7nmsc8u0",
  authDomain: "flipin-chat.firebaseapp.com",
  projectId: "flipin-chat",
  storageBucket: "flipin-chat.appspot.com",
  messagingSenderId: "786057448379",
  appId: "1:786057448379:web:b169e22b27ac5a7577d29e",
  measurementId: "G-H0VBCQFP9M",
});

const db = firebaseApp.firestore();

export default db;
