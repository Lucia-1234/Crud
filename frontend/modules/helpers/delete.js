const BASE_URL = "http://localhost:3000/tasks"; // tu endpoint real

// DELETE: eliminar tarea en el backend
export async function deleteTask(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error al eliminar tarea");
    return true;
  } catch (error) {
    console.error("Error en deleteTask:", error);
    return false;
  }
}

// Configurar acción de eliminación (recibe botón y callback)
export function setupDeleteButton(button, taskId, refreshCallback) {
  button.addEventListener("click", async () => {
    const confirmDelete = confirm("¿Seguro que deseas eliminar esta tarea?");
    if (confirmDelete) {
      const result = await deleteTask(taskId);
      if (result) {
        refreshCallback(); // refrescar lista si se eliminó correctamente
      }
    }
  });
}
