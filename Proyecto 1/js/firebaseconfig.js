const firebaseConfig = {
  //Usar propio config
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
export const auth = firebase.auth();