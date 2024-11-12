import { initializeMenu } from "./menu/menu.js";
import { createCardTasks } from "./card/card.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeMenu();
  createCardTasks();
});
