// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3d7Kv03TEkaXPWr-k3yJaz3IgMAEihNc",
  authDomain: "twitter-clone-69a62.firebaseapp.com",
  projectId: "twitter-clone-69a62",
  storageBucket: "twitter-clone-69a62.appspot.com",
  messagingSenderId: "563320560279",
  appId: "1:563320560279:web:b325d4a24c9b2eb15727d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
