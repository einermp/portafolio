import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
//import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDHAl-sgAbAp2E9AKp8LE18dNE_zm9YF6k",
    authDomain: "portafolio-2aa33.firebaseapp.com",
    projectId: "portafolio-2aa33",
    storageBucket: "portafolio-2aa33.firebasestorage.app",
    messagingSenderId: "228081259186",
    appId: "1:228081259186:web:4c887250d7f8f55a84afab"
};

// Inicializar Firebase
const appFirebase = initializeApp(firebaseConfig);
// Exportar Firestore
const db = getFirestore(appFirebase);
/*
const auth = getAuth(appFirebase);

// Hacer login anónimo al cargar la app
signInAnonymously(auth).catch(err => {
  console.error("Error al autenticar anónimamente:", err);
});
*/

export { db, /*auth,*/ collection, addDoc, getDocs, query, where, doc, updateDoc };