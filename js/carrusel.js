const modalImagen = document.getElementById('modalImagen');
const imagenAmpliada = document.getElementById('imagenAmpliada');
const cerrarModalImagen = document.getElementById('cerrarModalImagen');
const imagenPrincipal = document.getElementById('imagenPrincipal');
const miniaturas = document.querySelectorAll('.miniatura');
const carouselIndicators = document.getElementById('carousel-indicators');
let currentIndex = 0; // Índice actual de la imagen principal
let isPanning = false; // Variable para controlar el pan (desplazamiento)
let startX = 0, startY = 0; // Variables de posición inicial
let translateX = 0, translateY = 0; // Valores de desplazamiento actuales
let isSwiping = false; // Variable para evitar interferencias entre swipe y pan/zoom

// Función para abrir el modal con la imagen principal actual
function abrirModal() {
    modalImagen.classList.add('active');
    imagenAmpliada.src = imagenPrincipal.src; // Mostrar la imagen principal en el modal
    imagenAmpliada.classList.remove('zoom-out');
    imagenAmpliada.classList.add('zoom');

    // Resetear posición de la imagen
    resetTransform(); // Llamamos a la función que resetea la transformación
}

// Abrir el modal al hacer clic en la imagen principal
imagenPrincipal.addEventListener('click', abrirModal);

// Cerrar el modal
cerrarModalImagen.addEventListener('click', function() {
    imagenAmpliada.classList.remove('zoom');
    imagenAmpliada.classList.add('zoom-out');
    setTimeout(function() {
        modalImagen.classList.remove('active');
        resetTransform(); // Resetea el pan cuando se cierra el modal
    }, 300); // Duración de la animación
});

// Función para cambiar la imagen principal por la miniatura seleccionada
function cambiarImagen(miniatura, index) {
    const tempSrc = imagenPrincipal.src;
    imagenPrincipal.src = miniatura.src;
    miniatura.src = tempSrc;
    currentIndex = index;

    resetTransform(); // Resetea el pan al cambiar de imagen
    actualizarPuntitos(currentIndex); // Actualizar el puntito activo
}

// Función para cambiar a la siguiente imagen
function cambiarImagenSiguiente() {
    currentIndex = (currentIndex + 1) % miniaturas.length;
    intercambiarConMiniatura(currentIndex);
}


// Función para cambiar a la imagen anterior
function cambiarImagenAnterior() {
    currentIndex = (currentIndex - 1 + miniaturas.length) % miniaturas.length;
    intercambiarConMiniatura(currentIndex);
}

// Intercambiar la imagen principal con la miniatura seleccionada en el índice
function intercambiarConMiniatura(index) {
    const miniaturaActual = miniaturas[index];
    const tempSrc = imagenPrincipal.src;
    imagenPrincipal.src = miniaturaActual.src;
    miniaturaActual.src = tempSrc;

    imagenAmpliada.src = imagenPrincipal.src; // Actualizar la imagen en el modal
    currentIndex = index;

    actualizarPuntitos(currentIndex); // Actualizar el puntito activo
    resetTransform(); // Resetea el pan al intercambiar imágenes
}

// Manejar el deslizamiento (swipe)
function addSwipeListeners() {
    let swipeStartX;

    modalImagen.addEventListener('mousedown', startSwipe);
    modalImagen.addEventListener('touchstart', startSwipe);

    function startSwipe(event) {
        swipeStartX = event.touches ? event.touches[0].clientX : event.clientX;
        isSwiping = true; // Indicador de que estamos haciendo swipe
        modalImagen.addEventListener('mousemove', moveSwipe);
        modalImagen.addEventListener('touchmove', moveSwipe);
        modalImagen.addEventListener('mouseup', endSwipe);
        modalImagen.addEventListener('touchend', endSwipe);
    }

    function moveSwipe(event) {
        if (!isSwiping) return;
        const currentX = event.touches ? event.touches[0].clientX : event.clientX;
        if (swipeStartX - currentX > 50) {
            cambiarImagenSiguiente();
            resetSwipe();
        } else if (currentX - swipeStartX > 50) {
            cambiarImagenAnterior();
            resetSwipe();
        }
    }

    function endSwipe() {
        resetSwipe();
    }

    function resetSwipe() {
        isSwiping = false;
        modalImagen.removeEventListener('mousemove', moveSwipe);
        modalImagen.removeEventListener('touchmove', moveSwipe);
    }
}

// Habilitar el deslizamiento cuando se abre el modal
imagenPrincipal.addEventListener('click', addSwipeListeners);

// Agregar eventos a las miniaturas para intercambiar imágenes
miniaturas.forEach((miniatura, index) => {
    miniatura.addEventListener('click', function() {
        cambiarImagen(miniatura, index);
    });
});



// Función para actualizar las transformaciones (solo pan)
function actualizarTransformacion() {
    imagenAmpliada.style.transform = `translate(${translateX}px, ${translateY}px)`; // Sin zoom
}

// Función para resetear la posición al valor original
function resetTransform() {
    translateX = 0;
    translateY = 0;
    actualizarTransformacion(); // Aplicar los valores originales
}

// Manejar el deslizamiento (swipe) en la vista del carrusel
function addSwipeListenersCarrusel() {
    let swipeStartX;

    imagenPrincipal.addEventListener('mousedown', startSwipeCarrusel);
    imagenPrincipal.addEventListener('touchstart', startSwipeCarrusel);

    function startSwipeCarrusel(event) {
        swipeStartX = event.touches ? event.touches[0].clientX : event.clientX;
        isSwiping = true; // Indicador de que estamos haciendo swipe
        imagenPrincipal.addEventListener('mousemove', moveSwipeCarrusel);
        imagenPrincipal.addEventListener('touchmove', moveSwipeCarrusel);
        imagenPrincipal.addEventListener('mouseup', endSwipeCarrusel);
        imagenPrincipal.addEventListener('touchend', endSwipeCarrusel);
    }

    function moveSwipeCarrusel(event) {
        if (!isSwiping) return;
        const currentX = event.touches ? event.touches[0].clientX : event.clientX;
        if (swipeStartX - currentX > 50) {
            cambiarImagenSiguiente(); // Deslizar a la siguiente imagen
            resetSwipeCarrusel();
        } else if (currentX - swipeStartX > 50) {
            cambiarImagenAnterior(); // Deslizar a la imagen anterior
            resetSwipeCarrusel();
        }
    }

    function endSwipeCarrusel() {
        resetSwipeCarrusel();
    }

    function resetSwipeCarrusel() {
        isSwiping = false;
        imagenPrincipal.removeEventListener('mousemove', moveSwipeCarrusel);
        imagenPrincipal.removeEventListener('touchmove', moveSwipeCarrusel);
    }
}

// Habilitar el deslizamiento (swipe) en la vista normal del carrusel
addSwipeListenersCarrusel();

// Crear los puntitos de navegación
function generarPuntosCarrusel() {
    miniaturas.forEach((miniatura, index) => {
        const punto = document.createElement('span');
        punto.classList.add('punto');
        punto.addEventListener('click', function() {
            intercambiarConMiniatura(index);
            actualizarPuntitos(index); // Actualizar los puntitos cuando se hace clic
        });
        carouselIndicators.appendChild(punto);
    });
    actualizarPuntitos(currentIndex); // Marcar el primer puntito como activo
}

// Actualizar la clase del puntito activo
function actualizarPuntitos(index) {
    const puntos = document.querySelectorAll('.punto');
    puntos.forEach((punto, i) => {
        if (i === index) {
            punto.classList.add('activo');
        } else {
            punto.classList.remove('activo');
        }
    });
}

// Inicializar la generación de puntitos
generarPuntosCarrusel();


// Modificar la función intercambiarConMiniatura para actualizar los puntitos
function intercambiarConMiniatura(index) {
    const miniaturaActual = miniaturas[index];
    const tempSrc = imagenPrincipal.src;
    imagenPrincipal.src = miniaturaActual.src;
    miniaturaActual.src = tempSrc;
    imagenAmpliada.src = imagenPrincipal.src; // Actualizar la imagen en el modal
    currentIndex = index;

    actualizarPuntitos(currentIndex); // Actualizar el puntito activo
    resetTransform(); // Resetea el zoom y pan al intercambiar imágenes
}

    
    
