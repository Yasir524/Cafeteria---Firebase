import { CarritoService }
from "../services/CarritoService.js";

export class CarritoController {

    private service =
        new CarritoService();

    cargar() {

        const carrito =
            this.service.obtener();

        const div =
            document.getElementById("carrito");

        if (!div) return;

        div.innerHTML = "";

        let total = 0;

        carrito.forEach(item => {

            total +=
                item.precio *
                item.cantidad;

            div.innerHTML += `

            <div class="card">

                <h3>${item.nombre}</h3>

                <p>Cantidad: ${item.cantidad}</p>

                <p>Precio: $${item.precio}</p>

            </div>

            `;

        });

        const totalHTML =
            document.getElementById("total");

        if (totalHTML) {

            totalHTML.innerHTML =
                `Total: $${total}`;

        }

    }

}