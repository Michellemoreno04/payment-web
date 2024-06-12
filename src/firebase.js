// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";




const firebaseConfig = {
  apiKey: "AIzaSyDxbc9069L0ViQvy5NaiwINWWRYVXQT47A",
  authDomain: "support-6828e.firebaseapp.com",
  projectId: "support-6828e",
  storageBucket: "support-6828e.appspot.com",
  messagingSenderId: "1028618400359",
  appId: "1:1028618400359:web:9ec776528d80915242dac2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Realtime Database
const database = getDatabase(app);

export { db, database };