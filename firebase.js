// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4w3sazhlH6z5hZ9hM-dGF4DSXRU__Eiw",
  authDomain: "i-cart-ce9ba.firebaseapp.com",
  databaseURL: "https://i-cart-ce9ba-default-rtdb.firebaseio.com",
  projectId: "i-cart-ce9ba",
  storageBucket: "i-cart-ce9ba.appspot.com",
  messagingSenderId: "1036569901452",
  appId: "1:1036569901452:web:e4762a1e6b445ffa857ea9",
  measurementId: "G-N89KC07PV3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
