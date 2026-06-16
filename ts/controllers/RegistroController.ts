import {
    addDoc,
    collection
}
from "firebase/firestore";

import { db }
from "../services/Firebase.js";

export class RegistroController {

    async guardar(){

        const nombre =
        (
            document.getElementById(
                "nombre"
            ) as HTMLInputElement
        ).value;

        const precio =
        Number(
            (
                document.getElementById(
                    "precio"
                ) as HTMLInputElement
            ).value
        );

        const stock =
        Number(
            (
                document.getElementById(
                    "stock"
                ) as HTMLInputElement
            ).value
        );

        await addDoc(

            collection(
                db,
                "productos"
            ),

            {
                nombre,
                precio,
                stock
            }

        );

        alert(
            "Producto guardado"
        );

    }

}