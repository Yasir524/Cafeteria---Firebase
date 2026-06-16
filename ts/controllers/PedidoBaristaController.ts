import {
    collection,
    onSnapshot,
    doc,
    updateDoc
} from "firebase/firestore";

import { db }
from "../services/Firebase.js";

export class PedidoBaristaController {

    escucharPedidos() {

        const contenedor =
            document.getElementById("pedidos");

        if (!contenedor) return;

        onSnapshot(

            collection(db, "pedidos"),

            (snapshot) => {

                contenedor.innerHTML = "";

                snapshot.forEach((pedidoDoc) => {

                    const pedido =
                        pedidoDoc.data();

                    contenedor.innerHTML += `

                    <div class="card">

                        <h3>
                        Pedido
                        </h3>

                        <p>
                        Estado:
                        ${pedido.estado}
                        </p>

                        <p>
                        Total:
                        $${pedido.total}
                        </p>

                        <button
                        class="entregar"
                        data-id="${pedidoDoc.id}"
                        >
                        Entregado
                        </button>

                    </div>

                    `;
                });

                this.configurarBotones();

            }

        );

    }

    configurarBotones() {

        const botones =
            document.querySelectorAll(".entregar");

        botones.forEach(btn => {

            btn.addEventListener(
                "click",
                async () => {

                    const id =
                        (btn as HTMLButtonElement)
                            .dataset.id!;

                    await updateDoc(
                        doc(db, "pedidos", id),
                        {
                            estado: "Entregado"
                        }
                    );

                }
            );

        });

    }

}