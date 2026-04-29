const BASE_URL = "http://localhost:3000/tasks"; // tu endpoint real

// UPDATE: actualizar tarea en el backend
export async function updateTask(id, newTitle) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH", // también puedes usar PUT si tu backend lo requiere
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle })
    });

    if (!response.ok) throw new Error("Error al actualizar tarea");
    return await response.json();
  } catch (error) {
    console.error("Error en updateTask:", error);
    return null;
  }
}

// Configurar acción de actualización (ejemplo con prompt)
export function setupUpdateButton(button, taskId, refreshCallback) {
  button.addEventListener("click", async () => {
    const nuevoTitulo = prompt("Ingrese el nuevo nombre de la tarea:");
    if (nuevoTitulo) {
      const result = await updateTask(taskId, nuevoTitulo);
      if (result) {
        refreshCallback(); // refrescar lista si se actualizó correctamente
      }
    }
  });
}
