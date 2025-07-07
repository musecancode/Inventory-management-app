import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQW8ZL4qSbJKf49axIQOCCJIgkcKIEDoI",
  authDomain: "inventory-management-app-92c20.firebaseapp.com",
  projectId: "inventory-management-app-92c20",
  storageBucket: "inventory-management-app-92c20.firebasestorage.app",
  messagingSenderId: "897748295950",
  appId: "1:897748295950:web:ad75a12965183f3c20375f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
