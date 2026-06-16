import {InventarioController} from "./controllers/InventarioController.js";
import {RoleGuard} from "./services/RoleGuard.js";
import "./services/Logout.js";

RoleGuard.verificarRol(
    "gerente"
);

const controller =
new InventarioController();

controller.cargar();