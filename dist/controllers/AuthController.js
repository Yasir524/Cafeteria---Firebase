import { AuthService } from "../services/AuthService.js";
import { ToastService } from "../services/ToastService.js";
export class AuthController {
    constructor() {
        this.service = new AuthService();
    }
    async login() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        try {
            const credenciales = await this.service.login(email, password);
            const rol = await this.service.obtenerRol(credenciales.user.uid);
            console.log("UID:", credenciales.user.uid);
            console.log("ROL:", rol);
            switch (rol) {
                case "cliente":
                    window.location.href =
                        "index.html";
                    break;
                case "barista":
                    window.location.href =
                        "pedidos.html";
                    break;
                case "gerente":
                    window.location.href =
                        "panel.html";
                    break;
                    ToastService.mostrar("El usuario no tiene rol asignado", "error");
            }
        }
        catch (error) {
            console.error(error);
            ToastService.mostrar("Correo o contraseña incorrectos", "error");
        }
    }
}
