import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  inicializeFirebase,
  logout
} from '../Service/Firebase';
import BotaoCustomizado from '../componentes/BotaoCustomizado';
import LogoJogo from '../componentes/LogoJogo';



export default class Principal extends React.Component {

  async componentWillMount() {
    inicializeFirebase();
  }

  jogar = async () => {
    this.props.navigation.navigate('Jogo');
  }

  exibirRanking = () => {
    this.props.navigation.navigate('Ranking');
  }

  sair = async () => {
    this.props.navigation.navigate('Inicio');
    logout();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <LogoJogo />
        <BotaoCustomizado texto="Jogar" onPress = {this.jogar.bind(this)} />
        <BotaoCustomizado texto="Ranking" onPress = {this.exibirRanking.bind(this)} />
        <BotaoCustomizado texto="Sair" onPress = {this.sair.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 20
  }
});
