// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzJkThLM89do_iERepJkdf1tfqSCCyCYc",
  authDomain: "booking-7f673.firebaseapp.com",
  projectId: "booking-7f673",
  storageBucket: "booking-7f673.appspot.com",
  messagingSenderId: "635058561991",
  appId: "1:635058561991:web:2421ba71e3709ce0df6fe2",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
