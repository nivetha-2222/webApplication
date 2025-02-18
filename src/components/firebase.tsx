// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import type { FirebaseApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpY3b8BxyMLhoSel1EsKXAyMaSKmyRlm0",
  authDomain: "login-auth-a18dd.firebaseapp.com",
  projectId: "login-auth-a18dd",
  storageBucket: "login-auth-a18dd.firebasestorage.app",
  messagingSenderId: "376924414814",
  appId: "1:376924414814:web:39adb67c0397cd9f8765cf",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
// export const provider = new GoogleAuthProvider();
// export const db = getFirestore(app); 

// const app= initializeApp(firebaseConfig);
// export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// export const db = getFirestore(app); 

export const db = getFirestore(app);
