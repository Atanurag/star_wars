// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDub1g_oWvIiAMpgFwUFWKckl0KfIJJ4ME",
  authDomain: "workstation-79b50.firebaseapp.com",
  projectId: "workstation-79b50",
  storageBucket: "workstation-79b50.firebasestorage.app",
  messagingSenderId: "201443933949",
  appId: "1:201443933949:web:f4e2f254b5f22522bdc894"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };