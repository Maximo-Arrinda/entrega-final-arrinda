let productosCarrito =localStorage.getItem("productos-del-carrito");
productosCarrito =JSON.parse(productosCarrito);


const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProducto= document.querySelector("#carritoProductos");
const accionesCarrito= document.querySelector("#accionesCarrito");
const Comprado= document.querySelector("#Comprado");
const botonVaciar = document.querySelector(".carrito-accion-vaciar")
const total = document.querySelector("#Total");
const botonComprar=document.querySelector(".carrito-acciones-comprar")
let BtnEliminar = document.querySelectorAll(".carrito-producto-eliminar");

 function CargarproductosCarrito(){
   
    if (productosCarrito && productosCarrito.length > 0) {
    
    carritoVacio.classList.add("disabled");
    carritoProducto.classList.remove("disabled");
    accionesCarrito.classList.remove("disabled");
    Comprado.classList.add("disabled");

    carritoProducto.innerHTML = "" ;


    productosCarrito.forEach(producto => {
        const div = document.createElement ("div");
    div.classList.add("producto-carrito")

    div.innerHTML =  ` 
        <img class="imagen-carrito" src="${producto.imagen}" alt= "${producto.titulo}">
        <div class="carrito-producto-titulo">
            <small>Titulo</small>
            <h3>${producto.titulo}</h3>
        </div>
        <div class="carrito-producto-cantidad">
            <small>cantidad</small>
            <p>${producto.cantidad}</p>
        </div>
        <div class="carrito-producto-precio">
            <small>precio</small>
            <p>$${producto.precio}</p>
        </div>
        <div class="carrito-producto-subtotal">
            <small>Subtotal</small>
            <p>${producto.precio * producto.cantidad}</p>
        </div>
        <button class="carrito-producto-eliminar" id="${producto.id}"> <i class="bi bi-trash"></i></button>
    `;
            
    carritoProducto.append(div);

    })
    

} else {
    
    carritoVacio.classList.remove("disabled");
    carritoProducto.classList.add("disabled");
    accionesCarrito.classList.add("disabled");
    Comprado.classList.add("disabled");
}

         ActualizarEliminar();
         ToT();
 }

  CargarproductosCarrito();





//Boton Eliminar 


function ActualizarEliminar(){
     BtnEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    BtnEliminar.forEach(boton=>{
         boton.addEventListener("click", eliminarDecarrito);
     });
};


    function eliminarDecarrito(e) {

        Toastify({
            text: "Eliminaste tu producto",
            style: {
                background: "linear-gradient(to right, #E6B17E, #a84726)",
              },
            offset: {
              x: 50, 
              y: 10 
            },
          }).showToast();

    const idBoton = e.currentTarget.id;
    const index =productosCarrito.findIndex(producto => producto.id === idBoton);
    
    productosCarrito.splice(index, 1);
    CargarproductosCarrito();
    
    localStorage.setItem("productos-del-carrito",JSON.stringify(productosCarrito));
    };

    botonVaciar.addEventListener("click", Btnvaciar);
    function Btnvaciar() { 

        Swal.fire({
            title: '¿Estas seguro?',
            text: "se borraran todos tus productos!",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.isConfirmed) {
                productosCarrito.length = 0
                localStorage.setItem("productos-del-carrito",JSON.stringify(productosCarrito));
                CargarproductosCarrito();
            } 
          })

        
 
    };


    function ToT() {
        const Totalsumado=  productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
        total.innerText = ` $ ${Totalsumado}`;
    }


    //boton comprar 
 
    botonComprar.addEventListener("click", comprarCarrito);
    function comprarCarrito() { 

        productosCarrito.length = 0
        localStorage.setItem("productos-del-carrito",JSON.stringify(productosCarrito));

        carritoVacio.classList.add("disabled");
        carritoProducto.classList.add("disabled");
        accionesCarrito.classList.add("disabled");
        Comprado.classList.remove("disabled");
 
    };

