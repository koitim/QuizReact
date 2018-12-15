import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    FlatList
  } from 'react-native';
import BotaoCustomizado from '../componentes/BotaoCustomizado';
import {
  inicializeFirebase,
  recuperarRanking
} from '../Service/Firebase';
  

export default class Ranking extends Component {
  
    static navigationOptions = {
      title: 'Ranking',
    };

    constructor() {
        super();
        this.state = {
            ranking:[]
        }
    }

    async componentWillMount() {
      inicializeFirebase();
      recuperarRanking(this.funcaoRetorno);
    }

    funcaoRetorno = (resultado) => {
        const resultadoOrdenado = resultado.sort((a, b) => {
            if (a.pontuacao > b.pontuacao) {
              return -1;
            }
            if (a.pontuacao < b.pontuacao) {
              return 1;
            }
            return 0;
          });
        this.setState({ranking: resultadoOrdenado});
    }

    voltar(){
        this.props.navigation.navigate('Quiz');
    }
  
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.ranking}
                    renderItem={({item}) => 
                        <TouchableHighlight style={styles.lista}>
                            <View style={styles.item}>
                                <Text style={styles.texto}>{item.nome}</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={styles.texto}>Pontos: {item.pontuacao}</Text>
                                    <Text style={styles.texto}>{item.dataUltimoJogo}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>}>
                </FlatList>
                <BotaoCustomizado texto='Voltar' onPress = {this.voltar.bind(this)} />
            </View>
        );
    }
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        padding: 10
    },
    lista: {
        alignSelf: 'stretch',
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: '#AAA',
    },
    item: {
        backgroundColor: '#FFF',
        alignSelf: 'stretch',
        flex:1,
        marginBottom: 2
    },
    texto: {
        fontSize:20
    }
});