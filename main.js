// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqcQakRvi8TWsrAFqgWWX3EIRa6gILdN8",
  authDomain: "tineda-arrinda.firebaseapp.com",
  projectId: "tineda-arrinda",
  storageBucket: "tineda-arrinda.appspot.com",
  messagingSenderId: "878378487953",
  appId: "1:878378487953:web:e64eda22a98e7c3e5faf30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let  Productos =[];

fetch ("./contenido.json")
    .then(response=>response.json())
    .then(data=> {
        Productos = data;
        CargarProductos(Productos);
    })

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonCategoria = document.querySelectorAll(".Categoria");
const TituloP = document.querySelector("#TituloPrincipal");
let btnAgregar = document.querySelectorAll(".agregar-carrito");
const NumeroCarrito = document.querySelector("#numero-carrito");



function CargarProductos (elegirProductos) { 
    ContenedorProductos.innerHTML = "";

    elegirProductos.forEach(producto => {

        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = ` 
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="detalles">
           <h3 class="producto-titulo">${producto.titulo}</h3>
           <p class="precio">$${producto.precio}</p>
           <button class="agregar-carrito" id = "${producto.id}">Agregar</button>
        </div> `;

        ContenedorProductos.append(div);


    })
    ActualizarAgregar();
}

CargarProductos(Productos);


botonCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonCategoria.forEach(boton =>boton.classList.remove("active"));

        e.target.classList.add("active");

        if (e.currentTarget.id != "todos"){
          
            const tituloCategoria = Productos.find(producto=>producto.categoria.id === e.currentTarget.id);
            TituloP.innerText = tituloCategoria.categoria.nombre;

            
        const prodBoton = Productos.filter(producto => producto.categoria.id === e.currentTarget.id);
        CargarProductos(prodBoton)
        } else {
            TituloP.innerText = "Todos los productos";
            CargarProductos(Productos);
         }
    })
});



function ActualizarAgregar(){
    btnAgregar = document.querySelectorAll(".agregar-carrito");
    btnAgregar.forEach(boton=>{
        boton.addEventListener("click", agregarCarrito);
    })
};



let prodDecarrito;

let productosCarritoLS = localStorage.getItem("productos-del-carrito");

    if(productosCarritoLS){
        prodDecarrito = JSON.parse(productosCarritoLS);
        ActNumero();
    } else {
        prodDecarrito = [];

    };

 

function agregarCarrito(e) {

    Toastify({
        text: "Producto en carrito",
        style: {
            background: "linear-gradient(to right, #E6B17E, #a84726)",
          },
        offset: {
          x: 50, 
          y: 10 
        },
      }).showToast();

    const idBoton = e.currentTarget.id;
    const ProAgregado = Productos.find(producto => producto.id === idBoton);

    if(prodDecarrito.some(producto => producto.id === idBoton)){
       const indeX= prodDecarrito.findIndex(producto => producto.id === idBoton);
        prodDecarrito [indeX].cantidad++;
     } else {
        ProAgregado.cantidad = 1;
            prodDecarrito.push(ProAgregado);
        }
        ActNumero();
       
        localStorage.setItem("productos-del-carrito", JSON.stringify(prodDecarrito));
    }






    function ActNumero(){
        let Newnumero =prodDecarrito.reduce((acc, producto) =>acc + producto.cantidad, 0);
        NumeroCarrito.innerText = Newnumero;
    };
