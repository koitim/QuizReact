import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {validaEmail, validaSenha, validaConfirmacaoSenha} from './LoginPresenter'
import {
  inicializeFirebase,
  cadastrarUsuario
} from '../Service/Firebase';
import InputCustomizado from '../componentes/InputCustomizado';
import BotaoCustomizado from '../componentes/BotaoCustomizado';
import LogoJogo from '../componentes/LogoJogo';


export default class Cadastro extends React.Component {
  
  static navigationOptions = {
    title: 'Cadastro de usuário',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      confirmaSenha: '',
      estiloInputEmail: styles.input,
      estiloInputSenha: styles.input,
      estiloInputConfirmaSenha: styles.input,
      msgErroEmail: '',
      msgErroSenha: '',
      msgErroConfirmaSenha: ''
    };
  }

  componentWillMount() {
    inicializeFirebase();
  }

  cadastrar = async () => {
    const {email, senha, confirmaSenha} = this.state;
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
    if (validaConfirmacaoSenha(senha, confirmaSenha)) {
      this.confirmaSenhaOK();
    }
    else {
      this.trataErroConfirmaSenha();
      contemErros = true;
    }
    if (confirmaSenha !== senha) {
      console.log("Deve ser igual a senha");
      return;
    }
    if (!contemErros) {
      const promisse = cadastrarUsuario(email, senha);
      promisse
        .then(() => {
          this.setState({
            email: '',
            senha: '',
            confirmaSenha: ''
          });
          alert("Usuário cadastrado com sucesso.");
          this.voltar();
        })
        .catch((erro) => {alert(erro)});
    }
  }

  voltar = () => {
    this.props.navigation.goBack();
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
      msgErroSenha: 'Senha é obrigatório.'
    });
  }

  confirmaSenhaOK = () => {
    this.setState({
      estiloInputConfirmaSenha: styles.input,
      msgErroConfirmaSenha: ''
    });
  }

  trataErroConfirmaSenha = () => {
    this.setState({
      estiloInputConfirmaSenha: styles.inputError,
      msgErroConfirmaSenha: 'Confirmação deve ser igual a senha.'
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
        <InputCustomizado
          msgErro={this.state.msgErroConfirmaSenha}
          style={this.state.estiloInputConfirmaSenha}
          label="Confirme sua senha"
          value={this.state.confirmaSenha}
          onChange={confirmaSenha => this.setState({confirmaSenha})}
        />
        <BotaoCustomizado texto="Cadastrar" onPress = {this.cadastrar} />
        <BotaoCustomizado texto="Voltar" onPress = {this.voltar} />
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
