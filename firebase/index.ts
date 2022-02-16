// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgSgwMAcWL70VjDE-XxOR5bjPsHqFNdpg",
  authDomain: "rick-morty-app-ac239.firebaseapp.com",
  databaseURL:
    "https://rick-morty-app-ac239-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rick-morty-app-ac239",
  storageBucket: "rick-morty-app-ac239.appspot.com",
  messagingSenderId: "395542577039",
  appId: "1:395542577039:web:00fdc8ee240e5e88b5d5fa",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

export { db };
