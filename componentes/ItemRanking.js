import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight
  } from 'react-native';
  

export default class ItemRanking extends Component {
  
    render() {
        const usuario = this.props.usuario;
        return (
            <TouchableHighlight style={styles.lista}>
                <View style={styles.item}>
                    <Text style={styles.texto}>{usuario.nome}</Text>
                    <View style={styles.item2}>
                        <Text style={styles.texto}>{usuario.dataUltimoJogo}</Text>
                        <Text style={styles.texto}>Pontos: {usuario.pontuacao}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}
    
const styles = StyleSheet.create({
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
    item2: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'space-between',
    },
    texto: {
        fontSize:20
    }
});