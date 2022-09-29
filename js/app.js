//variables
//Elementos de HTML (Div) van a ser const
//Query Selector porque solo se tiene un elemento
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedor = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);
}

// Funciones
function agregarCurso(e){
    //Se queda estático al agregar
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        console.log('Agregando al carrito')
    }
}
