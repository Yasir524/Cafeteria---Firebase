import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/Firebase.js";
export class ProductoAdminController {
    constructor() {
        this.productoEditando = null;
    }
    async cargarProductos() {
        const lista = document.getElementById("listaProductos");
        if (!lista)
            return;
        lista.innerHTML = "";
        const snapshot = await getDocs(collection(db, "productos"));
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
        const nombre = document.getElementById("nombre").value;
        const precio = Number(document.getElementById("precio").value);
        const stock = Number(document.getElementById("stock").value);
        const categoria = document.getElementById("categoria").value;
        const imagen = document.getElementById("imagen").value;
        const producto = {
            nombre,
            precio,
            stock,
            categoria,
            imagen
        };
        if (this.productoEditando) {
            await updateDoc(doc(db, "productos", this.productoEditando), producto);
            this.productoEditando =
                null;
            document.getElementById("btnGuardar").textContent = "Guardar";
        }
        else {
            await addDoc(collection(db, "productos"), producto);
        }
        this.limpiar();
        this.cargarProductos();
    }
    configurarBotones() {
        document
            .querySelectorAll(".eliminar")
            .forEach(btn => {
            btn.addEventListener("click", async () => {
                const id = btn.dataset.id;
                await deleteDoc(doc(db, "productos", id));
                this.cargarProductos();
            });
        });
        document
            .querySelectorAll(".editar")
            .forEach(btn => {
            btn.addEventListener("click", () => {
                const boton = btn;
                this.productoEditando =
                    boton.dataset.id;
                document.getElementById("nombre").value =
                    boton.dataset.nombre;
                document.getElementById("precio").value =
                    boton.dataset.precio;
                document.getElementById("stock").value =
                    boton.dataset.stock;
                document.getElementById("categoria").value =
                    boton.dataset.categoria;
                document.getElementById("imagen").value =
                    boton.dataset.imagen;
                document.getElementById("btnGuardar").textContent =
                    "Actualizar";
            });
        });
    }
    limpiar() {
        document.getElementById("nombre").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("stock").value = "";
        document.getElementById("categoria").value = "";
        document.getElementById("imagen").value = "";
    }
}
