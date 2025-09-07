import { db, /*auth,*/ collection, addDoc, getDocs, query, where } from "./js/firebase.js";
const dbName = "contactsPortafolio";
export default {
    data() {
        return {
            user: null,
            titulo: "Portafolio",
            infoPortafolio: [],
            paramContact: {
                name: "",
                celular: "",
                email: "",
                isActive: "1",
                createdOn: this.getdate()
            },
            themePage: "",
            modePage: "light",
            colors: [
                "red",
                "pink",
                "purple",
                "deep-purple",
                "indigo",
                "blue",
                "light-blue",
                "cyan",
                "teal",
                "green",
                "light-green",
                "lime",
                "yellow",
                "amber",
                "orange",
                "deep-orange",
                "brown",
                "grey",
                "blue-grey",
                "black",
                "white"
            ]
        };
    },
    async mounted() {
        const modePage = localStorage.getItem("modePage");
        this.modePage = modePage ? modePage : "light";
        ui("mode", modePage);
        const themePage = localStorage.getItem("themePage");
        this.themePage = themePage ? themePage : "";
        ui("theme", themePage);

        /*onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
                console.log("Autenticado anónimo con UID:", user.uid);
            }
        });*/

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
        changeTeme(event) {
            const btn = event.target; // el botón clicado
            // Obtiene el background-color computado
            const bgColor = window.getComputedStyle(btn).backgroundColor;
            const colorRgb = rgbToHex(bgColor);
            ui("theme", colorRgb);
            this.themePage = colorRgb;
            localStorage.setItem("themePage", colorRgb);
        },
        changeMode() {
            this.modePage = this.modePage == "light" ? "dark" : "light";
            ui("mode", this.modePage);
            localStorage.setItem("modePage", this.modePage);
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
            Object.keys(obj).forEach(key => {
                if (!ex.includes(key)) {
                    obj[key] = "";
                }
            });
            return true;
        },
        async getInfoPortafolio() {
            showProgress();
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
            hideProgress();
        },
        async insContacto() {
            showProgress();
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
            hideProgress();
        },
        downloadCurriculum() {
            document.getElementById("download_cv_a").click();
        }
    }
};

//Process
function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g).map(x => parseInt(x, 10));
    return "#" + result.map(x => x.toString(16).padStart(2, "0")).join("");
}

//Alerts
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

function showProgress() {
    document.getElementById("idProgress").className = "overlay active";
}
function hideProgress() {
    document.getElementById("idProgress").className = "overlay";
}