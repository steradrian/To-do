import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDnZrBqE1ysFB00CaZbYtN4yle2rHmqtN4",
  authDomain: "to-do-app-b83a8.firebaseapp.com",
  databaseURL: "https://to-do-app-b83a8.firebaseio.com",
  projectId: "to-do-app-b83a8",
  storageBucket: "to-do-app-b83a8.appspot.com",
  messagingSenderId: "377726131428",
  appId: "1:377726131428:web:46b11cf148f7db976ee0f1",
  measurementId: "G-C2TTX1GFC1"
});

const db = firebaseApp.firestore();

export default db;