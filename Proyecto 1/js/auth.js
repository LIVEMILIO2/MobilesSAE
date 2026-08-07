// auth.js
// Encapsula todas las llamadas a Firebase Authentication.

import { auth } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Crea una cuenta nueva con correo y contraseña
export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Inicia sesión con una cuenta existente
export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Cierra la sesión actual
export function logoutUser() {
  return signOut(auth);
}

// Ejecuta `callback(user)` cada vez que cambia el estado de sesión
// (user === null si no hay nadie logueado)
export function watchAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}