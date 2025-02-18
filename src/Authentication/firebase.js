import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { getFirestore, doc, setDoc, collection, getDocs, query, where } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const registerUser = async (email, password, firstName, lastName) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // 🔹 Store user details in Firestore
  await setDoc(doc(db, "users", user.uid), {
    firstName,
    lastName,
    email,
    createdAt: new Date(),
  });

  return userCredential;
};

const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

export {
    auth,
    db,
    signInWithPopup,
    googleProvider,
    signOut,
    doc,
    setDoc,
    collection,
    getDocs,  // 🔹 Add this line
    query,
    where,
    registerUser,
    loginUser
  };
  
