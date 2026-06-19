import { AuthService } from "../services/AuthService.js";
import { ToastService } from "../services/ToastService.js";

export class AuthController {

    service = new AuthService();

    async login() {

        const email =
            (document.getElementById("email") as HTMLInputElement).value;

        const password =
            (document.getElementById("password") as HTMLInputElement).value;

        try {
            const credenciales =
                await this.service.login(
                    email,
                    password
                );
            const rol =
                await this.service.obtenerRol(
                    credenciales.user.uid
                );

            console.log(
                "UID:",
                credenciales.user.uid
            );

            console.log(
                "ROL:",
                rol
            );
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

                   ToastService.mostrar(
    "El usuario no tiene rol asignado",
    "error"
);
            }
        }
        catch (error: any) {

            console.error(error);

           ToastService.mostrar(
    "Correo o contraseña incorrectos",
    "error"
);

        }
    }
}