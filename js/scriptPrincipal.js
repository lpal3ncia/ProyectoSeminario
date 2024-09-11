// Funcionalidad para abrir y cerrar submenús con la flecha
let arrow = document.querySelectorAll(".arrow");
arrow.forEach((arrowElement) => {
  arrowElement.addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement; // seleccionando el padre principal del arrow
    arrowParent.classList.toggle("showMenu");

    // Alterna la visibilidad del submenú
    const subMenu = arrowParent.querySelector(".sub-menu");
    if (subMenu) {
      subMenu.style.display = subMenu.style.display === "block" ? "none" : "block";
    }

    // Evita que el clic en la flecha cierre o abra otros menús
    e.stopPropagation();
  });
});

// Funcionalidad para abrir y cerrar la barra lateral
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

// Funcionalidad para manejar los clics en los ítems del menú
document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".sidebar .nav-links li");

  menuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      // Evita que el clic en la flecha también afecte al menú principal
      if (e.target.classList.contains("arrow")) return;

      // Alterna la visibilidad del submenú asociado al elemento clicado
      const subMenu = this.querySelector(".sub-menu");
      if (subMenu) {
        if (subMenu.style.display === "block") {
          subMenu.style.display = "none"; // Oculta el submenú si está visible
        } else {
          // Primero, oculta todos los demás submenús
          menuItems.forEach((el) => {
            const otherSubMenu = el.querySelector(".sub-menu");
            if (otherSubMenu) {
              otherSubMenu.style.display = "none"; // Oculta los demás submenús
            }
            el.classList.remove("active"); // Remueve la clase 'active' de los demás
          });
          subMenu.style.display = "block"; // Muestra el submenú del elemento clicado
        }
        // Cambia la clase 'active' del elemento clicado
        this.classList.toggle("active");
      }
    });
  });
});
