import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    AsyncStorage
  } from 'react-native';
import BotaoCustomizado from '../componentes/BotaoCustomizado';
import {
  inicializeFirebase,
  getUsuarioAtual,
  atualizarPontuacao
} from '../Service/Firebase';
  

export default class Jogar extends Component {
  
    static navigationOptions = {
      title: 'Quiz',
    };

    constructor() {
        super();
        this.state = {
            indiceQuestaoAtual: 0,
            respostas:[],
            questaoAtual: listaQuestoes[0]
        }
    }

    componentWillMount() {
      inicializeFirebase();
      getUsuarioAtual();
    }

    resposta(escolha){
        const {indiceQuestaoAtual, respostas} = this.state;
        respostas[indiceQuestaoAtual] = escolha;
        if (indiceQuestaoAtual == 4) {
            let pontuacao = 0;
            for (let ind = 0; ind < respostas.length; ind++) {
                if (respostas[ind] == listaQuestoes[ind].respostaCorreta) {
                    pontuacao++;
                }
            }
            atualizarPontuacao(pontuacao);
            this.storeData = async () => {
                try {
                  await AsyncStorage.setItem('pontuação', pontuacao.toString());
                } catch (error) {
                    console.log(error)
                }
              }
            this.storeData();
            this.props.navigation.navigate('Resultado');
        } else {
            this.setState({
                respostas: respostas,
                indiceQuestaoAtual: indiceQuestaoAtual + 1,
                questaoAtual: listaQuestoes[indiceQuestaoAtual + 1]
            });
        }
    }

    opcao_0(){
        this.resposta(0);
    }

    opcao_1(){
        this.resposta(1);
    }

    opcao_2(){
        this.resposta(2);
    }

    opcao_3(){
        this.resposta(3);
    }
  
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.imagem} source={this.state.questaoAtual.imagem}/>
                <Text style={styles.textoQuestao}>{this.state.questaoAtual.questao}</Text>
                <BotaoCustomizado texto={this.state.questaoAtual.opcao[0]} onPress = {this.opcao_0.bind(this)} />
                <BotaoCustomizado texto={this.state.questaoAtual.opcao[1]} onPress = {this.opcao_1.bind(this)} />
                <BotaoCustomizado texto={this.state.questaoAtual.opcao[2]} onPress = {this.opcao_2.bind(this)} />
                <BotaoCustomizado texto={this.state.questaoAtual.opcao[3]} onPress = {this.opcao_3.bind(this)} />
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
        fontSize:30,
        color: '#FFF',
        fontWeight: 'bold'
    }
});

const listaQuestoes = [
    {
        imagem:require('../assets/chuva.jpg'),
        questao:'O que é que cai em pé e corre deitado?',
        opcao:['A chuva',
        'A nuvem',
        'O sol',
        'O vento'],
        respostaCorreta:0
    },
    {
        imagem:require('../assets/matematica.jpg'),
        questao:'Quanto é 2 + 2?',
        opcao:['-4',
        '4',
        '5',
        'Depende da grandeza'],
        respostaCorreta:1
    },
    {
        imagem:require('../assets/brasil.png'),
        questao:'Qual é a capital do Brasil?',
        opcao:['Bras cubas',
        'Beberibe',
        'Brasilia',
        'Pindamonhangaba'],
        respostaCorreta:2
    },
    {
        imagem:require('../assets/napoleao.jpeg'),
        questao:'Qual é a cor do cavalo branco de Napoleão?',
        opcao:['Azul',
        'Rosa',
        'Roxo',
        'Branco'],
        respostaCorreta:3
    },
    {
        imagem:require('../assets/odete_roitman.jpeg'),
        questao:'Quem matou Odete Roitman?',
        opcao:['Leila',
        'Os piratas',
        'Lula',
        'Nabucodonosor'],
        respostaCorreta:0
    }
]