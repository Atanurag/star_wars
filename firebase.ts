
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// firebase config ⚠️
const firebaseConfig = {
  apiKey: "AIzaSyDub1g_oWvIiAMpgFwUFWKckl0KfIJJ4ME",
  authDomain: "workstation-79b50.firebaseapp.com",
  projectId: "workstation-79b50",
  storageBucket: "workstation-79b50.firebasestorage.app",
  messagingSenderId: "201443933949",
  appId: "1:201443933949:web:f4e2f254b5f22522bdc894"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };