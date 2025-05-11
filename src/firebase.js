// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcCcIsomvLMCziCrIDW0Bu-lYpeM51_QE",
  authDomain: "em-system-1e4a8.firebaseapp.com",
  projectId: "em-system-1e4a8",
  storageBucket: "em-system-1e4a8.firebasestorage.app",
  messagingSenderId: "415679434876",
  appId: "1:415679434876:web:e2604a70e1004fd2ae39f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const auth = getAuth(app);
export default app;



