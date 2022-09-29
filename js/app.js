//variables
//Elementos de HTML (Div) van a ser const
//Query Selector porque solo se tiene un elemento
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedor = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elmina cursos
    carrito.addEventListener('click', eliminarCurso)

    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];//resetear arreglo
        limpiarHTML();//eliminar
    })
}

// Funciones
function agregarCurso(e){
    //Se queda estático al agregar
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leeDatosCurso(cursoSeleccionado);
    }
}
//Elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        carritoHTML();
    }
}

//lee el contenido del html al dar click y extraer inf
function leeDatosCurso(curso){
    //console.log(curso);

    //crear objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //revisa si un elemento existe
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe) {
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //Retorna el  objeto actualizado
            }else{
                return curso; // Objetos no utilizados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        //elementos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


    console.log(articulosCarrito);
    carritoHTML();
}



//Muestra el carrito de compras en html
function carritoHTML() {
    //Limpiar HTML
    limpiarHTML();

    //Recorre carrito
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${curso.imagen}" width="100"></td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
            </td>
        `;

        //agrega en el HTML del carrito en el body
        contenedor.appendChild(row);
    })
}

//Elimina los cursos del tbody
function limpiarHTML(){
    //Forma  lenta
    //contenedor.innerHTML = '';

    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}