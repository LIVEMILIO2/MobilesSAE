<<<<<<< HEAD
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
=======
import { db, auth } from "./firebaseConfig.js";

function getUserTasksRef() {
  const uid = auth.currentUser.uid;
  return db.ref("tasks/" + uid);
}

export function addTask(text) {
  const newTaskRef = getUserTasksRef().push();
  newTaskRef.set({
    text: text,
    completed: false
  });
}

export function listenToTasks(callback) {
  getUserTasksRef().on("value", (snapshot) => {
    const data = snapshot.val();
    const tasks = data
      ? Object.entries(data).map(([id, task]) => ({ id, ...task }))
      : [];
    callback(tasks);
  });
}

export function toggleTask(id, currentState) {
  getUserTasksRef().child(id).update({ completed: !currentState });
}

export function deleteTask(id) {
  getUserTasksRef().child(id).remove();
>>>>>>> Buena
}