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

const toggleButton = document.getElementById('toggle-button');
toggleButton.addEventListener('change', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem("dark-mode", document.body.classList);
});

if (localStorage.getItem('dark-mode') === 'dark') {
    document.body.classList.toggle('dark');
    toggleButton.checked = true;
}

let items = document.querySelectorAll(".items");
const secciones = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            items.forEach((item) => {
                item.classList.remove("items-active");
                if(item.parentNode.href.includes(id)){
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