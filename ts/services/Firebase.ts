import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAg_OulF3vzB1mArau_6VIWmYette5QJM0",
    authDomain: "cafeteria-bd7ea.firebaseapp.com",
    projectId: "cafeteria-bd7ea",
    storageBucket: "cafeteria-bd7ea.firebasestorage.app",
    messagingSenderId: "744595659297",
    appId: "1:744595659297:web:215156681e08f4ad41a160"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);