//1. Declaraciones de las constantes
const cards             =document.getElementById('cards')
const items             =document.getElementById('items')
const fragmento         =document.createDocumentFragment('footer')
const templateCard      =document.getElementById('template-card').content
const templateFooter    =document.getElementById('template-footer').content
const templateCarrito   =document.getElementById('template-carrito').content


//2. Se crea el objeto carrito vacio
let carrito = {}


document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})

//3. Evento on click
cards.addEventListener('click', e => {
    addCarrito(e)
})

//4. Consumo de una API REST JSON
const fetchData = async () =>{
    try{
        const  res  = await fetch('api.json')
        const  data = await res.json()

        mostrarProductos(data)
    }catch (error) {
        console.log(error)
    }
}
//5. Metodo Mostrar Productos
    const mostrarProductos = data => {
        //console.log(data)
         data.forEach(producto => {
            templateCard.querySelector('h5').textContent = producto.title
            templateCard.querySelector('p').textContent = producto.precio
            templateCard.querySelector('img').setAttribute("src", producto.thumbnailURL)
            templateCard.querySelector('.btn-dark').dataset.id = producto.id
            const clone = templateCard.cloneNode(true)
            fragmento.appendChild(clone)
         });
        cards.appendChild(fragmento)
}

//6. Metodo Add Carrito (Agrega productos al carrito)
const addCarrito = e => {

    if (e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

//7. Metodo Inicializar el Carrito
const setCarrito = objeto => {
    //console.log(objeto)
    const producto ={
        id: objeto.querySelector('.btn-dark').dataset.id,
        //para acceder a cada uno de los atributos de la tarjeta
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent, //probar-ver detalles
        cantidad: 1
    }
    // si existe el registro con el id
    if(carrito.hasOwnProperty(producto.id)){ //entonces
        producto.cantidad = carrito[producto.id].cantidad + 1
    }   
    // agregamos producto al carrito ... spread operator
    carrito[producto.id] = {...producto}
    mostrarCarrito()         
}
//8. Metodo Mostrar Carrito
const mostrarCarrito = () =>{
    items.innerHTML=''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

        const cloneProducto = templateCarrito.cloneNode(true) 
        fragmento.appendChild(cloneProducto)
    })
    items.appendChild(fragmento)

    mostrarFooter()

}

//9. Metodo Mostrar Footer (Aqui estan los consumos)
const mostrarFooter = () => {
    footer.innerHTML = ''
    if(Object.keys(carrito).length === 0){
        footer.innerHTML = `
        <th scope ="row" colspan="5"> Carrito vacio - comience a comprar!!</th>
        `
    }
}