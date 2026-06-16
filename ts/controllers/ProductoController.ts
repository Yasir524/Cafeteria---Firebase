import {
    collection,
    getDocs
}
from "firebase/firestore";

import { db }
from "../services/Firebase.js";

import { CarritoService }
from "../services/CarritoService.js";

export class ProductoController {

    private carrito =
        new CarritoService();
    configurarBusqueda() {

    const buscador =
        document.getElementById(
            "buscarProducto"
        ) as HTMLInputElement;

    if (!buscador) return;

    buscador.addEventListener(
        "input",
        () => {

            const texto =
                buscador.value
                .toLowerCase()
                .trim();

            document
            .querySelectorAll(".card")
            .forEach(card => {

                const elemento =
                    card as HTMLElement;

                const nombre =
                    elemento.dataset.nombre
                    ?.toLowerCase()
                    || "";

                const categoria =
                    elemento.dataset.categoria
                    ?.toLowerCase()
                    || "";

                const precio =
                    elemento.dataset.precio
                    || "";

                const coincide =

                    nombre.includes(texto)

                    ||

                    categoria.includes(texto)

                    ||

                    precio.includes(texto);

                elemento.style.display =
                    coincide
                    ? ""
                    : "none";

            });

        }
    );

}

    async cargar() {

        const contenedor =
            document.getElementById(
                "productos"
            );

        if (!contenedor) return;

        contenedor.innerHTML = "";

        const categorias =
            new Map<string, any[]>();

        const ordenCategorias = [
    "Bebidas",
    "Reposteria",
    "Snacks"
];
        const pedidoActivo =
    localStorage.getItem(
        "pedidoActivo"
    );

const banner =
    document.getElementById(
        "pedidoActivoBanner"
    );

if(
    pedidoActivo &&
    banner
){

    banner.style.display =
        "block";

    banner.innerHTML = `
        🧾 Tienes un pedido en proceso.
        Los nuevos productos se agregarán automáticamente.
    `;
}
        const snapshot =
            await getDocs(
                collection(
                    db,
                    "productos"
                )
            );

        snapshot.forEach(doc => {

            const p =
                doc.data();

            const categoria =
                p.categoria || "Otros";

            if (
                !categorias.has(
                    categoria
                )
            ) {

                categorias.set(
                    categoria,
                    []
                );

            }

            categorias.get(categoria)
                ?.push({

                    id: doc.id,
                    ...p

                });

        });

        ordenCategorias.forEach(
    categoria => {

        const productos =
            categorias.get(categoria);

        if (!productos) return;

                contenedor.innerHTML += `

                <section class="categoria">

                    <h2>
                        ${categoria}
                    </h2>

                    <div
                        class="categoria-grid"
                        id="cat-${categoria}">
                    </div>

                </section>

                `;

                const grid =
                    document.getElementById(
                        `cat-${categoria}`
                    );

                if (!grid) return;
                productos.sort(
    (a, b) =>
        a.nombre.localeCompare(
            b.nombre
        )
);

                productos.forEach(p => {

                  grid!.innerHTML += `

<div
class="card"
data-nombre="${p.nombre}"
data-categoria="${p.categoria}"
data-precio="${p.precio}"
>

    <img
    src="${p.imagen}"
    class="producto-img">

    <div class="card-content">

        <div class="categoria-badge">
            ${p.categoria}
        </div>

        <h3>${p.nombre}</h3>

        <p class="precio">
            $${p.precio}
        </p>

        <button
        class="agregar"
        data-id="${p.id}"
        data-nombre="${p.nombre}"
        data-precio="${p.precio}">
        🛒 Agregar al carrito
        </button>

    </div>

</div>

`;
                });

            }

        );

        this.configurarBotones();
        this.configurarBusqueda();
    }

    configurarBotones() {

        const botones =
            document.querySelectorAll(
                ".agregar"
            );

        botones.forEach(btn => {

            btn.addEventListener(
                "click",
                () => {

                    const elemento =
                        btn as HTMLButtonElement;

                    this.carrito.agregar({

                        id:
                            elemento.dataset.id!,

                        nombre:
                            elemento.dataset.nombre!,

                        precio:
                            Number(
                                elemento.dataset.precio
                            ),

                        cantidad: 1

                    });
                    alert(
                        "Producto agregado"
                    );
                }
            );
        });
    }
}