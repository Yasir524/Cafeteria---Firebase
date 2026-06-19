export class CarritoService {
    obtener() {
        return JSON.parse(localStorage.getItem("carrito") || "[]");
    }
    guardar(carrito) {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    agregar(item) {
        const carrito = this.obtener();
        const existente = carrito.find(p => p.id === item.id);
        if (existente) {
            // ✨ Validación: Si sumarle uno supera el stock, lanzamos un error
            if (existente.cantidad >= existente.stock) {
                throw new Error(`Lo sentimos, no hay más stock disponible de este producto.`);
            }
            existente.cantidad++;
        }
        else {
            // ✨ Si es nuevo, validamos que al menos haya 1 en stock de entrada
            if (item.stock <= 0) {
                throw new Error(`Producto agotado.`);
            }
            carrito.push(item);
        }
        this.guardar(carrito);
    }
    eliminar(id) {
        const carrito = this.obtener().filter(p => p.id !== id);
        this.guardar(carrito);
    }
    vaciar() {
        this.guardar([]);
    }
}
