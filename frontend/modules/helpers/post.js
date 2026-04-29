const BASE_URL = "http://localhost:3000/tasks"; // tu endpoint real

// CREATE: agregar tarea al backend
export async function createTask(task) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    });

    if (!response.ok) throw new Error("Error al crear tarea");
    return await response.json();
  } catch (error) {
    console.error("Error en createTask:", error);
    return null;
  }
}

// Capturar el formulario y enviar la tarea
export function setupForm(onTaskCreated) {
  const formTareas = document.getElementById("formTareas");
  const tareaInput = document.getElementById("tarea");
  const resultadoUsuario = document.getElementById("resultadoUsuario");

  formTareas.addEventListener("submit", async (e) => {
    e.preventDefault();
    const textoTarea = tareaInput.value.trim(); 

    if (textoTarea === "") {
      resultadoUsuario.textContent = "Por favor, ingresa una tarea válida.";
      resultadoUsuario.style.color = "red";
      return; 
    }
    const nuevaTarea = { title: tareaInput.value, completed: false };

    const result = await createTask(nuevaTarea);
    if (result) {
      resultadoUsuario.textContent = "Tarea agregada correctamente";
      tareaInput.value = "";
      onTaskCreated(); // refrescar lista
    } else {
      resultadoUsuario.textContent = "Error al agregar tarea";
    }
  });
}
