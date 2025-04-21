import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDE-vPpH0lS19pFEm6r-_b-N5jIZV8Gam0",
  authDomain: "dear-me-9b793.firebaseapp.com",
  projectId: "dear-me-9b793",
  storageBucket: "dear-me-9b793.appspot.com",
  messagingSenderId: "606515788124",
  appId: "1:606515788124:web:3d4d6042642c5187232999",
  measurementId: "G-W47FC0B5ND"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
})

export const db = getFirestore(app);

export const usersRef = collection(db,'users');