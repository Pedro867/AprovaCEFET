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
import { validaLogin } from '../api/conexaoFetch';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router'; //router pega o path todo, o navigate olha so o nome do arquivo

export default function LoginScreen() {
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false); // estado para o olho da senha
  const router = useRouter();

  const handleLogin = async () => { //funcao assincrona, chamada quando o botao entrar é pressionado
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    const sucesso = await validaLogin(email, senha);
    if (sucesso) {
      router.replace('/(tabs)/secao');
    } else {
    }
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
        <Text style={styles.title}>BEM VINDO DE VOLTA!</Text>
        <Text style={styles.subtitle}>Preencha os dados para continuar</Text>
      </View>

      <View style={styles.formContainer}>
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
              placeholder="Digite sua senha"
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

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>ENTRAR</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Não possui uma conta? </Text>
          <Link href="/sign" asChild>
            <TouchableOpacity>
              <Text style={styles.registerLink}>Registre-se agora</Text>
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
    justifyContent: 'space-around', // distribui o espaço
  },
  headerContainer: {
    alignItems: 'center',
    width: '100%',
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
    fontSize: 16,
    color: '#003869',
    lineHeight: 30,
  },
  formContainer: {
    width: '100%',
    gap: 16,
  },
  inputGroup: {
    gap: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#003869',
    lineHeight: 36,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    height: 44, 
    borderRadius: 5,
    paddingHorizontal: 19,
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
  forgotPassword: {
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '500',
    color: '#003869',
  },
  footerContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  loginButton: {
    width: 236,
    height: 67,
    backgroundColor: '#003869',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '500',
    color: '#004ef799',
  },
});