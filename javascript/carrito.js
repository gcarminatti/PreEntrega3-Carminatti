let productos = document.getElementById ("productos");
let vistaCarrito = document.getElementById ("vistaCarrito");



let carrito = JSON.parse(localStorage.getItem("localStorage")) || []; 


let cantidadCarrito = () => {
 let iconCarrito = document.getElementById("cantidad-carrito");
 iconCarrito.innerHTML = carrito.map((x) => x.item).reduce((x,y) => x + y, 0);
};

cantidadCarrito();

/* Generamos productos dentro del carrito,botones ,etc*/


let carritoItemsView = () => {
 if (carrito.length !== 0) {
  return (vistaCarrito.innerHTML = carrito.map ((x) =>{
   let { id, item } = x;
   let search = itemsArray.find((y) => y.id === id) || [];
   return `
    <div class="itemProductos">
    <img width="200" src=${search.img} alt="" />
    <div class="detallesProductos">
    <div class="titulo-precio-x">
        <h4 class="titulo-precio">
        <p>${search.nombre}</p>
        <p class="carrito-item-precio"> ${search.precio}</p>
        </h4>
    <span onclick="removerItemCarrito(${id})" class="material-symbols-outlined" id="crossBoton">
        close
        </span>
    </div>
    <div class="botonesCards">
        <span onclick="quitarItems(${id})" class="material-symbols-outlined" id="minusColor">remove</span>
        <div id=${id} class="cantidadItems">${item}</div>
        <span onclick="agregarItems(${id})" class="material-symbols-outlined" id="plusColor">add</span>
    </div>

    <h3>$ ${item * search.precio}</h3>
    </div>
    </div> 
    `
  }).join(""));

 } else {
  vistaCarrito.innerHTML = ``
  productos.innerHTML = `
  <h2>El carrito esta vacio</h2>
  <a href="index.html">
   <button class="botonoInicio">Al inicio</button>
  </a>
  `;
}

}; 


carritoItemsView();

let agregarItems = (id) => {
 let itemAgregado = id;
 let buscarItemenCarrito = carrito.find((x) => x.id === itemAgregado.id); //Busca si ese ID existe en el carrito o no
 
 if (buscarItemenCarrito === undefined ) {
  carrito.push({
   id: itemAgregado.id,
   item: 1,
  });
 } else {
  buscarItemenCarrito.item += 1;
 }
 
 carritoItemsView(); 
 actualizarItems(itemAgregado.id);
 localStorage.setItem("localStorage", JSON.stringify(carrito)); 
 
 };
 
let quitarItems = (id) => {
  let itemAgregado = id;
  let buscarItemenCarrito = carrito.find((x) => x.id === itemAgregado.id); //Busca si ese ID existe en el carrito o no
  
  if(buscarItemenCarrito === undefined) return;
   else if ( buscarItemenCarrito.item === 0 ) return;
   else {
   buscarItemenCarrito.item -= 1;
  }
 
 actualizarItems(itemAgregado.id);
 carrito = carrito.filter ((r) => r.item !== 0);
 carritoItemsView(); // Una vez cargado el filtro va a actulizar nuestro carrito
 localStorage.setItem("localStorage", JSON.stringify(carrito));
 };
 
 let actualizarItems = (id) => {
  let buscarItemenCarrito = carrito.find((x) => x.id ===id );
  console.log(buscarItemenCarrito.item);
  document.getElementById(id).innerHTML = buscarItemenCarrito.item;
  cantidadCarrito();
  totalCarrito();
 };


 let removerItemCarrito = (id) => {
 let productoSeleccionado = id;
 carrito = carrito.filter((x)=> x.id !== productoSeleccionado.id);
 carritoItemsView();
 totalCarrito();
 localStorage.setItem("localStorage", JSON.stringify(carrito));
 }


 let limpiarCarrito = () => {
 carrito = [];
 carritoItemsView();
 localStorage.setItem("localStorage", JSON.stringify(carrito));

 }

 let totalCarrito = () => {
 if (carrito.length !== 0) {
  let cantidad = carrito.map((x) => {
   let {item,id} = x;
   let search = itemsArray.find((y) => y.id === id) || [];
   return item * search.precio;
  }).reduce ((x,y) => x + y,0);
  productos.innerHTML = `
  <h2>Total Carrito : $ ${cantidad}</h2>
  <button class="checkout">Checkout</button>
  <button onclick="limpiarCarrito()" class="removerCarito">Clear Cart</button>
  `;
 } else return
 };

 totalCarrito();