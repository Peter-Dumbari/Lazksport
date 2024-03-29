import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  sendEmailVerification,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyB_2nrAde-TmZNX6B3Lidilds8JeCjfg-I",
  authDomain: "fir-tutorial-954b1.firebaseapp.com",
  projectId: "fir-tutorial-954b1",
  storageBucket: "fir-tutorial-954b1.appspot.com",
  messagingSenderId: "669500243236",
  appId: "1:669500243236:web:c7022532457b5c927687b1",
  measurementId: "G-SC8PSSLMY0",
};

const app = initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

const auth = getAuth(app);
export const db = getFirestore();

export function signup(email, password) {
  let signProcess = setPersistence(auth, browserSessionPersistence).then(() => {
    return createUserWithEmailAndPassword(auth, email, password);
  });
  return signProcess;
}

export function SendVerification() {
  return sendEmailVerification(auth.currentUser);
}

export function login(email, password) {
  let log = setPersistence(auth, browserSessionPersistence).then(() => {
    return signInWithEmailAndPassword(auth, email, password);
  });
  return log;
}
export function logout() {
  return signOut(auth);
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

const googleprovider = new GoogleAuthProvider();

export function signInWithGoogle() {
  let google = setPersistence(auth, browserSessionPersistence).then(() => {
    return signInWithPopup(auth, googleprovider);
  });
  return google;
}

const facebookprovider = new FacebookAuthProvider();

export function signInWithFacebook() {
  return signInWithPopup(auth, facebookprovider);
}
