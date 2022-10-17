import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_KEY,
  authDomain: "freshers-krish.firebaseapp.com",
  projectId: "freshers-krish",
  storageBucket: "freshers-krish.appspot.com",
  messagingSenderId: "873931801081",
  appId: "1:873931801081:web:cdecac1c80c0921c0ffd28",
  measurementId: "G-ZD0YQSR6R9",
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
export const storage = getStorage(app);
