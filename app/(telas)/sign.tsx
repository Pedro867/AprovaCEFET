import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Alert,
  Image,
} from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons'; 
import { validaCadastro } from '../api/conexaoFetch';

export default function SignScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState(''); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const navigation = useNavigation();

  const handleRegister = async () => { //funcao assincrona, chamada quando o botao registrar é pressionado
    //valida os campos
    if (!nome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    // chama a API de cadastro 
    //comentado para testes com bd desligado
    //const sucesso = await validaCadastro(nome, email, senha);
    //if (sucesso) {
      navigation.navigate('registerDate');
    //} else {
    //}
  };

  return (
    <LinearGradient
      colors={['rgba(137, 161, 212, 0.8)', 'rgba(248, 248, 248, 0.8)']}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Image
          source={require('@/assets/images/logoAprovaCefet.png')} 
          style={styles.logo}
        />
        <Text style={styles.title}>BEM VINDO!</Text>
        <Text style={styles.subtitle}>Preencha seus dados para continuar</Text>
      </View>

      <View style={styles.formContainer}>
        {/* Input de Nome */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNome}
            value={nome}
            placeholder="Digite seu nome completo"
            placeholderTextColor="#888"
            autoCapitalize="words"
          />
        </View>

        {/* Input de Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Endereço de email</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Digite seu email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Input de Senha */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              onChangeText={setSenha}
              value={senha}
              placeholder="Crie uma senha"
              placeholderTextColor="#888"
              autoCapitalize="none"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Feather name={showPassword ? 'eye-off' : 'eye'} size={24} color="#003869" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Input de Confirmar Senha */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirmar Senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              onChangeText={setConfirmarSenha}
              value={confirmarSenha}
              placeholder="Repita sua senha"
              placeholderTextColor="#888"
              autoCapitalize="none"
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              <Feather name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="#003869" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.mainButton} onPress={handleRegister}>
          <Text style={styles.mainButtonText}>CADASTRAR</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Já possui uma conta? </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text style={styles.loginLink}>Faça Login</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center', // center para acomodar mais campos
  },
  headerContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  logo: {
    width: 156, 
    height: 156,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003869',
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 17,
    color: '#003869',
    lineHeight: 30,
  },
  formContainer: {
    width: '100%',
    gap: 12, // diminui o espaçamento para caber tudo
  },
  inputGroup: {
    gap: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#003869',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    height: 44,
    borderRadius: 5,
    paddingHorizontal: 15,
    color: '#333',
    backgroundColor: 'white',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#004ef75e',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
    padding: 5,
  },
  footerContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
    marginTop: 25,
  },
  mainButton: {
    width: 236,
    height: 67,
    backgroundColor: '#003869',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '500',
    color: '#004ef799',
  },
});