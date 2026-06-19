import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./Firebase.js";
export class AuthService {
    login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    register(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    async obtenerRol(uid) {
        const usuarioRef = doc(db, "usuarios", uid);
        const usuario = await getDoc(usuarioRef);
        return usuario.data()?.rol;
    }
}
