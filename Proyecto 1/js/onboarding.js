import { db, auth } from "./firebaseConfig.js";

const nameInput = document.getElementById("nameInput");
const saveBtn = document.getElementById("saveProfileBtn");

saveBtn.addEventListener("click", () => {
  const uid = auth.currentUser.uid;
  const displayName = nameInput.value.trim();

  if (!displayName) {
    alert("Escribe un nombre antes de continuar");
    return;
  }

  db.ref("users/" + uid).update({
    displayName: displayName
  }).then(() => {
    window.location.href = "index.html";
  }).catch((error) => {
    alert("Error al guardar: " + error.message);
    console.error(error);
  });
});