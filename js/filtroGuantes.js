document.addEventListener("DOMContentLoaded", function () {
    const filtros = document.querySelectorAll(".filtro");
    const productos = document.querySelectorAll(".producto");

    filtros.forEach(filtro => {
        filtro.addEventListener("click", function () {
            const categoriaSeleccionada = this.dataset.categoria;

            // Cambiar el estado de los botones
            filtros.forEach(btn => btn.setAttribute("aria-pressed", "false"));
            this.setAttribute("aria-pressed", "true");

            // Mostrar u ocultar productos según la categoría
            productos.forEach(producto => {
                if (categoriaSeleccionada === "todo") {
                    producto.style.display = "flex";
                } else {
                    if (producto.classList.contains(`categoria-${categoriaSeleccionada}`)) {
                        producto.style.display = "flex";
                    } else {
                        producto.style.display = "none";
                    }
                }
            });
        });
    });
});
