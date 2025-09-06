export default {
    data() {
        return {
            titulo: "Portafolio"
        };
    },
    mounted() {

    },
    methods: {
        showSection(id, titulo) {
            this.titulo = titulo;

            // Buscar el elemento por id
            const el = document.getElementById(id);
            if (el) {
                //Desplazamiento suave
                el.scrollIntoView({
                    behavior: "smooth", // "auto" para instantáneo
                    block: "start"      // "start", "center", "end", "nearest"
                });
            }
        },
        scrollTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },

    }
};

//Subir al inicio de las secciones
/*
const btnSubir = document.getElementById("btn_scroll_top");
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        btnSubir.classList.add("scroll-top-show")
    }
    else {
        btnSubir.classList.remove("scroll-top-show")
    }
});

btnSubir.addEventListener("click", () => {

});

//Descargar CV
const btnDescargarCv = document.getElementById("download_cv");
btnDescargarCv.addEventListener("click", () => {
    document.getElementById("download_cv_a").click();
});
*/