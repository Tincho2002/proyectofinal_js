//En este script se encuentra el código del carrito de compras interactuando el usuario
//con el HTML al momento de seleccionar el producto con el botón "Agregar al Carrito"

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos');
let articulosCarrito = [];

// Crear eventos con los productos (alimentos para mascotas)
cargarEventos();

function cargarEventos() {
    // Agregar producto
    listaProductos.addEventListener('click', agregarProducto);

    // Eliminar producto del carrito
    contenedorCarrito.addEventListener('click', eliminarProducto);
    // Varciar productos del carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    });
}

// Agregar producto
function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerProducto(productoSeleccionado);
        Swal.fire({
            icon: 'success',
            title: 'Nuevo producto agregado al carrito',
            text: agregarProducto.nombre,
            confirmButtonColor: "#444444"
        });
    }

}


// Eliminar producto del carrito
function eliminarProducto(e) {
    if (e.target.classList.contains('borrar-producto')) {
        const productoID = e.target.getAttribute('data-id');

        // Eliminar del array del carrito
        articulosCarrito = articulosCarrito.filter((producto) => producto.id !== productoID);
        carritoHTML();
        Swal.fire({
            icon: 'error',
            title: 'Producto Eliminado',
            text: eliminarProducto.nombre,
            confirmButtonColor: "#444444"
        });
    }
}
// Leer producto seleccionado
function leerProducto(producto) {
    const infoProducto = {
        img: producto.querySelector('img').src,
        titulo: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    const existe = articulosCarrito.some((producto) => producto.id === infoProducto.id);

    if (existe) {
        // actualizar la cantidad (va sumando al carrito cada vez que se cliquea en e botón "Agregar al Carrito")
        const producto = articulosCarrito.map((producto) => {
            // Con map creamos nuevo array
            if (producto.id === infoProducto.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        });
        articulosCarrito = [...producto];
    } else {
        articulosCarrito = [...articulosCarrito, infoProducto];
    }
    carritoHTML();
}

// Mostrar en conetenedor HTML
function carritoHTML() {
    limpiarHTML();

    // Recorrer array
    articulosCarrito.forEach((producto) => {
        const row = document.createElement('tr');
        row.innerHTML = `
		<td>
			<img src="${producto.img}" width="100">
		</td>
		<td> ${producto.titulo} </td>
		<td> ${producto.precio} </td>
		<td> ${producto.cantidad} </td>
		<td>
			<a href="#" class="borrar-producto" data-id="${producto.id}">🗑️</a>
		</td>
		`;

        // Mostrar en HTML
        contenedorCarrito.appendChild(row);
    });
}

// Limpiar HTML
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
        Swal.fire(
            'Carrito Vacío?',
            'Tus mascotas no tendrán qué comer...eres un insensible!!?',
            'warning'
          )
    }
}