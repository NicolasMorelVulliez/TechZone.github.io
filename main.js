//NAVBAR
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})
//NAVBAR

//Cargando el JSON DE la BD 
//funcion que muestre los productos
const listado = document.getElementById('listado');
const listadoProductos = "json/productos.json";

let carrito = [];
let productos = [];
let botones = [];
fetch(listadoProductos)
    .then(respuesta => respuesta.json())
    .then(datos => {
        productos=datos
        datos.forEach(producto => {
            mostrarProductos(producto)
        })
        iniciarEventListeners();
    })

    .catch(error => console.log(error))




//FUNCION MOSTRAR PRODUCTOS
function mostrarProductos(producto) {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-3", "col-xs-9", "align-content-center");
    listado.innerHTML += `
            <div class="card-producto mx-auto col-xs-9 col-sm-9 col-md-9 col-lg-5 col-xl-5">
                <div class="imgBox">
                    <img src="${producto.img}" alt="${producto.nombre}" class="mouse">
            </div>
            <div class="contentBox">
                <h3>${producto.nombre}</h3>
                <h2 class="price">$${producto.precio}</h2>
                <button class="buy" id="${producto.id}">Agregar Carrito</button>
            </div>
        </div>`
}

function iniciarEventListeners(){
    listado.addEventListener("click", event => {
        const agregarCarritoBtn = event.target.closest(".buy");
        if (agregarCarritoBtn) {
            const productId = agregarCarritoBtn.id.split("-")[0];
            agregarCarrito(Number(productId));
        }
    });
}

function agregarCarrito(id) {
    const productoExistente = carrito.find(producto => producto.id === id)
    //SI encuentra el producto va a ser TRUE y se va a ejecutar el IF en caso contrario el ELSE
    if (productoExistente) {
        productoExistente.cantidad++;
        Swal.fire(
            'Agregaste el producto al carrito',
            '',
            'success'
        )
    } else {
        const producto = productos.find(producto => producto.id === id);
        console.log(producto,productos)
    
        carrito.push({...producto,cantidad: 1});
        Swal.fire(
            'Agregaste el producto al carrito',
            '',
            'success'
        )
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
















