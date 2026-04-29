const BASE_URL = "http://localhost:3000/"; // tu endpoint real

// READ: obtener tareas desde el backend
export async function getTasks(limit = 5) {
  try {
    const response = await fetch(`${BASE_URL}?_limit=${limit}`);
    if (!response.ok) throw new Error("Error al obtener tareas");
    return await response.json();
  } catch (error) {
    console.error("Error en getTasks:", error);
    return [];
  }
}

// Mostrar tareas en el DOM
export function renderTasks(tasks) {
  const messagesContainer = document.getElementById("messagesContainer");
  const emptyState = document.getElementById("emptyState");

  messagesContainer.innerHTML = "";
  if (tasks.length === 0) {
    messagesContainer.appendChild(emptyState);
    return;
  }

  tasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-item");
    taskDiv.textContent = task.title;

    messagesContainer.appendChild(taskDiv);
  });
}
