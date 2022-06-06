// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyA8KVGDW7shiWHY4FLOo_04eMSIUWWsBDM",
  authDomain: "code-editor-auth.firebaseapp.com",
  projectId: "code-editor-auth",
  storageBucket: "code-editor-auth.appspot.com",
  messagingSenderId: "479857647688",
  appId: "1:479857647688:web:c211b97519330db9ad387d",
  measurementId: "G-6LRG1FSN5Z"
});

export default firebaseConfig;