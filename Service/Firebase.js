
import firebase from 'firebase';

export function inicializeFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(conexaoFirebase);
  }
}

export async function getUsuarioAtual() {
  return await firebase.auth().currentUser;
}

export function logar(email, senha) {
  return firebase.auth().signInWithEmailAndPassword(email, senha);
}

export function logout() {
  return firebase.auth().signOut();
}

export function cadastrarUsuario(email, senha) {
  return firebase.auth().createUserWithEmailAndPassword(email, senha);
}

export const conexaoFirebase = {
  apiKey: "AIzaSyARnIiz5wkc5YA6v8ZXgaIkE8l6cEzTfkY",
  authDomain: "quiz-react-5a7c9.firebaseapp.com",
  databaseURL: "https://quiz-react-5a7c9.firebaseio.com",
  projectId: "quiz-react-5a7c9",
  storageBucket: "quiz-react-5a7c9.appspot.com",
  messagingSenderId: "598792347889"
};