// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFireStore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArmOMXY5yeeTCE43_wBbwYnmv6G5SF6CI",
  authDomain: "insta-8e6ed.firebaseapp.com",
  projectId: "insta-8e6ed",
  storageBucket: "insta-8e6ed.appspot.com",
  messagingSenderId: "4667454072",
  appId: "1:4667454072:web:f977f6ef2b71066fa3738d",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Init DB
const db = getFireStore();
const storage = getStorage();

export { app, db, storage };
