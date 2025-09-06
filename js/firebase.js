// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.3/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHAl-sgAbAp2E9AKp8LE18dNE_zm9YF6k",
    authDomain: "portafolio-2aa33.firebaseapp.com",
    projectId: "portafolio-2aa33",
    storageBucket: "portafolio-2aa33.firebasestorage.app",
    messagingSenderId: "228081259186",
    appId: "1:228081259186:web:4c887250d7f8f55a84afab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
    getFirestore,
    doc,
    getDoc,
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    deleteField
} from "https://www.gstatic.com/firebasejs/11.7.3/firebase-firestore.js";

const db = getFirestore();

async function add() {
    var ref = collection(db, "portafolio");
    const result = await addDoc(ref, {
        Nombre: document.getElementById("name").value,
        Telefono: document.getElementById("cel").value,
        Email: document.getElementById("email").value
    })
        .then(() => {
            alert("ok");
        })
        .catch((e) => {
            alert(e);
        });
}

document.getElementById("btn_enviar").addEventListener("click", add);