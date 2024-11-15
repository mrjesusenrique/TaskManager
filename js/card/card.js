import { getTasks } from "../api/api.js";
import states from "../utils/states.js";

const cardContainer = document.querySelector("#task-container");

const speakText = (text, button) => {
  if (!window.speechSynthesis) {
    console.warn(
      "La API SpeechSynthesis no está disponible en este navegador."
    );
    return;
  }

  const configuracionAudio = JSON.parse(
    localStorage.getItem("configuracionAudio")
  );
  const language = configuracionAudio?.idioma || "es-AR";
  const speed = configuracionAudio?.velocidad || 0;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;

  let voices = speechSynthesis.getVoices();

  if (voices.length === 0) {
    speechSynthesis.onvoiceschanged = () => {
      voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        utterance.voice = voices.find((voice) => voice.lang === language);
        utterance.rate = speed;
        speechSynthesis.speak(utterance);
      }
    };
  } else {
    utterance.voice = voices.find((voice) => voice.lang === language);
    utterance.rate = speed;
    speechSynthesis.speak(utterance);
  }

  utterance.onstart = () => {
    console.log("Reproduciendo texto...");
    button.classList.add("bg-green-500");
    button.classList.remove("bg-blue-500");
  };

  utterance.onend = () => {
    console.log("Reproducción finalizada.");
    button.classList.remove("bg-green-500");
    button.classList.add("bg-blue-500");
  };

  utterance.onerror = (event) => {
    console.error("Error al intentar reproducir el texto:", event.error);
  };
};

const cardTask = (task) => {
  const { titulo, fechaCreacion, estado, fechaConclusion, descripcion } = task;

  const card = document.createElement("article");
  card.className =
    "flex items-center justify-between p-4 mb-4 bg-white shadow-md rounded-lg border border-gray-200";

  if (estado === states.finalizado) {
    card.classList.add("opacity-50", "pointer-events-none");
  }

  const infoContainer = document.createElement("div");
  infoContainer.className = "flex flex-col";

  const taskTitle = document.createElement("h2");
  taskTitle.className = "text-lg font-semibold text-gray-800";
  taskTitle.textContent = titulo;

  const taskDate = document.createElement("p");
  taskDate.className = "text-sm text-gray-500";

  if (estado === states.finalizado) {
    taskDate.textContent = fechaConclusion;
  } else {
    taskDate.textContent = fechaCreacion;
  }

  const taskStatus = document.createElement("p");
  taskStatus.className = "text-sm font-semibold";
  taskStatus.textContent = `Estado: ${estado}`;

  if (estado === states.pendiente) {
    taskStatus.classList.add("text-green-600");
  } else if (estado === states.enCurso) {
    taskStatus.classList.add("text-yellow-600");
  } else if (estado === states.finalizado) {
    taskStatus.classList.add("text-gray-600");
  }

  infoContainer.appendChild(taskTitle);
  infoContainer.appendChild(taskDate);
  infoContainer.appendChild(taskStatus);

  const playButton = document.createElement("button");
  playButton.className =
    "bg-blue-500 text-white p-2 rounded-full focus:outline-none hover:bg-blue-600 transition";
  playButton.innerHTML = "▶";

  playButton.addEventListener("click", (event) => {
    event.stopPropagation();

    const taskText = `Título: ${titulo}. Descripcion: ${descripcion}. Creada en: ${fechaCreacion}. Estado: ${estado}.`;
    speakText(taskText, playButton);
  });

  card.appendChild(infoContainer);
  card.appendChild(playButton);

  if (estado === states.pendiente || estado === states.enCurso) {
    card.addEventListener("click", () => {
      localStorage.setItem("selectedTask", JSON.stringify(task));
      window.location.href = "edit.html";
    });
  }

  return card;
};

export const createCardTasks = () => {
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";
  cardContainer.innerHTML = "";

  getTasks()
    .then((tasks) => {
      spinner.style.display = "none";

      tasks.sort((a, b) => {
        const statusOrder = { Pendiente: 1, "En curso": 1, Finalizado: 2 };
        const statusComparison = statusOrder[a.estado] - statusOrder[b.estado];

        if (statusComparison !== 0) {
          return statusComparison;
        }

        const dateA = new Date(a.fechaCreacion);
        const dateB = new Date(b.fechaCreacion);

        return dateB - dateA;
      });

      if (tasks.length === 0) {
        const noTasksMessage = document.createElement("p");
        noTasksMessage.className =
          "text-center text-gray-700 font-semibold mt-4";
        noTasksMessage.textContent = "No hay tareas para mostrar";
        cardContainer.appendChild(noTasksMessage);
      } else {
        tasks.forEach((task) => {
          const cardElement = cardTask(task);
          cardContainer.appendChild(cardElement);
        });
      }
    })
    .catch((error) => {
      spinner.style.display = "none";
      console.warn(`Error al obtener las tareas: ${error}`);
    });
};
