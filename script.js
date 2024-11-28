
// Función Menú
function menu(estado = 0) {
    let mensajeMenu = "Ingrese el número de la opción deseada:"
    if (estado === 5) {
        mensajeMenu = "Ingrese una opción válida para continuar:"
    }
    let opcion = Number(prompt("Hola Profesor/Tutor esta es mi segunda preentrega.\n\n" + mensajeMenu + "\n\n[1] - Alta de Producto 👍\n[2] - Baja de Producto 👎\n[3] - Agregar productos al carrito 🛒\n[4] - Filtrar productos por categoría 🛒\n[5] - Confirmar compra 👍\n[6] - Salir 🚶"))
    if (opcion === 1) {
        acciones(opcion)
    } else if (opcion === 2) {
        acciones(opcion)
    } else if (opcion === 3) {
        acciones(opcion)
    } else if (opcion === 4) {
        acciones(opcion)
    } else if (opcion === 5) {
        acciones(opcion)
    } else if (opcion === 6) {
        acciones(opcion)
    } else {
        menu(5)
    }
}

// Función con acciones del menú
function acciones(opcion) {
    if (opcion === 1) { // Alta
        let id = obtenerSiguienteId(arrayProductos)
        let nombre = prompt("Ingrese Descripción")
        let precio = prompt("Ingrese Precio de Costo")
        let stock = prompt("Ingrese Stock")
        let categoria = prompt("Ingrese Categoria")
        let margen = prompt("Ingrese Margen de Ganancia")
        alert(altaProducto(id, nombre, precio, stock, categoria, margen))
        console.log(arrayProductos)
        menu(0)
    } else if (opcion === 2) { // Baja
        alert(bajaProducto(Number(prompt("Ingrese el ID del producto a eliminar:"))))
        console.log(arrayProductos)
        menu(0)
    } else if (opcion === 3) { // Lista productos y agrega al carrito
        let idProducto = pedirNumero("Seleccione un producto por ID:\n" + listarProductos(arrayProductos))
        carrito = actualizarCarrito(carrito, arrayProductos, idProducto)
        menu(0)
    } else if (opcion === 4) {
        let categorias = obtenerCategorias(arrayProductos).join("\n")
        let categoria = prompt("Ingrese la categoría por la que desea filtrar productos:\n" + categorias).toLocaleLowerCase()
        let productosFiltrados = filtrarProductos(arrayProductos, "categoria", categoria)
        let idProducto = pedirNumero("Seleccione un producto por ID:\n" + listarProductos(productosFiltrados))
        carrito = actualizarCarrito(carrito, arrayProductos, idProducto)
        menu(0)
    } else if (opcion === 5) {
        if (carrito.length === 0) {
            alert("Debe agregar productos al carrito para poder confirmar la compra.")
        } else {
            // let total = 0
            // carrito.forEach(producto => {
            //     total = total + producto.subtotal
            // })
            let total = carrito.reduce((acumulador, producto) => acumulador + producto.subtotal, 0)
            alert("Total de su compra $ " + total + " - Gracias por elegirnos.")
            carrito = []
        }
        menu(0)
    } else { // Salir
        alert("Hasta la próxima 👋")
    }
}


// Función para obtener el ID más alto
function obtenerSiguienteId(arrayProductos) {
    if (arrayProductos.length === 0) {
        return 1; // Si el array está vacío le asigno 1 al primer ID
    }
    // Busco el ID más alto en el array
    const maxId = Math.max(...arrayProductos.map(producto => producto.id))
    // Retorna el siguiente ID más alto
    return maxId + 1
}

// Función que realiza el alta de un producto
function altaProducto(id, nombre, precio, stock, categoria, margen) {
    arrayProductos.push({ id: id, nombre: nombre, precio: precio, stock: stock, categoria: categoria, margen_ganancia: margen })
    return ("Alta Satisfactoria")
}

// Función que realiza la eliminación de un producto
function bajaProducto(id) {
    const prodBuscado = arrayProductos.findIndex(producto => producto.id === id)
    console.log(prodBuscado)
    if (prodBuscado !== -1) {
        arrayProductos.splice(prodBuscado, 1)// Elimino el producto del array
        return 'Producto eliminado correctamente.'
    } else {
        return 'El ID del producto ingresado no existe.'
    }
}

// Función para mostrar todos los elementos del array
function mostrarCadaElemento(array, fn) {
    for (const elemento of array) {
        elemento[id] = new Producto(elemento.id, elemento.nombre, elemento.precioCosto, elemento.stock, elemento.categoria, elemento.margen)
        fn(Producto.descripcion)
    }
}

// Función para listar y mostrar del array solo lo que necesito
function listarProductos(lista) {
    return lista.map(elemento => "ID: " + elemento.id + " - " + elemento.nombre.toUpperCase() + " - $ " + elemento.precio).join("\n")
}

function pedirNumero(mensaje) {
    return Number(prompt(mensaje))
}

// Función para actualizar los productos en el carrito
function actualizarCarrito(carrito, arrayProductos, idProducto) {
    let productoBuscado = arrayProductos.find(producto => producto.id === idProducto)
    let indiceProductoBuscado = carrito.findIndex(producto => producto.id === idProducto)
    if (indiceProductoBuscado !== -1) {
        carrito[indiceProductoBuscado].unidades++
        carrito[indiceProductoBuscado].subtotal = carrito[indiceProductoBuscado].precio * carrito[indiceProductoBuscado].unidades
    } else (
        carrito.push({
            id: productoBuscado.id,
            nombre: productoBuscado.nombre,
            precio: productoBuscado.precio,
            unidades: 1,
            subtotal: productoBuscado.precio
        })
    )
    console.log(carrito)
    return carrito
}

// Función para obtener las categorías
function obtenerCategorias(arrayProductos) {
    let diferentesCategorias = []
    arrayProductos.forEach(producto => {
        if (!diferentesCategorias.includes(producto.categoria)) {
            diferentesCategorias.push(producto.categoria)
        }
    })
    return diferentesCategorias
}

// Función para filtrar productos
function filtrarProductos(arrayProductos, nombrePropiedad, valorPropiedad) {
    return arrayProductos.filter(producto => producto[nombrePropiedad] === valorPropiedad)
}

// Array de productos con productos precargados
let arrayProductos = [
    { id: 1, nombre: "pelota", precio: 5000, stock: 3, categoria: "deportes", margen_ganancia: 70 },
    { id: 3, nombre: "arco", precio: 18000, stock: 2, categoria: "deportes", margen_ganancia: 70 },
    { id: 6, nombre: "remera mangas cortas", precio: 35000, stock: 10, categoria: "indumentaria", margen_ganancia: 40 },
    { id: 9, nombre: "short", precio: 40300, stock: 5, categoria: "indumentaria", margen_ganancia: 40 },
    { id: 11, nombre: "zapatillas", precio: 98000, stock: 15, categoria: "deportes", margen_ganancia: 70 },
    { id: 14, nombre: "guantes de atajar", precio: 23500, stock: 8, categoria: "indumentaria", margen_ganancia: 40 },
    { id: 18, nombre: "buzo", precio: 53500, stock: 0, categoria: "deportes", margen_ganancia: 80 },
    { id: 23, nombre: "campera", precio: 78900, stock: 11, categoria: "deportes", margen_ganancia: 90 },
    { id: 34, nombre: "monitor", precio: 450000, stock: 19, categoria: "tecnología", margen_ganancia: 35 },
]

let carrito = []
// llamo al menú
menu(0)