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

//Productos


//Cargando el JSON DE la BD 
//funcion que muestre los productos
const listado = document.getElementById('listado');
const listadoProductos = "json/productos.json";

fetch(listadoProductos)
    .then(respuesta => respuesta.json())
    .then(datos => {
        datos.forEach(producto => {
            const card = document.createElement("div");
            card.classList.add("col-xl-3", "col-md-3", "col-xs-9", "align-content-center");
            listado.innerHTML += `
            <div class="card">
                <div class="imgBox">
                    <img src="${producto.img}"
                    alt="${producto.nombre}" class="mouse">
            </div>
            <div class="contentBox">
                <h3>${producto.nombre}</h3>
                <h2 class="price">$${producto.precio}</h2>
                <button class="buy" id="boton-${producto.id}">Agregar Carrito</button>
            </div>
        </div>`


        })
    })
    .catch(error => console.log(error))









