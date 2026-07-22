// app.js — ENTRY POINT
// Connects the data layer (taskStore.js) with the presentation layer (taskUI.js).
 
import { getTasks, addTask, toggleTask, deleteTask } from "./taskStore.js";
import { renderTasks, getFormInput } from "./taskUI.js";
 
const form = document.getElementById("taskForm");
 
// Re-renders the whole list every time something changes
function refresh(tasks) {
  renderTasks(tasks, {
    onToggle: (id) => refresh(toggleTask(id)),
    onDelete: (id) => refresh(deleteTask(id))
  });
}
 
form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading on submit
 
  const input = getFormInput();
  const text = input.value.trim();
  if (!text) return; // ignore empty submissions
 
  refresh(addTask(text));
  input.value = "";
  input.focus();
});
 
// Draw whatever was already saved when the page first loads
refresh(getTasks());