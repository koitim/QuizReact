
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

export function criarUsuario(nome){
  const pontuacao = 0;
  const dataUltimoJogo = getDataAtualFormatada();
  const uid = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref()
    .child(BD)
    .child(uid)
    .set({nome, pontuacao, dataUltimoJogo})
    
};

export function readUserData() {
  firebase.database().ref('Users/').once('value', function (snapshot) {
      console.log(snapshot.val())
  });
};

export function readUserData2() {
  firebase.database().ref('Users/').on('value', function (snapshot) {
      console.log(snapshot.val())
  });
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

export function recuperarRanking(funcaoRetorno) {
  firebase
    .database()
    .ref()
    .child(BD)
    .on('value', function(snapshot) {
      let items = [];
      snapshot.forEach(childSnapshot => {
          items.push(childSnapshot.val());
      });
      funcaoRetorno(items);
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