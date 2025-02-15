// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "#",
  authDomain: "medi-bot-cce34.firebaseapp.com",
  databaseURL: "https://medi-bot-cce34-default-rtdb.firebaseio.com",
  projectId: "medi-bot-cce34",
  storageBucket: "medi-bot-cce34.firebasestorage.app", // Firebase Storage bucket URL
  messagingSenderId: "633375045399",
  appId: "1:633375045399:web:ce14aedf752c4781652952",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Initialize Firebase Storage
