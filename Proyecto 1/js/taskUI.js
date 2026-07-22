// Este módulo se encarga de la interfaz de usuario (UI) de las tareas.
// Su función principal es mostrar las tareas en la página web y permitir al usuario interactuar con ellas (agregar, eliminar, marcar como completadas, etc.).

const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');

export function renderTasks(tasks) {
    taskList.innerHTML = '';
    emptyState.style.classList.toggle('hidden', tasks.length > 0);

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        checkbox.addEventListener('change', () => handlers.onTggle(task.id));

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => handlers.onDelete(task.id));

        li.append(checkbox, span, deleteBtn);
        taskList.appendChild(li);
    });
}

export function getFormInput() {
  return document.getElementById("taskInput");
}
