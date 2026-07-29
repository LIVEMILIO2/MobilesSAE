// taskStore.js
// Capa de datos. Antes usaba localStorage; ahora las tareas viven en Firestore,
// dentro de la subcolección users/{uid}/tasks, así cada usuario solo ve las suyas
// y puede acceder a ellas desde cualquier dispositivo.

import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

function tasksRef(uid) {
  return collection(db, "users", uid, "tasks");
}

export async function getTasks(uid) {
  const q = query(tasksRef(uid), orderBy("createdAt", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}

export async function addTask(uid, text) {
  await addDoc(tasksRef(uid), {
    text,
    completed: false,
    createdAt: Date.now()
  });
  return getTasks(uid);
}

export async function toggleTask(uid, id, currentValue) {
  const taskDoc = doc(db, "users", uid, "tasks", id);
  await updateDoc(taskDoc, { completed: !currentValue });
  return getTasks(uid);
}

export async function deleteTask(uid, id) {
  const taskDoc = doc(db, "users", uid, "tasks", id);
  await deleteDoc(taskDoc);
  return getTasks(uid);
}