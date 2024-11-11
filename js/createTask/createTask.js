import getCurrentDate from "../utils/getCurrentDate.js";

document.addEventListener("DOMContentLoaded", () => {
  getCurrentDate();

  const form = document.getElementById("task-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const fechaCreacion = obtenerFechaActual();
    const estado = "Pendiente";

    const nuevaTarea = {
      title,
      description,
      fechaCreacion,
      estado,
    };

    console.log("Nueva tarea creada:", nuevaTarea);

    form.reset();
  });

  document.querySelector("#cancelar").addEventListener("click", () => {
    form.reset();
    window.location.href = 'index.html';
  });
});
