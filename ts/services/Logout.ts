import {
    getAuth,
    signOut
}
from "firebase/auth";

const boton =
document.getElementById(
    "logoutBtn"
);

boton?.addEventListener(
    "click",
    async(e)=>{

        e.preventDefault();

        await signOut(
            getAuth()
        );

        window.location.href =
        "login.html";

    }
);