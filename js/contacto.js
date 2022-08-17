function validateEmail() {

    // Get our input reference.
    let emailField = document.getElementById('user-email');

    // Define our regular expression.
    let validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    // Using test we can check if the text match the pattern
    if (validEmail.test(emailField.value)) {
        /*alert('Email válido, continuar con los datos solicitados en el formulario');*/
        Swal.fire({
            icon: 'success',
            title: 'Email válido, continuar con los datos solicitados en el formulario',
            confirmButtonColor: "#444444"
        });
        return true;
    } else {
        /*alert('Email invalido, reintentar');*/
        Swal.fire({
            icon: 'error',
            title: 'Email invalido, reintentar',
            cancelButtonColor: "#444444"
        });
        return false;
    }
}

function validarEntero(valor) {
    //intento convertir a entero.
    //si era un entero no le afecta, si no lo era lo intenta convertir
    valor = parseInt(valor)

    //Compruebo si es un valor numérico
    if (isNaN(valor)) {
        //entonces (no es numero) devuelvo el valor cadena vacia
        return ""
    } else {
        //En caso contrario (Si era un número) devuelvo el valor
        return valor
    }
}

function validarform() {
    //valido el nombre
    if (document.fvalida.nombre.value.length == 0) {
        /*alert("Ingresar nombre y apellidos válidos")*/
        Swal.fire({
            icon: 'error',
            title: 'Ingresar nombre y apellidos válidos',
            confirmButtonColor: "#444444"
        });
        document.fvalida.nombre.focus()
        return 0;
    }

    //valido la edad. tiene que ser entero mayor que 18
    edad = document.fvalida.edad.value
    edad = validarEntero(edad)
    document.fvalida.edad.value = edad
    if (edad == "") {
        /*alert("Ingresar edad válida.")*/
        Swal.fire({
            icon: 'error',
            title: 'Ingresar edad válida',
            confirmButtonColor: "#444444"
        });

        document.fvalida.edad.focus()
        return 0;
    } else {
        if (edad < 18) {
            /*alert("Debe ser mayor de 18 años.")*/
            Swal.fire({
                icon: 'error',
                title: 'Debe ser mayor de 18 años',
                confirmButtonColor: "#444444"
            });
            document.fvalida.edad.focus()
            return 0;
        }
    }

    //valido el interés
    if (document.fvalida.interes.selectedIndex == 0) {
        /*alert("Seleccionar motivo de contacto.")*/
        Swal.fire({
            icon: 'error',
            title: 'Seleccionar motivo de contacto',
            confirmButtonColor: "#444444"
        });
        document.fvalida.interes.focus()
        return 0;
    }

    //el formulario se envia
    /*alert("Muchas gracias por enviar el formulario");*/
    Swal.fire({
        icon: 'success',
        title: 'Datos enviados con éxito',
        text: 'En unos días recibirá nuestro contacto!!',
        confirmButtonColor: "#444444"
    });
    document.fvalida.submit();
}