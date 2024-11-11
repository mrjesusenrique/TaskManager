export function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
}

export function initializeMenu() {
  const menuButton = document.getElementById("menu-btn");
  menuButton.addEventListener("click", toggleMenu);
}
