import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDozO7D1nK8_y-cthmqejzSyNyEeC_u8t8",
  authDomain: "mission-app-8539e.firebaseapp.com",
  projectId: "mission-app-8539e",
  storageBucket: "mission-app-8539e.appspot.com",
  messagingSenderId: "754001142736",
  appId: "1:754001142736:web:7faa5a92e7ed2d1d328fd5",
  measurementId: "G-R80M3B23ED"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {app, auth, db, storage};