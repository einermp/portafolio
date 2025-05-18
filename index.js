console.log("Ok");
var mainVue = new Vue({
    el: "#mainDiv",
    data: {

    },
    mounted: function () {
        console.log("Holaa...")
    },
    methods: function () {
    }
});
//Modo dark
const toggleButton = document.getElementById('toggle-button');
toggleButton.addEventListener('change', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem("dark-mode", document.body.classList);
});

if (localStorage.getItem('dark-mode') === 'dark') {
    document.body.classList.toggle('dark');
    toggleButton.checked = true;
}

//Seleccionar menú de acuerdo a la sección en pantalla
let items = document.querySelectorAll(".items");
const secciones = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            items.forEach((item) => {
                item.classList.remove("items-active");
                if (item.parentNode.href.includes(id)) {
                    item.classList.add("items-active");
                }
            });
        }
    });
}, {
    threshold: 0.5, // Ajusta el umbral de visibilidad
});

secciones.forEach((seccion) => observer.observe(seccion));

items.forEach((item) => {
    item.addEventListener("click", () => {
        items.forEach((e) => {
            e.classList.remove("items-active");
            item.classList.add("items-active");
        });
    });
});

//Subir al inicio de las secciones

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
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

//Descargar CV
const btnDescargarCv = document.getElementById("download_cv");
btnDescargarCv.addEventListener("click", () => {
    document.getElementById("download_cv_a").click();
});