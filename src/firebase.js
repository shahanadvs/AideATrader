
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD6ZTNXECvCNaAfKI08fIvRiO1gUixUdI4",
  authDomain: "aideatrader.firebaseapp.com",
  projectId: "aideatrader",
  storageBucket: "aideatrader.appspot.com",
  messagingSenderId: "986325841334",
  appId: "1:986325841334:web:b8ec9715f49bd06711fd17"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth();
