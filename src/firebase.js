// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// importing getAuth
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZUrQQG6-d4XXSQj0XaJqZR4YHt8obqGg",
  authDomain: "quiz-alma.firebaseapp.com",
  projectId: "quiz-alma",
  storageBucket: "quiz-alma.appspot.com",
  messagingSenderId: "611271242899",
  appId: "1:611271242899:web:60b7f68807e1b17fdb0966",
  measurementId: "G-JNZSLLX2Y9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// exporting the app
export default app;
