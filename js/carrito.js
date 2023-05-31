//BOTONES PARA VER CARRITO EN PANTALLA 
const botonCarrito = document.getElementById("boton-carrito");
const contenedorCarrito = document.getElementById("contenedorCarrito");

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

console.log(carrito)

botonCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => {
        console.log(producto)
        const card = document.createElement("div");
        card.classList.add("col-xl-6", "col-md-6", "col-xs-12");
        card.innerHTML = `<img src="${producto.img}" alt="${producto.nombre}" class="mouse">
        `
        console.log(producto)
        
    })
}
