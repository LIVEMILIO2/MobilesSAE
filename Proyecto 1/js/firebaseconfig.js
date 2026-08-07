const firebaseConfig = {
  apiKey: "AIzaSyAG7qXZMxlPY-zPrfiinQYNJq3_TWIfRWg",
  authDomain: "initialtestproject-2f3b4.firebaseapp.com",
  databaseURL: "https://initialtestproject-2f3b4-default-rtdb.firebaseio.com",
  projectId: "initialtestproject-2f3b4",
  storageBucket: "initialtestproject-2f3b4.firebasestorage.app",
  messagingSenderId: "717731776435",
  appId: "1:717731776435:web:8a673cbc6454c0d7392dc6"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export const auth = firebase.auth();