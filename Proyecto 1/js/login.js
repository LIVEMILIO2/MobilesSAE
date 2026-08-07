import { auth } from "./firebaseConfig.js";

const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const statusMsg = document.getElementById("statusMsg");

document.getElementById("signUpBtn").addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "onboarding.html";
    })
    .catch((error) => {
      statusMsg.textContent = error.message;
    });
});

document.getElementById("logInBtn").addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      statusMsg.textContent = error.message;
    });
});