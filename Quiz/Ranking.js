import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import ItemRanking from '../componentes/ItemRanking';
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
      recuperarRanking(this.ordenarResultado);
    }

    ordenarResultado = (resultado) => {
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
                    renderItem={({item}) => <ItemRanking usuario={item} />}>
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
    }
});