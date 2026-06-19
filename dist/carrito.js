import { CarritoService } from "./services/CarritoService.js";
import { ToastService } from "./services/ToastService.js";
const carritoService = new CarritoService();
// 1. Función para pintar los productos del carrito en el HTML
function renderizarCarrito() {
    const contenedor = document.getElementById("carrito");
    const totalElemento = document.getElementById("total");
    if (!contenedor || !totalElemento)
        return;
    const productos = carritoService.obtener();
    // Si el carrito está vacío
    if (productos.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío 🛒</p>";
        totalElemento.textContent = "Total: $0";
        return;
    }
    // Dibujar los productos
    let total = 0;
    contenedor.innerHTML = productos.map(item => {
        total += item.precio * item.cantidad;
        return `
            <div class="carrito-item" style="display: flex; justify-content: space-between; margin-bottom: 10px; align-items: center;">
                <div>
                    <strong>${item.nombre}</strong> - $${item.precio} x ${item.cantidad}
                </div>
                <button class="btn-eliminar-item" data-id="${item.id}" style="background-color: #ff4d4d; color: white; border: none; padding: 5px 10px; cursor: pointer;">
                    ❌ Eliminar
                </button>
            </div>
        `;
    }).join("");
    totalElemento.textContent = `Total: $${total}`;
    // Volver a escuchar los eventos de los botones "Eliminar" individuales recién creados
    configurarBotonesEliminar();
}
// 2. Configurar los eventos para eliminar un producto individual
function configurarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll(".btn-eliminar-item");
    botonesEliminar.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const boton = e.currentTarget;
            const id = boton.dataset.id;
            if (id) {
                carritoService.eliminar(id);
                ToastService.mostrar("Producto eliminado", "success");
                renderizarCarrito(); // Recargamos los componentes visuales
            }
        });
    });
}
// 3. Configurar el botón "Vaciar Carrito" general
function configurarBotonVaciar() {
    const btnVaciar = document.getElementById("btnVaciar");
    if (btnVaciar) {
        btnVaciar.addEventListener("click", () => {
            if (carritoService.obtener().length === 0) {
                ToastService.mostrar("El carrito ya está vacío", "info");
                return;
            }
            carritoService.vaciar();
            ToastService.mostrar("Carrito vaciado correctamente", "success");
            renderizarCarrito(); // Recargamos los componentes visuales
        });
    }
}
// Inicializar la página cuando cargue todo el DOM
document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();
    configurarBotonVaciar();
});
