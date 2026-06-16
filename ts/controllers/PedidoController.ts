import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/Firebase.js";

import { CarritoService } from "../services/CarritoService.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
export class PedidoController {

    private carritoService =
        new CarritoService();

    async realizarPedido() {
        const carrito =
            this.carritoService.obtener();
        if (carrito.length === 0) {
            alert("El carrito está vacío");
            return;
        }
        let total = 0;
        carrito.forEach(item => {
            total +=
                item.precio *
                item.cantidad;
        });

        const pedidoRef = await addDoc(collection(db, "pedidos"),
            {
                fecha: new Date().toISOString(),
                estado: "Pendiente",
                productos: carrito,
                total
            }
        );
        const pedidoActivo =
            localStorage.getItem(
                "pedidoActivo"
            );
        localStorage.setItem(
            "pedidoActivo",
            pedidoRef.id
        );

        localStorage.setItem(
            "ultimoPedido",
            pedidoRef.id
        );

        for (const item of carrito) {
            const productoRef =
                doc(db, "productos", item.id);
            const productoDoc =
                await getDoc(productoRef);
            if (productoDoc.exists()) {
                const producto =
                    productoDoc.data();
                const nuevoStock =
                    producto.stock -
                    item.cantidad;
                if (nuevoStock < 0) {
                    alert(
                        `No hay suficiente stock de ${producto.nombre}`
                    );
                    return;
                }
                await updateDoc(
                    productoRef,
                    {
                        stock: nuevoStock
                    }
                );
            }
        }
        this.carritoService.vaciar();
        alert("Pedido realizado");
        window.location.href =
            "ticket.html";
    }
}