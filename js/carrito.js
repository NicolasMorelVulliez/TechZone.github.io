//BOTONES PARA VER CARRITO EN PANTALLA 
const contenedorCarrito = document.getElementById("contenedorCarrito");
const contenedorPrecioFinal = document.getElementById("precioTotal");

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const TotalCarrito = () => {
    return (!carrito) ? 0 : carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
}
const CantidadDeProductos = () => {
    return carrito.reduce((acc, prod) => acc + parseInt(prod.cantidad), 0);
}
//CARGAR TOTAL 
const CargarTotal = () => {
    console.log("funciona o no ?")
    contenedorPrecioFinal.innerHTML = ``;
    const total = TotalCarrito();
    const CantidadProductos = CantidadDeProductos();
    const ContenedorTable = document.createElement('table');
    ContenedorTable.innerHTML = `
        <tr>
            <td class="text-light">SubTotal</td>
            <td class="text-light">$${(total).toLocaleString('en-US')}</td>
        </tr>

        <tr>
            <td class="text-light">Total</td>
            <td class="text-light">Total de ${CantidadProductos} productos</td>
        </tr>
        <tr>
            <td><a class="btn-comprar" id="comprar-btn">Comprar</a></td>
        </tr>
    `;
    contenedorPrecioFinal.appendChild(ContenedorTable);

    //Evento: Se presiono el boton de compra
    const btnComprar = document.getElementById("comprar-btn");
    btnComprar.addEventListener('click', () => {
        Swal.fire({
            icon: 'success',
            title: 'Buena Elección!',
            text: 'Su compra a sido realizada!',
            footer: 'No se preocupe, usted no ha gastado dinero de verdad'
        });
        while (Carrito.length) Carrito.pop();
        setToDataBase('carrito', Carrito);
        CargarCarrito();
        CargarTotal();
    });
}


function CargarCarrito() {
    CargarEncabezadoTabla();
    if (carrito.length === 0) {
        CargarCarritoVacio();
    } else {
        mostrarCarrito();
    }
    CargarTotal();

}


const CargarEncabezadoTabla = () => {
    console.log("encabezado")
    contenedorCarrito.innerHTML = ``;
    const tr = document.createElement('tr');
    const th1 = document.createElement('th');
    const th2 = document.createElement('th');
    const th3 = document.createElement('th');
    th1.innerHTML = `Producto`;
    th2.innerHTML = `Cantidad`;
    th3.innerHTML = `SubTotal`;
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    contenedorCarrito.appendChild(tr);
}

const CargarCarritoVacio = () => {
    console.log("carrito vacio")
    const tr2 = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    td1.setAttribute("class", "td-empty");
    td2.setAttribute("class", "td-empty");
    td3.setAttribute("class", "td-empty");
    td1.innerHTML = `<h2 class="text-light text-center">No Hay Productos</h2>`;
    td2.innerHTML = ``;
    td3.innerHTML = ``;
    tr2.appendChild(td1);
    tr2.appendChild(td2);
    tr2.appendChild(td3);
    contenedorCarrito.appendChild(tr2);

}


const mostrarCarrito = () => {
    carrito.forEach(producto => {
        const { imagen, nombre, precio, cantidad, id } = producto;
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        tr.setAttribute("id", `producto-${producto.id}`);
        td3.setAttribute("class", "maxWitdh-200px ",);
        td1.innerHTML = `
        <div class="cart-info">
            <img class="img-fluid" src="../${producto.img}" alt="${producto.nombre}">
            <div>
                <p class="text-light">${producto.nombre}</p>
                <small class="text-light">Precio: $${precio.toLocaleString('en-US')} 1/ud.</small>
                <br>
                <a class="cursor-pointer" id="eliminar-${producto.id}">Eliminar</a>
            </div>
        </div>
    `;
        td2.innerHTML = `<input  type="number" value="${producto.cantidad}">`;
        td3.innerHTML = `<p class="text-light">$${(precio * cantidad).toLocaleString('en-US')}</p>`;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        contenedorCarrito.appendChild(tr);

        const botonEliminar = document.getElementById(`eliminar-${producto.id}`);
        botonEliminar.addEventListener("click", () => {
            eliminarProducto(id);

        })
        const quantityInput = document.querySelector(`#producto-${id} td input`);
        quantityInput.addEventListener('change', () => {
            if (quantityInput.value < 0) {
                quantityInput.value = 0;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Cantidad Invalida',
                    footer: '<a href="">Why do I have this issue?</a>'
                });
            }
            if (quantityInput.value > 999) {
                quantityInput.value = 999;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Cantidad Invalida',
                    footer: '<a href="">Why do I have this issue?</a>'
                });
            }
            const precioTotalDelProducto = document.querySelector(`#producto-${id}`).lastElementChild;
            const nuevoPrecio = precio * quantityInput.value;
            precioTotalDelProducto.innerHTML = `<p class="text-light">$${(nuevoPrecio).toLocaleString('en-US')}</p>`;
            carrito[producto.id].cantidad = quantityInput.value;
            setToDataBase('carrito', carrito);
            CargarTotal();
        })



    })
}



//VACIO EL CARRITO
const vaciarCarrito = document.getElementById("vaciar-carrito");
vaciarCarrito.addEventListener("click", deseaEliminarCarrito);

function deseaEliminarCarrito() {
    Swal.fire({
        title: 'Estas seguro que desea vaciar su carrito?',
        text: "Estos cambios no se podran revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, vacialo!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Vaciado!',
                'Tu carrito se a vaciado.',
                'success'
            )
            eliminarCarrito()
            eliminarCarrito
        }
    })
}

function eliminarCarrito() {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    CargarCarrito();
}

//ELIMAR PRODCUTO DEL CARRITO
function eliminarProducto(id) {
    console.log(id)
    const index = carrito.findIndex(producto => producto.id === id);
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    CargarCarrito();
}

CargarCarrito()








