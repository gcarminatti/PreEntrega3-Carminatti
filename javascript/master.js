/* Generamos los items a comprar */

let itemsCards = document.getElementById("itemsCards");

let carrito = JSON.parse(localStorage.getItem("localStorage")) || []; // Variable guardar en el carrito


let cardsCompras = () => {
  return (itemsCards.innerHTML = itemsArray.map((x)=>{
    let { id,nombre,categoria,precio,img } = x;
    let buscarItemenCarrito = carrito.find((x) => x.id === id) || [];
    return `
    <div id=item-id-${id} class="col-sm-6 col-md-12 col-lg-4 mb-4 mb-lg-0 ">
     <div class="card mb-1 ">
      <img src="${img}"
       class="card-img-top" alt="Laptop HP - Oficina" />
      <div class="card-body">
       <div class="d-flex justify-content-between">
        <p class="small"><a href="#!" class="text-muted">${categoria}</a></p>
        <div class="botonesCards">
          <span onclick="quitarItems(${id})" class="material-symbols-outlined" id="minusColor">remove</span>
          <div id=${id} class="cantidadItems">
          ${buscarItemenCarrito.item === undefined ? 0 : buscarItemenCarrito.item}
          </div>
          <span onclick="agregarItems(${id})" class="material-symbols-outlined" id="plusColor">add</span>
        </div>
       </div>
       <div class="d-flex justify-content-between mb-3">
        <h5 class="mb-0">${nombre}</h5> 
        <h5 class="text-dark mb-0">${precio}</h5>
       </div>
      </div>
     </div>
    </div>
    `
  }).join("")
  );
}


cardsCompras();

/*Funciones para agregar y quitar items */

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

 
 localStorage.setItem("localStorage", JSON.stringify(carrito));
};

let actualizarItems = (id) => {
  let buscarItemenCarrito = carrito.find((x) => x.id ===id );
  console.log(buscarItemenCarrito.item);
  document.getElementById(id).innerHTML = buscarItemenCarrito.item;
  cantidadCarrito();
};

//Funcion para Agregar la cantidad al carrito

let cantidadCarrito =()=>{
  let iconCarrito = document.getElementById("cantidad-carrito");
  iconCarrito.innerHTML = carrito.map((x) => x.item).reduce((x,y) => x + y, 0);
};

cantidadCarrito();