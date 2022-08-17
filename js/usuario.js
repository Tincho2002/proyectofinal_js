//validación de la dirección de correo electrónico
const email = document.getElementById("mail");

email.addEventListener("input", function(event) {
    if (email.validity.typeMismatch) {
        email.setCustomValidity("¡Se esperaba una dirección de correo electrónico!");
    } else {
        email.setCustomValidity("");
    }
});

//validación de usuario y contraseña

function usrpas(){
    if (document.form1.txt.value=="squevedo" && document.form1.num.value=="cabj1970" || document.form1.txt.value=="squevedo" && document.form1.num.value=="cabj1970"){window.location="index.html"}
     
    else {/*alert("Error en Usuario o Contraseña. Intenta de nuevo.")*/}
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error en Usuario o Contraseña. Intenta de nuevo',
        footer: '<a href="./paginas/contacto.html">Por favor, contactate con nosotros!</a>'
      })
    }
    document.oncontextmenu=new Function("return false");

   

/*let recordar = document.getElementById("rememberMe");
let btnLogin = document.getElementById('btnLogin');
let btnVaciarTodo = document.getElementById('btnVaciarLocalStorage');
let btnVaciarSessionStorage = document.getElementById('btnVaciarSessionStorage');

function guardarDatos(storage) {
    let user = document.getElementById('emailAddress').value;
    let pass = document.getElementById('password').value;

    const usuario = {
        "user": user,
        "pass": pass
    }

    if (storage === "localStorage") {
        localStorage.setItem('user', JSON.stringify(usuario));
    }

    if (storage === "sessionStorage") {
        sessionStorage.setItem('user', JSON.stringify(usuario));
    }

}


function borrarDatos(storage) {
    storage.clear();
}


btnLogin.addEventListener('click', () => {
    if (recordar.checked) {
        guardarDatos('localStorage');
    } else {
        guardarDatos('sessionStorage');
    }
});

btnVaciarTodo.addEventListener('click', () => {
    borrarDatos(localStorage);
    borrarDatos(sessionStorage);
})

btnVaciarSessionStorage.addEventListener('click', () => {
    borrarDatos(sessionStorage)
})*/