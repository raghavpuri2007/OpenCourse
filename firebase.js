import { initializeApp } from 'firebase/app';
import {
  getFirestore
} from "firebase/firestore/lite"
import {
  getAuth
} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyAiOSkUn70unTD9c6wJZ89oGr62MX-y-Cs",
  authDomain: "courselife-2fad5.firebaseapp.com",
  projectId: "courselife-2fad5",
  storageBucket: "courselife-2fad5.appspot.com",
  messagingSenderId: "887986837051",
  appId: "1:887986837051:web:fa4d2fa13cb0e1885f6e1e"
};

initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()
export {db, auth}