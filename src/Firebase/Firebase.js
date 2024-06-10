import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_NOT_SECRET_CODE,
  authDomain: process.env.REACT_APP_NOT_SECRET_CODE2,
  projectId: process.env.REACT_APP_NOT_SECRET_CODE3,
  storageBucket: process.env.REACT_APP_NOT_SECRET_CODE4,
  messagingSenderId: process.env.REACT_APP_NOT_SECRET_CODE5,
  appId: process.env.REACT_APP_NOT_SECRET_CODE6,
};

export const app = initializeApp(firebaseConfig);
