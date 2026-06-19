
export class ToastService {

    static mostrar(
        mensaje:string,
        tipo:
            "success" |
            "error" |
            "info" = "info"
    ){

        const contenedor =
            document.getElementById(
                "toast-container"
            );

        if(!contenedor)
            return;

        const toast =
            document.createElement(
                "div"
            );

        toast.className =
            `toast ${tipo}`;

        toast.textContent =
            mensaje;

        contenedor.appendChild(
            toast
        );

        setTimeout(()=>{

            toast.remove();

        },3000);

    }

}