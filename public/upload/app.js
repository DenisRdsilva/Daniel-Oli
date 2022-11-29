import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyAny_6AT2YAYjPttmne0jygcqOWtu23lvA",
    authDomain: "danielolifotografias.firebaseapp.com",
    databaseURL: "https://danielolifotografias-default-rtdb.firebaseio.com",
    projectId: "danielolifotografias",
    storageBucket: "danielolifotografias.appspot.com",
    messagingSenderId: "1084089897568",
    appId: "1:1084089897568:web:35fcfd9ddedf03620ae905"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let signin = document.getElementById('signbtn');
let signout = document.getElementById('logout');

signin.addEventListener("click", (e) => {
    e.preventDefault();

    var email = document.getElementById("email");
    var senha = document.getElementById("senha");

    signInWithEmailAndPassword(auth, email.value, senha.value).then((userCredentials) => {
        var user = userCredentials.user;
        alert(user.email + " efetuou login com sucesso");
        window.location.href = "upload.html";
    }).catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage);
    })
})

signout.addEventListener("click", (c) => {
    c.preventDefault();
    logout = () => {
        signOut(auth);
        window.location.href = "login.html";
    };
})

