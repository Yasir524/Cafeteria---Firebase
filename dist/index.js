import { ProductoController } from "./controllers/ProductoController";
import { ChatBotController } from "./controllers/ChatBotController.js";
import "./services/Logout.js";
const controller = new ProductoController();
controller.cargar();
const chat = new ChatBotController();
chat.iniciar();
