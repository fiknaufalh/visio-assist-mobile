// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnWYIp7EHknZqrpEgictL-9DTpqiAhFsU",
  authDomain: "fiknaufalh-guestify.firebaseapp.com",
  projectId: "fiknaufalh-guestify",
  storageBucket: "fiknaufalh-guestify.appspot.com",
  messagingSenderId: "1008051725316",
  appId: "1:1008051725316:web:cb823b5b1bbbdbb8d34151",
  measurementId: "G-06V0YZPY50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersCollection = collection(db, 'users');