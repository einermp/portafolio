console.log("Ok");
var mainVue = new Vue({
    el: "#minDiv",
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
    localStorage.setItem("dark-mode",  document.body.classList);
});

if (localStorage.getItem('dark-mode') === 'dark') {
    document.body.classList.toggle('dark');
    toggleButton.checked = true;
}