// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// Эти данные нужно скопировать из Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCBkijotHdYi-HzoTWux6UBmh2FnsaGXTk",
  authDomain: "generation-5d811.firebaseapp.com",
  projectId: "generation-5d811",
  storageBucket: "generation-5d811.firebasestorage.app",
  messagingSenderId: "780964835384",
  appId: "1:780964835384:web:ed1be7fb11d9f0b94576cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, db, auth, analytics }; 