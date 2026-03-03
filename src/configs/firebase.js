// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYb_QGFySLosQLtvoYTAUJyFht-TaLW4U",
  authDomain: "portfoliosaas.firebaseapp.com",
  projectId: "portfoliosaas",
  storageBucket: "portfoliosaas.firebasestorage.app",
  messagingSenderId: "443895549056",
  appId: "1:443895549056:web:f0ef3621022b53c4adaa65",
  measurementId: "G-ZDQTHJE1MH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
const analytics = getAnalytics(app);