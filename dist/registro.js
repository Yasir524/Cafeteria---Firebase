import { RoleGuard } from "./services/RoleGuard.js";
import { ProductoAdminController } from "./controllers/ProductoAdminController.js";
import "./services/Logout.js";
RoleGuard.verificarRol("gerente");
console.log("registro cargado");
const controller = new ProductoAdminController();
controller.cargarProductos();
document
    .getElementById("btnGuardar")
    ?.addEventListener("click", () => {
    console.log("click guardar");
    controller.guardar();
});
