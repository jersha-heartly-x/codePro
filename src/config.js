// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyA8KVGDW7shiWHY4FLOo_04eMSIUWWsBDM',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "code-editor-auth",
  storageBucket: "code-editor-auth.appspot.com",
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
});

export default firebaseConfig;