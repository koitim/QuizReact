import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    AsyncStorage
  } from 'react-native';
import BotaoCustomizado from '../componentes/BotaoCustomizado';
  

export default class Resultado extends Component {
  
    static navigationOptions = {
      title: 'Resultado',
    };

    constructor(props) {
        super(props);
        this.state = {
            pontuacao:0
        }
    }

    async componentWillMount() {
      this.recuperaPontuacao = async () => {
          try {
            const value = await AsyncStorage.getItem('pontuação');
            if (value !== null) {
              this.setState({
                  pontuacao: value
              })
            }
           } catch (error) {
              alert(error)
           }
        }
      this.recuperaPontuacao();
    }

    voltar(){
        this.props.navigation.navigate('Quiz');
    }

    ranking(){
        this.props.navigation.navigate('Ranking');
    }
  
    render() {
        return (
            <View style={styles.container}>
                <View style={{alignItems:'center'}}>
                    <Text style={styles.textoTitulo}>Pontuação:</Text>
                    <Text style={styles.textoPontuacao}>{this.state.pontuacao}/5</Text>
                </View>
                <BotaoCustomizado texto='Ranking' onPress = {this.ranking.bind(this)} />
                <BotaoCustomizado texto='Voltar' onPress = {this.voltar.bind(this)} />
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
    },
    textoTitulo: {
        fontSize:40,
        color: '#FFF',
        fontWeight: 'bold'
    },
    textoPontuacao: {
        fontSize:30,
        color: '#FFF',
        marginBottom:30
    }
});