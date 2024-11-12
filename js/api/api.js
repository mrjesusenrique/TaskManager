const URL = "https://6707d80a8e86a8d9e42d284d.mockapi.io/istea/api/v1/tasks";

export const getTasks = async () => {
  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`Hubo un problema con la solicitud Fetch: ${error}`);
  }
};

export const createTask = async (newTask) => {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`Hubo un problema con la solicitud Fetch: ${error}`);
  }
};

export const updateTask = async (updatedTask, taskId) => {
  try {
    const response = await fetch(`${URL}/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`Hubo un problema con la solicitud Fetch: ${error}`);
  }
};
