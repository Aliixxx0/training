import { initializeApp } from "firebase/app";
//import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBl6awDV1UgmLLOdFyX2qcW5KG8VvWpaI0",
  authDomain: "jaicome-1bf99.firebaseapp.com",
  projectId: "jaicome-1bf99",
  storageBucket: "jaicome-1bf99.firebasestorage.app",
  messagingSenderId: "449731840538",
  appId: "1:449731840538:web:8890c9dfb55fe08c331fa3",
  measurementId: "G-GLM0ZZP97L"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getDatabase(app); // for Realtime DB
//export const firestore = getFirestore(app); // optional: for Firestore

