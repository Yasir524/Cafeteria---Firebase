import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/Firebase.js";
export class InventarioController {
    cargar() {
        const tabla = document.getElementById("tablaInventario");
        if (!tabla)
            return;
        onSnapshot(collection(db, "productos"), (snapshot) => {
            tabla.innerHTML = "";
            snapshot.forEach(doc => {
                const p = doc.data();
                tabla.innerHTML += `

                    <tr>

                        <td>
                        ${p.nombre}
                        </td>

                        <td>
                        $${p.precio}
                        </td>

                        <td>
                        ${p.stock}
                        </td>

                    </tr>

                    `;
            });
        });
    }
}
