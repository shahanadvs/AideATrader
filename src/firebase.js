
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBgh4FFgRH5mvAhRUxG3u4qlVmkOQH9XOg",
  authDomain: "aide-a-trader.firebaseapp.com",
  projectId: "aide-a-trader",
  storageBucket: "aide-a-trader.appspot.com",
  messagingSenderId: "170382318297",
  appId: "1:170382318297:web:eba69160a45dd0f67afcc8" 
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
