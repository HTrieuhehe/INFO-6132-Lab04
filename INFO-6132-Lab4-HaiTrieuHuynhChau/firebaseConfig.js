// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYYFaCFcXmWzLeGjvmj4CHPGLC0wakKNE",
  authDomain: "info-6132-lab4-438f7.firebaseapp.com",
  projectId: "info-6132-lab4-438f7",
  storageBucket: "info-6132-lab4-438f7.firebasestorage.app",
  messagingSenderId: "36035632380",
  appId: "1:36035632380:web:758df995fdbaa03caacb79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);