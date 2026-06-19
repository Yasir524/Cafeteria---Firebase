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

        return;
    }
    let total = 0;

    carrito.forEach(item => {

        total +=
            item.precio *
            item.cantidad;

    });

    // Validar stock

    for (const item of carrito) {

        const productoRef =
            doc(
                db,
                "productos",
                item.id
            );

        const productoDoc =
            await getDoc(
                productoRef
            );

        if (productoDoc.exists()) {

            const producto =
                productoDoc.data();

            const nuevoStock =
                producto.stock -
                item.cantidad;

            if (nuevoStock < 0) {

                return;

            }

        }

    }
    
    const pedidoActivo =
        localStorage.getItem(
            "pedidoActivo"
        );

    // ==========================
    // ACTUALIZAR PEDIDO EXISTENTE
    // ==========================

    if (pedidoActivo) {

        const pedidoRef =
            doc(
                db,
                "pedidos",
                pedidoActivo
            );

        const pedidoDoc =
            await getDoc(
                pedidoRef
            );

        if (pedidoDoc.exists()) {

            const pedido =
                pedidoDoc.data();

            await updateDoc(
                pedidoRef,
                {
                    productos: [
                        ...pedido.productos,
                        ...carrito
                    ],

                    total:
                        pedido.total +
                        total
                }
            );

            // Descontar stock

            for (const item of carrito) {

                const productoRef =
                    doc(
                        db,
                        "productos",
                        item.id
                    );

                const productoDoc =
                    await getDoc(
                        productoRef
                    );

                if (productoDoc.exists()) {

                    const producto =
                        productoDoc.data();

                    await updateDoc(
                        productoRef,
                        {
                            stock:
                                producto.stock -
                                item.cantidad
                        }
                    );

                }

            }

            this.carritoService.vaciar();

            localStorage.setItem(
                "ultimoPedido",
                pedidoActivo
            );

            window.location.href =
                "ticket.html";

            return;

        }

    }

    // ==========================
    // CREAR PEDIDO NUEVO
    // ==========================

    const pedidoRef =
        await addDoc(
            collection(
                db,
                "pedidos"
            ),
            {
                fecha:
                    new Date()
                        .toISOString(),

                estado:
                    "Pendiente",

                productos:
                    carrito,

                total
            }
        );

    localStorage.setItem(
        "pedidoActivo",
        pedidoRef.id
    );

    localStorage.setItem(
        "ultimoPedido",
        pedidoRef.id
    );

    // Descontar stock

    for (const item of carrito) {

        const productoRef =
            doc(
                db,
                "productos",
                item.id
            );

        const productoDoc =
            await getDoc(
                productoRef
            );

        if (productoDoc.exists()) {

            const producto =
                productoDoc.data();

            await updateDoc(
                productoRef,
                {
                    stock:
                        producto.stock -
                        item.cantidad
                }
            );

        }

    }

    this.carritoService.vaciar();

    window.location.href =
        "ticket.html";

}
}