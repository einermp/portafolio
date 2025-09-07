import { db, collection, addDoc, getDocs, query, where, doc, updateDoc } from "../js/firebase.js";
const dbName = "portafolio";
export default {
    data() {
        return {
            titulo: "Portafolio",
            infoPortafolio: [],
            linkCurriculum: "",
            linkImg: ""
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
                this.linkCurriculum = this.infoPortafolio.linkCurriculum;
                this.linkImg = this.infoPortafolio.linkImg;
            } catch (e) {
                showError("Error al cargar información del portafolio.");
            }
        },
        async updaInfPortafolio() {
            try {
                if (!this.validJSON(this.infoPortafolio)) {
                    showError("Error - Debe completar todos los campos.");
                    return;
                }
                const usuarioRef = doc(db, dbName, this.infoPortafolio.id);
                //Referencia al documento   
                let linkCurriculum = this.infoPortafolio.linkCurriculum;
                if (this.linkCurriculum != this.infoPortafolio.linkCurriculum) {
                    const idCurriculum = this.getIdArchivo(this.infoPortafolio.linkCurriculum);
                    linkCurriculum = "https://drive.google.com/uc?export=download&id=" + idCurriculum;
                }
                let linkImg = this.infoPortafolio.linkImg;
                if (this.linkImg != this.infoPortafolio.linkImg) {
                    const idImg = this.getIdArchivo(this.infoPortafolio.linkImg);
                    linkImg = "https://lh3.googleusercontent.com/d/" + idImg;
                }

                //Actualizar campos específicos
                await updateDoc(usuarioRef, {
                    nombre: this.infoPortafolio.nombre,
                    email: this.infoPortafolio.email,
                    celular: this.infoPortafolio.celular,
                    descripcion: this.infoPortafolio.descripcion,
                    linkCurriculum: linkCurriculum,
                    linkImg: linkImg
                });

                showSuccess("Datos actualizados correctamente.");
            } catch (err) {
                showError(err);
            }
        },
        getIdArchivo(link) {
            const inicio = link.indexOf("file/d/") + 7;
            const fin = link.indexOf("/view?");
            return link.substring(inicio, fin);
        }
        // async cargarUsuarios() {
        //     const querySnapshot = await getDocs(collection(db, dbName));
        //     this.usuarios = querySnapshot.docs.map(doc => doc.data());
        // }
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