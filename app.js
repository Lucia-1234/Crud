import { getTasks, renderTasks } from "./frontend/modules/helpers/get.js";
import { setupForm } from "./frontend/modules/helpers/post.js";
import { setupUpdateButton } from "./frontend/modules/helpers/update.js";
import { setupDeleteButton } from "./frontend/modules/helpers/delete.js";

async function refreshTasks() {
  // Leer tareas desde el backend
  const tasks = await getTasks();

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

    // Botón editar
    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar";
    setupUpdateButton(editBtn, task.id, refreshTasks);

    // Botón eliminar
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    setupDeleteButton(deleteBtn, task.id, refreshTasks);

    taskDiv.appendChild(editBtn);
    taskDiv.appendChild(deleteBtn);
    messagesContainer.appendChild(taskDiv);
  });
}

// Inicializar aplicación
setupForm(refreshTasks); // conecta el formulario con POST
refreshTasks();          // carga las tareas al inicio
