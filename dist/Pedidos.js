import { PedidoBaristaController } from "./controllers/PedidoBaristaController.js";
import { AuthGuard } from "./services/AuthGuard.js";
import "./services/Logout.js";
AuthGuard.verificar();
const controller = new PedidoBaristaController();
controller.escucharPedidos();
