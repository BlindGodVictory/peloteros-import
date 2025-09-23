// Script para el menú hamburguesa
const hamburguesa = document.getElementById('hamburguesa');
const menu = document.getElementById('menu');

hamburguesa.addEventListener('click', () => {
    menu.classList.toggle('active');
    hamburguesa.classList.toggle('active');
});

// Abrir modal al hacer clic en el botón de búsqueda
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const closeModal = document.getElementById('closeModal');

    searchBtn.addEventListener('click', () => {
        searchModal.classList.add('active');
    });

    closeModal.addEventListener('click', () => {
        searchModal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.remove('active');
        }
    });
});


