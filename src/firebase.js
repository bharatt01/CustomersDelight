// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTJME0BmXvRH8yZbquIdTYKetfmTLRzrk",
  authDomain: "customersdelight-b19cc.firebaseapp.com",
  projectId: "customersdelight-b19cc",
  storageBucket: "customersdelight-b19cc.firebasestorage.app",
  messagingSenderId: "898446286413",
  appId: "1:898446286413:web:e9a7c6d0d45da8dfc38604"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage,auth };