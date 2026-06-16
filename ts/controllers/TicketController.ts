import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/Firebase.js";

export class TicketController {

    cargar() {
        const id =
            localStorage.getItem(
                "ultimoPedido"
            );
        if (!id) {
            alert(
                "No hay pedido para mostrar"
            );
            return;
        }
        const ticket =
            document.getElementById(
                "ticket"
            );
        if (!ticket) return;
        onSnapshot(
            doc(
                db,
                "pedidos",
                id
            ),
            (snapshot) => {
                const pedido =
                    snapshot.data();
                if (!pedido) return;
                let detalle = "";
                pedido.productos.forEach(
                    (p: any) => {
                        const subtotal =
                            p.precio *
                            p.cantidad;
                        detalle += `
                        <tr>
                            <td>
                                ${p.nombre}
                            </td>
                            <td>
                                ${p.cantidad}
                            </td>
                            <td>
                                $${p.precio}
                            </td>
                            <td>
                                $${subtotal}
                            </td>
                        </tr>
                        `;
                    }
                );

                const fecha =
                    new Date(
                        pedido.fecha
                    )
                        .toLocaleString();
                ticket.innerHTML = `
                <div class="ticket-card">
                    <h1>
                        ☕ Cafetería Café & Aroma
                    </h1>
                    <h2>
                        Ticket de Compra
                    </h2>
                    <p>
                        <strong>
                            Pedido:
                        </strong>

                        ${id}
                    </p>
                    <p>
                        <strong>
                            Fecha:
                        </strong>
                        ${fecha}
                    </p>
                    <table
                        border="1"
                        width="100%"
                    >
                        <thead>
                            <tr>
                                <th>
                                    Producto
                                </th>
                                <th>
                                    Cant.
                                </th>
                                <th>
                                    Precio
                                </th>
                                <th>
                                    Subtotal
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            ${detalle}
                        </tbody>
                    </table>
                    <hr>
                    <h2>
                        Total:
                        $${pedido.total}
                    </h2>
                    <h3>
                        Estado:
                        ${pedido.estado}
                    </h3>
                    <button
                        id="btnImprimir"
                    >
                        Imprimir Ticket
                    </button>
                    <button
                        id="btnVolver"
                        onclick="window.location.href='index.html'"
                    >
                        Volver al Menú
                    </button>
                    <button
                        id="btnCancelarCompra"
                    >
                        Cancelar Compra
                    </button>

                    <div class="nota">
                        <p>
                            Gracias por su compra!
                        </p>
                    </div>  
                </div>
                `;
                document
                    .getElementById(
                        "btnFinalizar"
                    )
                    ?.addEventListener(
                        "click",
                        () => {

                            localStorage.removeItem(
                                "pedidoActivo"
                            );

                            window.location.href =
                                "index.html";

                        }
                    );
                document
                    .getElementById(
                        "btnImprimir"
                    )
                    ?.addEventListener(
                        "click",
                        () => {

                            window.print();
                        }
                    );
                document
                    .getElementById(
                        "btnVolver"
                    )
                    ?.addEventListener(
                        "click",
                        () => {
                            window.location.href = 'index.html';
                        }
                    );
                document
                    .getElementById(
                        "btnCancelarCompra"
                    )
                    ?.addEventListener(
                        "click",
                        () => {
                            if (confirm("¿Desea cancelar su compra?")) {
                                localStorage.removeItem("ultimoPedido");
                                window.location.href = 'index.html';
                            }
                        }
                    );
            }

        );
        const btn =
            document.getElementById(
                "btnAgregarMas"
            );

        btn?.addEventListener(
            "click",
            () => {

                window.location.href =
                    "index.html";

            }
        );

    }

}