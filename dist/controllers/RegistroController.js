import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/Firebase.js";
export class RegistroController {
    async guardar() {
        const nombre = document.getElementById("nombre").value;
        const precio = Number(document.getElementById("precio").value);
        const stock = Number(document.getElementById("stock").value);
        await addDoc(collection(db, "productos"), {
            nombre,
            precio,
            stock
        });
        alert("Producto guardado");
    }
}
