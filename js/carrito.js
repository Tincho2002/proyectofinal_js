document.addEventListener('DOMContentLoaded', () => {

    // Variables
    const Productos = [
        { id: 01, tipo: 'Seco', nombre: 'EXCELLENT', precio: 14400, imagen: '../img/ID1.jpg' },
        { id: 02, tipo: 'Seco', nombre: 'ROYAL CANIN', precio: 15100, imagen: '../img/ID2.jpg' },
        { id: 03, tipo: 'Seco', nombre: 'CAT CHOW', precio: 10050, imagen: '../img/ID3.jpg' },
        { id: 04, tipo: 'Humedo', nombre: 'PROPLAN', precio: 3800, imagen: '../img/ID4.jpg' },
        { id: 05, tipo: 'Humedo', nombre: 'CAT CHOW', precio: 2300, imagen: '../img/ID5.jpg' },
        { id: 06, tipo: 'Humedo', nombre: 'ROYAL CANIN', precio: 4800, imagen: '../img/ID6.jpg' },
        { id: 07, tipo: 'Seco', nombre: 'EXCELLENT', precio: 8300, imagen: '../img/ID7.jpg' },
        { id: 08, tipo: 'Seco', nombre: 'EUKANUBA', precio: 11300, imagen: '../img/ID8.jpg' },
        { id: 09, tipo: 'Seco', nombre: 'ROYAL CANIN', precio: 13700, imagen: '../img/ID9.png' },
        { id: 10, tipo: 'Humedo', nombre: 'DOG CHOW', precio: 4300, imagen: '../img/ID10.jpg' },
        { id: 11, tipo: 'Humedo', nombre: 'ROYAL CANIN', precio: 3000, imagen: '../img/ID11.png' },
        { id: 12, tipo: 'Humedo', nombre: 'OPTIMUN', precio: 2300, imagen: '../img/ID12.jpg' },

    ];

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const DOMbotonFinalizar = document.querySelector('#boton-finalizar');
    const DOMseleccionProductos = document.querySelector('#seleccion');
    const miLocalStorage = window.localStorage;
    
        //$("#Productos option[value='pordefecto']").attr("selected", true);
        //$("#Productos").on("change", ordenarProductos);


    // Funciones

    /**
     * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
     */
    function renderizarProductos() {
        Productos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h6');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${divisa} ${info.precio}`;
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-dark');
            miNodoBoton.textContent = 'Agregar al Carrito';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', añadirProductoAlCarrito);
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }
    
    //funcion para ordenar los productos segun precio y orden alfabetico
    function ordenarProductos() {
        const seleccion = seleccion.val();
        if (seleccion == "menor") {
            Productos.sort(function(a, b) {
                return a.precio - b.precio
            });
        } else if (seleccion == "mayor") {
            Productos.sort(function(a, b) {
                return b.precio - a.precio
            });
        } else if (seleccion == "alfabetico") {
            Productos.sort(function(a, b) {
                return a.nombre.localeCompare(b.nombre);
            });
        }
        //luego del reordenamiento tenemos que volver a renderizar
        miNodoCardBody.remove();
        renderizarProductos();
     }
    /**
     * Evento para añadir un producto al carrito de la compra
     */
    function añadirProductoAlCarrito(evento) {
        // añadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        Swal.fire({
            icon: 'success',
            title: 'Nuevo producto agregado al carrito',
            text: añadirProductoAlCarrito.nombre,
            confirmButtonColor: "#444444"
        });
        // Actualizamos el carrito 
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();
    }

    /**
     * Dibuja todos los productos guardados en el carrito
     */
    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = Productos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-justify', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${divisa} ${miItem[0].precio}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = '🗑️';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        // Renderizamos el precio total en el HTML
        DOMtotal.textContent = calcularTotal();
    }

    /**
     * Evento para borrar un elemento del carrito
     */
    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        Swal.fire({
            icon: 'error',
            title: 'Producto Eliminado',
            text: borrarItemCarrito.nombre,
            confirmButtonColor: "#444444"
        });
        // volvemos a renderizar
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();

    }



    /**
     * Calcula el precio total teniendo en cuenta los productos repetidos
     */
    function calcularTotal() {
        // Recorremos el array del carrito 
        return carrito.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = Productos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Los sumamos al total
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }



    /**
     * Varia el carrito y vuelve a dibujarlo
     */
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        /*Swal.fire(
            'Carrito Vacío?',
            'Tus mascotas no tendrán qué comer...eres un insensible!!?',
            'warning'
          )*/
        // Renderizamos los cambios
        renderizarCarrito();
        // Borra LocalStorage
        localStorage.clear();
    }

    function finalizar() {
        //definimos la constante para que al pulsar el botón salgan los altert
        const precioFinal = DOMtotal.textContent;
        Swal.fire({
            title: '¿Seguro que queres finalizar tu compra?',
            text: `Total a abonar: $${precioFinal}`,
            showCancelButton: true,
            confirmButtonColor: '#008f39',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Compra Confirmada',
                    'Tu mascota está feliz!!!',
                    'success'
                )
                vaciarCarrito();
            }
        })
    }

    function guardarCarritoEnLocalStorage() {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage() {
        // ¿Existe un carrito previo guardado en LocalStorage?
        if (miLocalStorage.getItem('carrito') !== null) {
            // Carga la información
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);
    DOMbotonFinalizar.addEventListener('click', finalizar);
    DOMseleccionProductos.addEventListener('click', ordenarProductos);
    //DOMoptionProductos.addEventListener('change', ordenarProductos);
    //DOMbotonPagar.addEventListener('click', pagar);


    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();

})