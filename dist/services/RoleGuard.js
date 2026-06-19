import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./Firebase.js";
export class RoleGuard {
    static verificarRol(rolPermitido) {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                window.location.href =
                    "login.html";
                return;
            }
            const usuario = await getDoc(doc(db, "usuarios", user.uid));
            const rol = usuario.data()?.rol;
            if (rol !== rolPermitido) {
                alert("Acceso denegado");
                window.location.href =
                    "index.html";
            }
        });
    }
}
