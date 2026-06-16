import { CarritoController } from "./controllers/CarritoController.js";
import { PedidoController } from "./controllers/PedidoController.js";
import "./services/Logout.js";

const controller =
    new CarritoController();

controller.cargar();
const carrito =
    new CarritoController();
    carrito.cargar();
const pedido =
    new PedidoController();

document
.getElementById("btnPedido")
?.addEventListener(
    "click",
    () => pedido.realizarPedido()
);