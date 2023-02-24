// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBxE9ghK9lMxwyR6AFhR89iBWemSj1MG3U",
    authDomain: "recettes-b8dfc.firebaseapp.com",
    projectId: "recettes-b8dfc",
    storageBucket: "recettes-b8dfc.appspot.com",
    messagingSenderId: "745535129355",
    appId: "1:745535129355:web:1ecc0d4a8a1f59ed90040e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
const db = getFirestore(app)
// Initialize Auth
const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export { db, auth, provider }
