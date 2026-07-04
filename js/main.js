//creo las variables y busco la etiqueta en el html
const slideCategoria = document.querySelector('.slide-categoria');

//pregunto si esa variable existe en el documento
if (slideCategoria) {
    //creo las variables que solo se buscan dentro de slideCategoria
    const contCategoria = document.querySelector('.cont-categoria');
    const botonPrev = document.querySelector('.cat-btn-prev');
    const botonNext = document.querySelector('.cat-btn-next');
    //eventlistener espera un evento, en este caso un click, y despues ejecuta
    botonNext.addEventListener('click', () => {
        //cuando recibe el click uso scrollby, que desplaza el elemento hacia algun lado
        // en este caso el elemento es card-categoria y lo desplaza hacia la izquierda
        //usando offsetwidth puedo calcular el tamaño del elemento en el momento del click
        // behavior smooth es una animacion
        contCategoria.scrollBy({ left: contCategoria.querySelector('.card-categoria').offsetWidth, behavior: 'smooth' });
    });
    botonPrev.addEventListener('click', () => {
        //lo mismo pero a la derecha (uso el -)
        contCategoria.scrollBy({ left: -(contCategoria.querySelector('.card-categoria').offsetWidth), behavior: 'smooth' });
    });
}

const carouselProductos = document.querySelector("#carousel-productos");

if (carouselProductos) {
    const contProductos = carouselProductos.querySelector(".carousel-inner");
    const botonPrev = carouselProductos.querySelector(".carousel-control-prev");
    const botonNext = carouselProductos.querySelector(".carousel-control-next");

    botonNext.addEventListener("click", () => {
        //aca evaluo cuanto puedo desplazarme a la derecha, clientwidth es el ancho que se ve en la pantalla
        const desplazamientoMax = contProductos.scrollWidth - contProductos.clientWidth;
        //pregunto si ya llegue al final de "la pantalla", le resto 5 pixeles para tener margen
        if (contProductos.scrollLeft >= desplazamientoMax - 5) {
            contProductos.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            contProductos.scrollBy({ left: contProductos.querySelector(".carousel-item").offsetWidth, behavior: 'smooth' });
        }

    });

    botonPrev.addEventListener("click", () => {
        const desplazamientoMax = contProductos.scrollWidth - contProductos.clientWidth;
        //pregunto si estoy al inicio de la pantalla, doy un margen de 5 por si no estoy justo en 0
        if (contProductos.scrollLeft <= 5) {
            contProductos.scrollTo({ left: desplazamientoMax, behavior: "smooth" });
        } else {
            contProductos.scrollBy({ left: -(contProductos.querySelector(".carousel-item").offsetWidth), behavior: 'smooth' });
        }
    });
}


//igual a los codigos anteriores
const modalProducto = document.getElementById('modalProducto');

if (modalProducto) {
    //esto es un evento de bootstrap para mostrar el modal
    modalProducto.addEventListener('show.bs.modal', function (evento) {
        // relatedTarget se refiere al "objeto" que disparo el evento
        const boton = evento.relatedTarget;
        //aca uso todos los data que defini para cargar los datos en el modal
        document.getElementById('tituloModal').textContent = boton.dataset.nombre;
        document.getElementById('infoModal').textContent = boton.dataset.info;
        document.getElementById('precioModal').textContent = boton.dataset.precio;
        //lo mismo pero para la imagen, como necesito cargar 2 cosas lo traigo en una variable
        const img = document.getElementById('imagenModal');
        img.src = boton.dataset.img;
        img.alt = boton.dataset.alt;
    });
}

//con esto capturo el envio del formulario
const formRegistro = document.querySelector("#formRegistro");

if (formRegistro) {
    // evento que responde cuando hay un boton tipo submit
  formRegistro.addEventListener("submit", (event) => {
    // con esto evito que el form se cierre 
    event.preventDefault();

    alert("Registro exitoso");
    formRegistro.reset();
  });
}

//-----Catalogo---

//creo una variable que busca los y guarda todos los dropdown en los controles
const dCatalogo = document.querySelectorAll(".controles-catalogo .dropdown");

//recorro cada dropdown
dCatalogo.forEach((drop) => {
    //busco y guardo el boton de cada dropdonw
    const boton = drop.querySelector(".dropdown-toggle");
    //guardo todas las opciones del dropdown
    const opciones = drop.querySelectorAll(".dropdown-item");
    //recorro cada opcion
    opciones.forEach((opcion) => {
        //capturo el click y guardo la opcion que selecciono
        opcion.addEventListener("click", () => {
            const textoSelec = opcion.textContent;
            //cambio el texto del boton por el que seleccione
            boton.textContent = textoSelec;
            //pregunto si es el de categoria, para guardarlo en el breadcrum
            if (drop.dataset.filtro === "categoria") {
                const breadCategoria = document.querySelector(".breadcrumb-categoria");
                //lo cambio en el breadcrum que tiene esa clase
                if (breadCategoria) {
                    if (textoSelec === "Todas") {
                        breadCategoria.textContent = "";
                    } else {
                        breadCategoria.textContent = textoSelec;
                    }
                }
            }
        });
    });
});


const paginacion = document.querySelector('.paginacion-catalogo');

if (paginacion) {
  paginacion.querySelectorAll('.page-item:not(.primero):not(.ultimo)').forEach(item => {
    item.addEventListener('click', function(evento) {
      evento.preventDefault();

      // saco .active del que lo tenía
      paginacion.querySelector('.page-item.active').classList.remove('active');

      // se lo pongo al clickeado
      this.classList.add('active');
    });
  });
}