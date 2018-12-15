
import firebase from 'firebase';

// Geral
export function inicializeFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(conexaoFirebase);
  }
}

// Autenticação
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

// Banco de dados
export function criarUsuario(nome){
  const pontuacao = 0;
  const dataUltimoJogo = getDataAtualFormatada();
  const uid = firebase.auth().currentUser.uid;
  return firebase
          .database()
          .ref()
          .child(BD)
          .child(uid)
          .set({nome, pontuacao, dataUltimoJogo});
};

export function atualizarPontuacao(pontuacao){
  const idUsuario = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref()
    .child(BD)
    .child(idUsuario)
    .on('value', function(snapshot) {
      const usuario = snapshot.val();
      usuario.pontuacao = pontuacao;
      usuario.dataUltimoJogo = getDataAtualFormatada();
      firebase
        .database()
        .ref()
        .child(BD)
        .child(idUsuario)
        .set(usuario);
    });
};

export function recuperarRanking(callBack) {
  firebase
    .database()
    .ref()
    .child(BD)
    .on('value', function(snapshot) {
      let usuarios = [];
      snapshot.forEach(childSnapshot => {
          usuarios.push(childSnapshot.val());
      });
      callBack(usuarios);
    })
}

function getDataAtualFormatada() {
  const data = new Date();
  const dia  = data.getDate().toString()
  const diaF = (dia.length == 1) ? '0' + dia : dia
  const mes  = (data.getMonth() + 1).toString()
  const mesF = (mes.length == 1) ? '0' + mes : mes
  const anoF = data.getFullYear();
  return diaF + "/" + mesF + "/" + anoF;
}

const BD = 'Ranking';

const conexaoFirebase = {
  apiKey: "AIzaSyARnIiz5wkc5YA6v8ZXgaIkE8l6cEzTfkY",
  authDomain: "quiz-react-5a7c9.firebaseapp.com",
  databaseURL: "https://quiz-react-5a7c9.firebaseio.com",
  projectId: "quiz-react-5a7c9",
  storageBucket: "quiz-react-5a7c9.appspot.com",
  messagingSenderId: "598792347889"
};