import { getTasks } from "../api/api.js";

const cardContainer = document.querySelector("#task-container");

const cardTask = (task) => {
  const { titulo, fechaCreacion } = task;

  const card = document.createElement("article");
  card.className =
    "flex items-center justify-between p-4 mb-4 bg-white shadow-md rounded-lg border border-gray-200";

  const infoContainer = document.createElement("div");
  infoContainer.className = "flex flex-col";

  const taskTitle = document.createElement("h2");
  taskTitle.className = "text-lg font-semibold text-gray-800";
  taskTitle.textContent = titulo;

  const taskDate = document.createElement("p");
  taskDate.className = "text-sm text-gray-500";
  taskDate.textContent = fechaCreacion;

  infoContainer.appendChild(taskTitle);
  infoContainer.appendChild(taskDate);

  const playButton = document.createElement("button");
  playButton.className =
    "bg-blue-500 text-white p-2 rounded-full focus:outline-none hover:bg-blue-600 transition";
  playButton.innerHTML = "▶";

  card.appendChild(infoContainer);
  card.appendChild(playButton);

  return card;
};

export const createCardTasks = () => {
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  getTasks()
    .then((tasks) => {
      spinner.style.display = "none";
      tasks.forEach((task) => {
        const cardElement = cardTask(task);
        cardContainer.appendChild(cardElement);
      });
    })
    .catch((error) => {
      spinner.style.display = "none";
      console.warn(`Error al obtener las tasks ${error}`);
    });
};
