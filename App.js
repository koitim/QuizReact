import React from 'react';
import {
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import Login from './Login/Login';
import Cadastro from './Login/Cadastro';
import Principal from './Quiz/Principal';
import Jogar from './Quiz/Jogar';

export default class App extends React.Component {

  render() {
    return (
      <AppContainer/>
    );
  }
}

const AppNavigator = createStackNavigator({
  Inicio: Login,
  Cadastro: Cadastro,
  Quiz: Principal,
  Jogo: Jogar
}, {
  initialRouteName: "Inicio"
});

const AppContainer = createAppContainer(AppNavigator);
