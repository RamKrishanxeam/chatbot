// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZkMWobe-WTKADHDlYhg8yFCnpzQjQf9o",
  authDomain: "rara-ai.firebaseapp.com",
  projectId: "rara-ai",
  storageBucket: "rara-ai.firebasestorage.app",
  messagingSenderId: "5456413769",
  appId: "1:5456413769:web:c572f837eec54c01902b98",
  measurementId: "G-WWN0VHZM9P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
