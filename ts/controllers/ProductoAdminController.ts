import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
}
    from "firebase/firestore";

import { db }
    from "../services/Firebase.js";

export class ProductoAdminController {

    private productoEditando:
        string | null = null;

    async cargarProductos() {

        const lista =
            document.getElementById(
                "listaProductos"
            );

        if (!lista) return;

        lista.innerHTML = "";

        const snapshot =
            await getDocs(
                collection(
                    db,
                    "productos"
                )
            );

        snapshot.forEach(productoDoc => {

            const p = productoDoc.data();

            lista.innerHTML += `

    <tr>

        <td>${p.nombre}</td>

        <td>$${p.precio}</td>

        <td>${p.stock}</td>

        <td>

            <button
            class="editar"
            data-id="${productoDoc.id}"
            data-nombre="${p.nombre}"
            data-precio="${p.precio}"
            data-stock="${p.stock}"
            data-categoria="${p.categoria}"
            data-imagen="${p.imagen}">
            ✏️
            </button>

            <button
            class="eliminar"
            data-id="${productoDoc.id}">
            🗑️
            </button>

        </td>

    </tr>

    `;
        });

        this.configurarBotones();

    }

    async guardar() {

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

        const categoria =
            (
                document.getElementById(
                    "categoria"
                ) as HTMLInputElement
            ).value;

        const imagen =
            (
                document.getElementById(
                    "imagen"
                ) as HTMLInputElement
            ).value;

        const producto = {

            nombre,
            precio,
            stock,
            categoria,
            imagen

        };

        if (this.productoEditando) {

            await updateDoc(

                doc(
                    db,
                    "productos",
                    this.productoEditando
                ),

                producto

            );

            this.productoEditando =
                null;
                (
    document.getElementById(
        "btnGuardar"
    ) as HTMLButtonElement
).textContent = "Guardar";

        }
        else {

            await addDoc(

                collection(
                    db,
                    "productos"
                ),

                producto

            );

        }

        this.limpiar();

        this.cargarProductos();

    }

    configurarBotones() {

        document
            .querySelectorAll(".eliminar")
            .forEach(btn => {

                btn.addEventListener(
                    "click",
                    async () => {

                        const id =
                            (
                                btn as HTMLButtonElement
                            ).dataset.id!;

                        await deleteDoc(

                            doc(
                                db,
                                "productos",
                                id
                            )

                        );

                        this.cargarProductos();

                    }
                );

            });
            document
.querySelectorAll(".editar")
.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            const boton =
                btn as HTMLButtonElement;

            this.productoEditando =
                boton.dataset.id!;

            (
                document.getElementById(
                    "nombre"
                ) as HTMLInputElement
            ).value =
                boton.dataset.nombre!;

            (
                document.getElementById(
                    "precio"
                ) as HTMLInputElement
            ).value =
                boton.dataset.precio!;

            (
                document.getElementById(
                    "stock"
                ) as HTMLInputElement
            ).value =
                boton.dataset.stock!;

            (
                document.getElementById(
                    "categoria"
                ) as HTMLInputElement
            ).value =
                boton.dataset.categoria!;

            (
                document.getElementById(
                    "imagen"
                ) as HTMLInputElement
            ).value =
                boton.dataset.imagen!;

            (
                document.getElementById(
                    "btnGuardar"
                ) as HTMLButtonElement
            ).textContent =
                "Actualizar";

        }
    );

});
    }

    limpiar() {

        (
            document.getElementById(
                "nombre"
            ) as HTMLInputElement
        ).value = "";

        (
            document.getElementById(
                "precio"
            ) as HTMLInputElement
        ).value = "";

        (
            document.getElementById(
                "stock"
            ) as HTMLInputElement
        ).value = "";

        (
            document.getElementById(
                "categoria"
            ) as HTMLInputElement
        ).value = "";

        (
            document.getElementById(
                "imagen"
            ) as HTMLInputElement
        ).value = "";

    }

}