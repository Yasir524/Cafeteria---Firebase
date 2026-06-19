import { AuthController } from "./controllers/AuthController.js";
const controller = new AuthController();
document
    .getElementById("btnLogin")
    ?.addEventListener("click", () => {
    controller.login();
});
