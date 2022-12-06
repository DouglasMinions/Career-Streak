import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAEL3HJ5bRQtFtcrYmAYXONq7bH7mBR0Jw",
    authDomain: "chat-f746f.firebaseapp.com",
    projectId: "chat-f746f",
    storageBucket: "chat-f746f.appspot.com",
    messagingSenderId: "197869715702",
    appId: "1:197869715702:web:eb851275e963f2b3aeacd7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
