import { initializeApp } from "firebase/app";
import { 
  getFirestore, collection, doc, getDoc, getDocs, setDoc, addDoc, 
  updateDoc, deleteDoc, onSnapshot, query, orderBy, serverTimestamp 
} from "firebase/firestore";

// Firebase Production Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB_production_key_saiyam",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "saiyam-jain-website.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "saiyam-jain-website",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "saiyam-jain-website.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "9339256592",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:9339256592:web:saiyamjain"
};

// Initialize Firebase App & Firestore Singleton
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { 
  db, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
};
