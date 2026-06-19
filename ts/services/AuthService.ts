import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "./Firebase.js";
import { doc, getDoc }    from "firebase/firestore";

import { db } from "./Firebase.js";
/*Maneja el sistema de usuarios. Se encarga de procesar los inicios de sesión, 
registrar cuentas nuevas y verificar las credenciales del usuario.*/
export class AuthService {
    login(email: string, password: string) {
        return signInWithEmailAndPassword(
            auth,
            email,
            password
        );
    }
    register(email: string, password: string) {
        return createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
    }
    async obtenerRol(uid: string) {
        const usuarioRef =
            doc(
                db,
                "usuarios",
                uid
            );
        const usuario =
            await getDoc(
                usuarioRef
            );
        return usuario.data()?.rol;
    }
}