import getCurrentDate from "../utils/getCurrentDate.js";
import { createTask } from "../api/api.js";

document.addEventListener("DOMContentLoaded", () => {
  getCurrentDate();

  const form = document.querySelector("#task-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const fechaCreacion = getCurrentDate();
    const estado = "Pendiente";

    const bodyRequest = {
      fechaCreacion: fechaCreacion,
      fechaConclusion: "",
      titulo: title,
      descripcion: description,
      estado,
    };

    spinner.classList.remove("hidden");

    try {
      const tareaCreada = await createTask(bodyRequest);

      Swal.fire({
        title: "Tarea creada",
        text: `La tarea "${tareaCreada.titulo}" se ha creado exitosamente.`,
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then(() => {
        window.location.href = "index.html";
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al crear la tarea. Por favor, inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } finally {
      spinner.classList.add("hidden");
    }

    form.reset();
  });

  document.querySelector("#cancelar").addEventListener("click", () => {
    form.reset();
    window.location.href = "index.html";
  });
});
