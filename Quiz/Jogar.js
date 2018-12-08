import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput
  } from 'react-native';
import BotaoCustomizado from '../componentes/BotaoCustomizado';
  

export default class Jogar extends Component {
  
    static navigationOptions = {
      title: 'Quiz',
    };

    constructor() {
        super();
        this.state = {
            indiceQuestaoAtual: 0,
            listaQuestoes:[
                {
                    imagem:'endereço da imagem',
                    questao:'O que é que cai em pé e corre deitado?',
                    opcao:['A chuva',
                    'A nuvem',
                    'O sol',
                    'O vento'],
                    resposta:1
                },
                {
                    imagem:'endereço da imagem',
                    questao:'O que é que tem 4 pernas de dia e 6 a noite?',
                    opcao:['A casa',
                    'A cama',
                    'A muleta',
                    'A calça'],
                    resposta:2
                },
                {
                    imagem:'endereço da imagem',
                    questao:'O que é que tem?',
                    opcao:['Tem pedra no sapato tem',
                    'tem calo no pé tem',
                    'tem pelo no subaco tem',
                    'e fede como ninguém'],
                    resposta:3
                },
                {
                    imagem:'endereço da imagem',
                    questao:'porque?',
                    opcao:['porque sim',
                    'porque não',
                    'porque talvez',
                    'porque estou pensando'],
                    resposta:4
                },
                {
                    imagem:'endereço da imagem',
                    questao:'E ai?',
                    opcao:['Tranquilo',
                    'De boa',
                    'É niuma',
                    'Sei lá'],
                    resposta:1
                }
            ],
            questaoAtual: {
                imagem:'endereço da imagem',
                questao:'O que é que cai em pé e corre deitado?',
                opcao:['A chuva',
                'A nuvem',
                'O sol',
                'O vento'],
                resposta:1
            }
        }
    }

    resposta(escolha){
        console.log('escolhi este: ' + escolha.value);
    }
  
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textoQuestao}>{this.state.questaoAtual.questao}</Text>
                <BotaoCustomizado texto={this.state.questaoAtual.opcao[0]} onPress = {this.resposta.bind(this)} />
                <BotaoCustomizado texto={this.state.questaoAtual.opcao[1]} onPress = {this.resposta.bind(this)} />
                <BotaoCustomizado texto={this.state.questaoAtual.opcao[2]} onPress = {this.resposta.bind(this)} />
                <BotaoCustomizado texto={this.state.questaoAtual.opcao[3]} onPress = {this.resposta.bind(this)} />
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
    imagem: {
    flex:1,
    resizeMode:'contain',
    marginBottom: 10
    },
    textoQuestao: {
      color: '#FFF',
      fontWeight: 'bold'
    }
});
    