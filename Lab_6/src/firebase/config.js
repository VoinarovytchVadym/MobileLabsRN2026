import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLosIhdGjtJDKHu9Fxha6sBZ4Fy7mJ__Q",
  authDomain: "lab6-1f5b9.firebaseapp.com",
  projectId: "lab6-1f5b9",
  storageBucket: "lab6-1f5b9.firebasestorage.app",
  messagingSenderId: "147360717543",
  appId: "1:147360717543:web:24b4674af3d47dfa8ce042",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
