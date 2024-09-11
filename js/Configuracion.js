import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB11E-kt0Vv9AFHWYDFNHL_EbyByZsPBRU",
    authDomain: "mgpgt-cc171.firebaseapp.com",
    projectId: "mgpgt-cc171",
    storageBucket: "mgpgt-cc171.appspot.com",
    messagingSenderId: "785941149932",
    appId: "1:785941149932:web:4929a271afacf862254dc9",
    measurementId: "G-LV2T6259HQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };