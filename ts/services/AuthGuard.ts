import {
    getAuth,
    onAuthStateChanged
}
from "firebase/auth";

export class AuthGuard {

    static verificar() {

        const auth =
        getAuth();

        onAuthStateChanged(
            auth,
            (user) => {

                if(!user){

                    window.location.href =
                    "login.html";

                }

            }
        );

    }

}