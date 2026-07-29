// taskUI.js
// Se encarga de la interfaz de usuario (UI) de las tareas.
// Muestra las tareas en la página y permite interactuar con ellas
// (agregar, eliminar, marcar como completadas).

const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

export function renderTasks(tasks, handlers) {
  taskList.innerHTML = "";
  emptyState.classList.toggle("hidden", tasks.length > 0);

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item" + (task.completed ? " completed" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => handlers.onToggle(task.id, task.completed));

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => handlers.onDelete(task.id));

    taskItem.append(checkbox, span, deleteBtn);
    taskList.appendChild(taskItem);
  });
}

export function getFormInput() {
  return document.getElementById("taskInput");
}