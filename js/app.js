// La idea del proyecto final se basa en una página web de alimentos para mascotas, que 
// publica una promoción de fin de semana de un 30% de descuento. El objetivo es que el cliente 
// (usuario) construya su carito de compras. Para ello deberá ingresar un usuario 
// (tendrá cuatro intentos).
// De ser correcto, tiene acceso a la web, de lo contrario se le impide el acceso.
// Con Login Existente, se le presenta un meú con opciones para consultar los distintos stock.
// También pude filtrar según el tipo de producto (seco o húmedo) para consultar el stock
// Finalmente, se muestra toda la lista de productos inicialados por un ID. 
// Este ID es el que deberá ingresar el cliente (usuario) para hacer su compra y calcular el  
// precio final (neto de descuentos y sumando IVA (21%) y costo de envío ($ 350).
// Al finalizar el programa, se creó la función Reiniciar, con la intención de limpiar la página 
// y recargarla. Por ello, en el HTML se generó un botón para darle sentido a esa función...pero 
// es sólo al efecto de la pre-entrega de este trabajo...Seguramente, con el progreso del curso, 
// será eliminado o sustituido por mejores ideas...


let savedUsuario = 'cabj1970';
let ingresar = false;

for (let i = 3; i >= 0; i--) {
    let userUsuario = prompt('Ingresa tu usuario. Tenés ' + (i + 1) + ' intentos');
    if (savedUsuario == userUsuario) {
        alert('Bienvenido/a a VET-OK!');
        ingresar = true;
        break;
    } else {
        alert('Usuario Inexistente. Te quedan ' + i + ' intentos.')
    }

}

if (ingresar) {
    //Clase para los objetos alimento
    class Alimento {

        constructor(marca, tipo, clase, kg, precio, id) {
            this.marca = marca;
            this.tipo = tipo;
            this.clase = clase;
            this.kg = kg;
            this.precio = precio;
            this.id = id;
        }

        asignarId(array) {
            this.id = array.length;
        }

        presupuestar(precio) {
            this.precio = precio;
        }
    }

    //Nuestro array de alimentos hardcodeado. Algo así como nuestra mock database 
    const alimentos = [
        new Alimento('Excellent', 'seco', 'gato', 15, 14400, 1),
        new Alimento('Royal Canin', 'seco', 'gato', 15, 15100, 2),
        new Alimento('Cat Chow', 'seco', 'gato', 15, 10050, 3),
        new Alimento('Proplan', 'humedo', 'gato', 1, 3800, 4),
        new Alimento('Cat Chow', 'humedo', 'gato', 1, 2300, 5),
        new Alimento('Royal Canin', 'humedo', 'gato', 1, 4800, 6),
        new Alimento('Excellent', 'seco', 'perro', 15, 8300, 7),
        new Alimento('Eukanuba', 'seco', 'perro', 15, 11300, 8),
        new Alimento('Royal Canin', 'seco', 'perro', 15, 13700, 9),
        new Alimento('Proplan', 'humedo', 'perro', 1, 4300, 10),
        new Alimento('Royal Canin', 'humedo', 'perro', 1, 3000, 11),
        new Alimento('Optimun', 'humedo', 'perro', 1, 2300, 12),
    ]

    //console.log(alimentos);



    //--------------------------Pedir que se ingresen alimentos nuevos y sumarlos al array-----------------------------//
    let continuar = true;

    while (continuar) {
        let ingreso = prompt('Ingresar: marca, tipo, clase, peso, precio, separados por asterisco (*). Ingresa Q para finalizar');

        if (ingreso.toUpperCase() == 'Q') {
            continuar = false;
            break;
        }

        //Dividimos el string ingreso en elementos de un array
        let datos = ingreso.split('*');
        //console.log(datos);
        //usamos los elementos del array datos apra crear el objet alimento
        const alimento = new Alimento(datos[0], datos[1], datos[2], parseInt(datos[3]), parseInt(datos[4]));
        //lo sumamos al array de alimentos
        alimentos.push(alimento);

        //le asignamos el id en base a la longitud del array alimentos
        alimento.asignarId(alimentos);

        //console.log(alimento)
    }
    //--------------------------Fin de pedir que se ingresen alimentos nuevos y sumarlos al array-----------------------------//



    //--------------------------Ordenar el array según el criterio que se elija-----------------------------//


    let criterio = parseInt(prompt('Elegí el criterio deseado:\n1 - Marca (A a Z) \n2 - Tipo (Z a A)\n3 - Clase \n4 - Peso (De mayor a menor )\n5 - Precio (De menor a mayor)'));

    function ordenar(criterio, array) {
        let arrayOrdenado = array.slice(0);


        switch (criterio) {
            case 1:
                let marcaAscendente = arrayOrdenado.sort((a, b) => a.marca.localeCompare(b.marca));
                return marcaAscendente;
            case 2:
                let tipoDescendente = arrayOrdenado.sort((a, b) => b.tipo.localeCompare(a.tipo));
                return tipoDescendente;
            case 3:
                let claseDescendente = arrayOrdenado.sort((a, b) => b.clase - a.clase);
                return claseDescendente;
            case 4:
                let pesoDescendente = arrayOrdenado.sort((a, b) => b.kg - a.kg);
                return pesoDescendente;
            case 5:
                let precioAscendente = arrayOrdenado.sort((a, b) => a.precio - b.precio);
                return precioAscendente;
            default:
                alert('Datos Inválidos. Pulsar el botón Reiniciar');
                alert('Elija un criterio del 1 al 5');
                break;
        }
    }

    //--------------------------Fin de ordenar el array de acuerdo al criterio elegido-----------------------------//



    //--------------------------Crear el string de alimento con los resultados-----------------------------//
    function mostrar(array) {
        let info = '';

        array.forEach(elemento => {
            info += 'Marca: ' + elemento.marca + '\nTipo: ' + elemento.tipo + '\nClase: ' + elemento.clase + '\nPeso: ' + elemento.kg + ' kg' + '\nPrecio: $ ' + elemento.precio + ' .\n\n'
        });

        return info;
    }
    //--------------------------Fin de crear el string de alimentos con los resultados-----------------------------//


    alert(mostrar(ordenar(criterio, alimentos)));


    //--------------------------Filtrar alimentos por tipo-----------------------------//
    let tipoElegido = prompt('Ingrese el tipo de alimento para ver su stock existente');

    const filtrado = alimentos.filter((alimento) => alimento.tipo.toLowerCase().includes(tipoElegido.toLowerCase()));
    //--------------------------Fin de filtrar alimentos por tipo-----------------------------//



    //--------------------------Mostrar alimentos filtrados por marca-----------------------------//
    if (filtrado.length == 0) {
        alert('Lo sentimos. No hay stock');
    } else {
        const imprimible = filtrado.map((alimento) => alimento.marca);
        alert('Los alimentos en stock, son:\n- ' + imprimible.join('\n- '));
    }
    //--------------------------Fin de mostrar alimentos por marca-----------------------------//


    /* A continuación se presentan dos alternativas de código para determinar el total a pagar a 
    /* partir del precio de lista, al que se le aplicará el descuento promocionado y luego se lo 
    /* multiplicará por la cantidad de unidades adquiridas. A ese subtotal se le aplicará el IVA 
    /* para luego cargar el costo de envío.
    /* Se establecieron dos criterios. 1) a partir de la función calcular pero sin aplicar arrays 
    /* (éste se sencuentra comentado); y 2) a partir de la función calcular pero aplicando arrays 
    /* (éste se encuentra sin comentar, contínua la ejecución del programa).


    //Calcular el monto total de la compra (sin clase, sin constructor, sin arrays)
    /*function calcularPrecio(precioProducto, cantidadProducto, porcentajeDescuento, costoEnvio) {
        //aplicar del descuento
        let descuento = (precioProducto * porcentajeDescuento) / 100;
        //precio neto de descuento
        let precioConDescuento = precioProducto - descuento;
        //retorno el precio final con descuento y costo de envio, multiplicado por la cantidad de unidades adquiridas
        return ((precioConDescuento * cantidadProducto) * 1.21) + costoEnvio;
    }

    const envio = 350; //valor aproximado del costo de envio promedio dentro de Rosario

    //pedir al cliente el precio del alimento, la cantidad y el porcentaje del descuento
    let producto = parseFloat(prompt('Ingresar el precio del alimento a comprar:'));
    let cantidad = parseInt(prompt('Ingresar la cantidad de unidades a comprar del producto elegido:'));
    let descuento = parseInt(prompt('Ingresar % cupón de descuento:'))

    //llamar a la funcion y luego mostrar el precio final por alert
    let total = calcularPrecio(producto, cantidad, descuento, envio);
    alert('El precio total de tu compra es $' + total);
    alert('¡El alimento ya es de tu mascota!');*/


    //Crear la clase de objeto producto como base para cargar los productos 
    class Producto {
        constructor(nombre, id, precio, tipo, stock) {
            this.nombre = nombre;
            this.id = id;
            this.precio = precio;
            this.tipo = tipo;
            this.stock = stock;
        }

        vender(cantidad) {
            this.stock = this.stock - cantidad;
        }
    }

    //Inicializar los arrays para cada clase de alimento
    const gatos = [];
    const perros = [];


    //Cargar stock de productos segun su clase

    //GATOS
    gatos.push(new Producto('Excellent-Gato', 1, 14400, 'seco', 32));
    gatos.push(new Producto('Royal Canin-Gato', 2, 15100, 'seco', 11));
    gatos.push(new Producto('Cat Chow-Gato', 3, 10500, 'seco', 18));
    gatos.push(new Producto('Proplan-Gato', 4, 3800, 'humedo', 17));
    gatos.push(new Producto('Cat Chow-Gato', 5, 2300, 'humedo', 35));
    gatos.push(new Producto('Royal Canin-Gato', 6, 4800, 'humedo', 14));

    //PERROS
    perros.push(new Producto('Excellent-Perro', 7, 8300, 'seco', 22));
    perros.push(new Producto('Eukanuba-Perro', 8, 11300, 'seco', 28));
    perros.push(new Producto('Royal Canin-Perro', 9, 13700, 'seco', 45));
    perros.push(new Producto('Proplan-Perro', 10, 4300, 'humedo', 17));
    perros.push(new Producto('Royal Canin-Perro', 11, 3000, 'humedo', 23));
    perros.push(new Producto('Optimun-Perro', 12, 2300, 'humedo', 16));

    //Recorrer los arrays para mostrarle los productos al cliente
    for (const gato of gatos) {
        alert('ID (' + gato.id + ') - ' + gato.nombre);
    }
    for (const perro of perros) {
        alert('ID (' + perro.id + ') - ' + perro.nombre);
    }

    //Funcion para calcular el precio final de la compra
    function calcularPrecio(precioAlimento, cantidadAlimento, porcentajeDescuento, costoEnvio) {
        //aplicar del descuento
        let descuento = (precioAlimento * porcentajeDescuento) / 100;
        //precio neto de descuento
        let precioConDescuento = precioAlimento - descuento;
        //retorno el precio final con descuento y costo de envio, multiplicado por la cantidad de unidades adquiridas
        return ((precioConDescuento * cantidadAlimento) * 1.21) + costoEnvio;
    }



    //Solicitar al cliente el ID del alimento y almacenar en una nueva variable con el alimento seleccionado
    let alimentoSeleccionado = parseInt(prompt('Ingrese el ID del alimento que desea comprar:'));
    const gatoBuscado = gatos.find(gato => gato.id === alimentoSeleccionado);
    const perroBuscado = perros.find(perro => perro.id === alimentoSeleccionado);

    //Solicitar al usuario la cantidad de unidades a comprar
    let cantidad = parseInt(prompt('Ingrese la cantidad de unidades que quiere comprar del alimento seleccionado:'));
    let descuento = parseInt(prompt('Ingresar % cupón de descuento:'))

    //Costo de envio 
    const envio = 350;

    //Salidas en el alert indicando el precio final de la compra segun producto elegido
    if (alimentoSeleccionado <= 0) {
        alert('Ingresa un ID valido');
    } else if (alimentoSeleccionado <= 6) {
        alert('El precio final de tu compra es: $' + calcularPrecio(gatoBuscado.precio, cantidad, descuento, envio));
        alert('¡Tu GATO está FELIZ!')
        gatoBuscado.vender(cantidad);
    } else if (alimentoSeleccionado >= 7) {
        alert('El precio final de tu compra es: $' + calcularPrecio(perroBuscado.precio, cantidad, descuento, envio));
        alert('¡Tu PERRO está FELIZ!')
        perroBuscado.vender(cantidad);
    } else {
        alert('Ingresa un ID valido');
    }






}

function Reiniciar() {
    location.reload();
}