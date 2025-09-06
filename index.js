import { db, collection, addDoc, getDocs, query, where } from "./js/firebase.js";
const dbName = "contactsPortafolio";
export default {
    data() {
        return {
            titulo: "Portafolio",
            infoPortafolio: [],
            paramContact: {
                name: "",
                cel: "",
                email: "",
                isActive: "1",
                createdOn: this.getdate()
            }
        };
    },
    async mounted() {
        await this.getInfoPortafolio();
    },
    methods: {
        getdate() {
            const hoy = new Date();
            const yyyy = hoy.getFullYear();
            const mm = String(hoy.getMonth() + 1).padStart(2, "0"); // Mes empieza en 0
            const dd = String(hoy.getDate()).padStart(2, "0");
            return `${yyyy}-${mm}-${dd}`;
        },
        showSection(id, titulo) {
            this.titulo = titulo;

            // Buscar el elemento por id
            const el = document.getElementById(id);
            if (el) {
                //Desplazamiento suave
                el.scrollIntoView({
                    behavior: "smooth", // "auto" para instantáneo
                    block: "start" // "start", "center", "end", "nearest"
                });
            }
        },
        scrollTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },
        validJSON(obj) {
            // Recorre todas las propiedades del objeto
            for (const key in obj) {
                if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
                    return false;
                }
            }
            return true;
        },
        clearJSON(obj, ex) {
            // Recorre todas las propiedades del objeto
            for (const key in obj) {
                if (!ex.includes(key)) {
                    key = "";
                }
            }
            return true;
        },
        async getInfoPortafolio() {
            try {
                //Referencia a la colección
                const usuariosRef = collection(db, "portafolio");

                //Consulta con filtro
                const q = query(usuariosRef, where("isActive", "==", true));

                //Ejecutar consulta
                const querySnapshot = await getDocs(q);

                //Mapear resultados
                this.infoPortafolio = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))[0];
            } catch (e) {
                showError("Error al cargar información del portafolio.");
            }
        },
        async agregarUsuario() {
            if (!this.validJSON(this.paramContact)) {
                showError("Error - Debe completar todos los campos.");
                return;
            }
            try {
                const data = await addDoc(collection(db, dbName), this.paramContact);
                showSuccess("Datos guardados corectamente.")
                this.clearJSON(this.paramContact, ["isActive", "createdOn"]);
            }
            catch (err) {
                showError(err);
            }
        },
        async cargarUsuarios() {
            const querySnapshot = await getDocs(collection(db, dbName));
            this.usuarios = querySnapshot.docs.map(doc => doc.data());
        }
    }
};
function showSuccess(msg) {
    const el = document.getElementById("alertSuccess");
    el.innerText = msg;
    el.className = "snackbar active";

    setTimeout(() => {
        hideSuccess();
    }, 10000);
}
function hideSuccess() {
    document.getElementById("alertSuccess").className = "snackbar";
}
function showError(msg) {
    const el = document.getElementById("alertError");
    el.innerText = msg;
    el.className = "snackbar error active";

    setTimeout(() => {
        hideError();
    }, 10000);
}
function hideError() {
    document.getElementById("alertError").className = "snackbar error";
}
//Descargar CV
/*
const btnDescargarCv = document.getElementById("download_cv");
btnDescargarCv.addEventListener("click", () => {
    document.getElementById("download_cv_a").click();
});
*/