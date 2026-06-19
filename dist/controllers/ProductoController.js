import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/Firebase.js";
import { CarritoService } from "../services/CarritoService.js";
import { ToastService } from "../services/ToastService";
export class ProductoController {
    constructor() {
        this.carrito = new CarritoService();
    }
    configurarBusqueda() {
        const buscador = document.getElementById("buscarProducto");
        if (!buscador)
            return;
        buscador.addEventListener("input", () => {
            const texto = buscador.value.toLowerCase().trim();
            document.querySelectorAll(".card").forEach(card => {
                const elemento = card;
                const nombre = elemento.dataset.nombre?.toLowerCase() || "";
                const categoria = elemento.dataset.categoria?.toLowerCase() || "";
                const precio = elemento.dataset.precio || "";
                const coincide = nombre.includes(texto) ||
                    categoria.includes(texto) ||
                    precio.includes(texto);
                elemento.style.display = coincide ? "" : "none";
            });
        });
    }
    async cargar() {
        const contenedor = document.getElementById("productos");
        if (!contenedor)
            return;
        contenedor.innerHTML = "";
        const categorias = new Map();
        const ordenCategorias = ["Bebidas", "Reposteria", "Snacks"];
        const pedidoActivo = localStorage.getItem("pedidoActivo");
        const banner = document.getElementById("pedidoActivoBanner");
        if (pedidoActivo && banner) {
            banner.style.display = "block";
            banner.innerHTML = `
                🧾 Tienes un pedido en proceso.
                Los nuevos productos se agregarán automáticamente.
            `;
        }
        const snapshot = await getDocs(collection(db, "productos"));
        snapshot.forEach(doc => {
            const p = doc.data();
            const categoria = p.categoria || "Otros";
            if (!categorias.has(categoria)) {
                categorias.set(categoria, []);
            }
            categorias.get(categoria)?.push({
                id: doc.id,
                stock: p.stock !== undefined ? Number(p.stock) : 0,
                ...p
            });
        });
        ordenCategorias.forEach(categoria => {
            const productos = categorias.get(categoria);
            if (!productos)
                return;
            contenedor.innerHTML += `
                <section class="categoria">
                    <h2>${categoria}</h2>
                    <div class="categoria-grid" id="cat-${categoria}"></div>
                </section>
            `;
            const grid = document.getElementById(`cat-${categoria}`);
            if (!grid)
                return;
            productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
            productos.forEach(p => {
                const stockTexto = p.stock > 0 ? `Stock: ${p.stock} u.` : "🛑 Agotado";
                const botonDeshabilitado = p.stock <= 0 ? "disabled style='opacity: 0.5; cursor: not-allowed;'" : "";
                grid.innerHTML += `
                    <div class="card" data-nombre="${p.nombre}" data-categoria="${p.categoria}" data-precio="${p.precio}">
                        <img src="${p.imagen}" class="producto-img">
                        <div class="card-content">
                            <div class="categoria-badge">${p.categoria}</div>
                            <h3>${p.nombre}</h3>
                            <p class="precio">$${p.precio}</p>
                            <p class="stock-info" style="font-size: 0.9em; color: ${p.stock > 0 ? '#666' : 'red'}; margin-bottom: 8px;">
                                ${stockTexto}
                            </p>
                            <button class="agregar" 
                                data-id="${p.id}" 
                                data-nombre="${p.nombre}" 
                                data-precio="${p.precio}"
                                data-stock="${p.stock}" 
                                ${botonDeshabilitado}>
                                🛒 ${p.stock > 0 ? 'Agregar al carrito' : 'Sin Stock'}
                            </button>
                        </div>
                    </div>
                `;
            });
        });
        // ✨ Se restauraron estas dos llamadas indispensables aquí al final
        this.configurarBotones();
        this.configurarBusqueda();
    }
    configurarBotones() {
        const botones = document.querySelectorAll(".agregar");
        botones.forEach(btn => {
            btn.addEventListener("click", () => {
                const elemento = btn;
                try {
                    this.carrito.agregar({
                        id: elemento.dataset.id,
                        nombre: elemento.dataset.nombre,
                        precio: Number(elemento.dataset.precio),
                        stock: Number(elemento.dataset.stock),
                        cantidad: 1
                    });
                    ToastService.mostrar("Producto agregado al carrito", "success");
                }
                catch (error) {
                    ToastService.mostrar(error.message, "error");
                }
            });
        });
    }
}
