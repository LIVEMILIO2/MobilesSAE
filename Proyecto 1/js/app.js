<<<<<<< HEAD
// app.js — ENTRY POINT
// Conecta la capa de autenticación (auth.js), la capa de datos (taskStore.js)
// y la capa de presentación (taskUI.js).

import { getTasks, addTask, toggleTask, deleteTask } from "./taskStore.js";
import { renderTasks, getFormInput } from "./taskUI.js";
import { registerUser, loginUser, logoutUser, watchAuthState } from "./auth.js";

// ----- Elementos del DOM -----
const taskForm = document.getElementById("taskForm");

const authSection = document.getElementById("authSection");
const appSection = document.getElementById("appSection");
const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const authError = document.getElementById("authError");
const userEmailLabel = document.getElementById("userEmailLabel");

let currentUser = null;

// Vuelve a pedir las tareas del usuario actual y las pinta
async function loadAndRender() {
  const tasks = await getTasks(currentUser.uid);
  renderTasks(tasks, {
    onToggle: async (id, completed) => {
      await toggleTask(currentUser.uid, id, completed);
      loadAndRender();
    },
    onDelete: async (id) => {
      await deleteTask(currentUser.uid, id);
      loadAndRender();
    }
  });
}

// ----- Formulario de tareas -----
taskForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // evita que la página recargue al enviar

  const input = getFormInput();
  const text = input.value.trim();
  if (!text) return; // ignora envíos vacíos

  await addTask(currentUser.uid, text);
=======
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
>>>>>>> Buena
  input.value = "";
  input.focus();
  loadAndRender();
});

<<<<<<< HEAD
// ----- Registro / login / logout -----
registerBtn.addEventListener("click", async () => {
  authError.textContent = "";
  try {
    await registerUser(authEmail.value.trim(), authPassword.value);
  } catch (err) {
    authError.textContent = traducirError(err.code);
  }
});

loginBtn.addEventListener("click", async () => {
  authError.textContent = "";
  try {
    await loginUser(authEmail.value.trim(), authPassword.value);
  } catch (err) {
    authError.textContent = traducirError(err.code);
  }
});

logoutBtn.addEventListener("click", async () => {
  await logoutUser();
});

// ----- Estado de sesión -----
// Se ejecuta al cargar la página y cada vez que el usuario inicia/cierra sesión.
watchAuthState((user) => {
  currentUser = user;

  if (user) {
    authSection.classList.add("hidden");
    appSection.classList.remove("hidden");
    userEmailLabel.textContent = user.email;
    authEmail.value = "";
    authPassword.value = "";
    loadAndRender();
  } else {
    authSection.classList.remove("hidden");
    appSection.classList.add("hidden");
  }
});

function traducirError(code) {
  const mensajes = {
    "auth/email-already-in-use": "Ese correo ya está registrado.",
    "auth/invalid-email": "El correo no es válido.",
    "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
    "auth/user-not-found": "No existe una cuenta con ese correo.",
    "auth/wrong-password": "Contraseña incorrecta.",
    "auth/invalid-credential": "Correo o contraseña incorrectos.",
    "auth/missing-password": "Escribe una contraseña."
  };
  return mensajes[code] || "Ocurrió un error, intenta de nuevo.";
=======
document.getElementById("logOutBtn").addEventListener("click", () => {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
>>>>>>> Buena
}