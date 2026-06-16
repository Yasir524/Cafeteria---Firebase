import { CarritoItem } from "../models/CarritoItem.js";

export class CarritoService {

    obtener(): CarritoItem[] {

        return JSON.parse(
            localStorage.getItem("carrito") || "[]"
        );

    }

    guardar(carrito:CarritoItem[]) {

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );

    }

    agregar(item:CarritoItem) {

        const carrito = this.obtener();

        const existente = carrito.find(
            p => p.id === item.id
        );

        if(existente){

            existente.cantidad++;

        }
        else{

            carrito.push(item);

        }

        this.guardar(carrito);

    }
    eliminar(id:string){
    
    const carrito =
    this.obtener()
    .filter(p => p.id !== id);

    this.guardar(carrito);

}
vaciar(){

    localStorage.removeItem(
        "carrito"
    );

}
}