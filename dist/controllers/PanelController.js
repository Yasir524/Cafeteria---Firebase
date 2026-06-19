import { getAuth, signOut } from "firebase/auth";
export class PanelController {
    iniciar() {
        document
            .getElementById("btnPedidos")
            ?.addEventListener("click", () => {
            window.location.href =
                "pedidos.html";
        });
        document
            .getElementById("btnInventario")
            ?.addEventListener("click", () => {
            window.location.href =
                "tabla.html";
        });
        document
            .getElementById("btnProductos")
            ?.addEventListener("click", () => {
            window.location.href =
                "registro.html";
        });
        document
            .getElementById("btnMenu")
            ?.addEventListener("click", () => {
            window.location.href =
                "index.html";
        });
        document
            .getElementById("btnSalir")
            ?.addEventListener("click", async () => {
            await signOut(getAuth());
            window.location.href =
                "login.html";
        });
    }
}
