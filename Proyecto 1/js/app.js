import { auth, db } from "./firebaseConfig.js";
import { addTask, listenToTasks, toggleTask, deleteTask } from "./taskStore.js";
import { renderTasks, getFormInput } from "./taskUI.js";

const form = document.getElementById("taskForm");
let currentTasks = [];

function refresh(tasks) {
  currentTasks = tasks;
  renderTasks(tasks, {
    onToggle: (id) => {
      const task = currentTasks.find(t => t.id === id);
      toggleTask(id, task.completed);
    },
    onDelete: (id) => deleteTask(id)
  });
}

// Protege esta página, si no hay sesión activa regresa al login.
// listenToTasks se llama aquí adentro, no afuera, porque necesita
// esperar a que Firebase confirme quién es el usuario antes de
// poder armar la ruta tasks/UID.
auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  db.ref("users/" + user.uid).on("value", (snapshot) => {
    const profile = snapshot.val();
    document.getElementById("userName").textContent = profile ? profile.displayName : user.email;
  });

  listenToTasks(refresh);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = getFormInput();
  const text = input.value.trim();
  if (!text) return;

  addTask(text);
  input.value = "";
  input.focus();
});

document.getElementById("logOutBtn").addEventListener("click", () => {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}