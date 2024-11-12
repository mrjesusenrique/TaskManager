import { updateTask } from "../api/api.js";
import getCurrentDate from "../utils/getCurrentDate.js";

document.addEventListener("DOMContentLoaded", () => {
  const task = JSON.parse(localStorage.getItem("selectedTask"));

  if (task) {
    document.querySelector("#title").value = task.titulo;
    document.querySelector("#description").value = task.descripcion;
    document.querySelector("#status").value = task.estado;
  }

  document.querySelector("#cancelar").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  document
    .querySelector("#task-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const fechaModificacion = getCurrentDate();
      const titulo = document.querySelector("#title").value;
      const descripcion = document.querySelector("#description").value;
      const estado = document.querySelector("#status").value;

      const bodyRequest = {
        fechaCreacion: fechaModificacion,
        fechaConclusion: fechaModificacion,
        titulo,
        descripcion,
        estado,
      };

      spinner.classList.remove("hidden");

      try {
        const tareaCreada = await updateTask(bodyRequest, task?.id);

        Swal.fire({
          title: "Tarea modificada",
          text: `La tarea "${tareaCreada.titulo}" se ha modificado exitosamente.`,
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {
          window.location.href = "index.html";
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al modificar la tarea. Por favor, inténtalo de nuevo.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } finally {
        spinner.classList.add("hidden");
      }
    });
});
