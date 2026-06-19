export class ChatBotController {
    iniciar() {
        const boton = document.getElementById("chatBtn");
        const chat = document.getElementById("chatContainer");
        boton?.addEventListener("click", () => {
            chat.style.display =
                chat.style.display ===
                    "block"
                    ? "none"
                    : "block";
        });
        document
            .getElementById("enviarChat")
            ?.addEventListener("click", () => {
            this.enviar();
        });
    }
    enviar() {
        const input = document.getElementById("chatInput");
        const texto = input.value.trim();
        if (!texto)
            return;
        const mensajes = document.getElementById("chatMensajes");
        mensajes.innerHTML += `

        <div class="usuario">

            ${texto}

        </div>

        `;
        const respuesta = this.obtenerRespuesta(texto);
        mensajes.innerHTML += `

        <div class="bot">

            ${respuesta}

        </div>

        `;
        input.value = "";
        mensajes.scrollTop =
            mensajes.scrollHeight;
    }
    obtenerRespuesta(pregunta) {
        pregunta =
            pregunta.toLowerCase();
        if (pregunta.includes("horario")) {
            return `
            Abrimos de
            8:00 AM a 9:00 PM.
            `;
        }
        if (pregunta.includes("ubicacion") ||
            pregunta.includes("dirección")) {
            return `
            Estamos en el
            centro de la ciudad.
            `;
        }
        if (pregunta.includes("pedido")) {
            return `
            Puedes revisar tu
            pedido en la sección
            Ticket.
            `;
        }
        if (pregunta.includes("menu")) {
            return `
            Puedes ver todos
            nuestros productos
            en el menú principal.
            `;
        }
        if (pregunta.includes("pago")) {
            return `
            Aceptamos efectivo
            y tarjeta.
            `;
        }
        return `
        Lo siento,
        no entendí tu pregunta.
        `;
    }
}
