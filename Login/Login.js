import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {validaEmail, validaSenha} from './LoginPresenter'
import {
  inicializeFirebase,
  logar
} from '../Service/Firebase';
import InputCustomizado from '../componentes/InputCustomizado';
import BotaoCustomizado from '../componentes/BotaoCustomizado';
import LogoJogo from '../componentes/LogoJogo';

export default class Login extends React.Component {
  
  static navigationOptions = {
    title: 'Login Quiz',
  };

  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      estiloInputEmail: styles.input,
      estiloInputSenha: styles.input,
      msgErroEmail: '',
      msgErroSenha: ''
    };
  }

  componentWillMount() {
    inicializeFirebase();
  }

  login() {
    const {email, senha} = this.state;
    let contemErros = false;
    if (validaEmail(email)) {
      this.emailOK();
    }
    else {
      this.trataErroEmail();
      contemErros = true;
    }
    if (validaSenha(senha)) {
      this.senhaOK();
    }
    else {
      this.trataErroSenha();
      contemErros = true;
    }
    if (!contemErros) {
      const promisse = logar(email, senha);
      promisse
        .then(() => {
          this.setState({
            email: '',
            senha: ''
          });
          this.props.navigation.navigate('Quiz');
        })
        .catch((erro) => {alert(erro)});
    }
  }

  cadastrar() {
    this.props.navigation.navigate('Cadastro');
  }

  emailOK = () => {
    this.setState({
      estiloInputEmail: styles.input,
      msgErroEmail: ''
    });
  }

  trataErroEmail = () => {
    this.setState({
      estiloInputEmail: styles.inputError,
      msgErroEmail: 'Email inválido.'
    });
  }

  senhaOK = () => {
    this.setState({
      estiloInputSenha: styles.input,
      msgErroSenha: ''
    });
  }

  trataErroSenha = () => {
    this.setState({
      estiloInputSenha: styles.inputError,
      msgErroSenha: 'Senha é obrigatória.'
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <LogoJogo />
        <InputCustomizado
          msgErro={this.state.msgErroEmail}
          style={this.state.estiloInputEmail}
          label="Digite seu e-mail"
          value={this.state.email}
          onChange={email => this.setState({email})}
        />
        <InputCustomizado
          msgErro={this.state.msgErroSenha}
          style={this.state.estiloInputSenha}
          label="Digite sua senha"
          value={this.state.senha}
          onChange={senha => this.setState({senha})}
        />
        <BotaoCustomizado texto="Logar" onPress = {this.login.bind(this)} />
        <BotaoCustomizado texto="Cadastrar" onPress = {this.cadastrar.bind(this)} />
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
  input: {
    height: 45,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    borderColor: '#EEE',
    borderWidth: 1,
    marginBottom: 10
  },
  inputError: {
    height: 45,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    borderColor: '#F00',
    borderWidth: 2,
    paddingHorizontal: 20,
    marginBottom: 10
  }
});
