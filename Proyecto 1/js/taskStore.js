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
}