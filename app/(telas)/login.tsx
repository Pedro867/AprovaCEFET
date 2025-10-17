import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { validaLogin } from '../../utils/api/conexaoFetch';
//import { getNomeUsuario } from '../api/conexaoFetch';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router'; //router pega o path todo, o navigate olha so o nome do arquivo

import { BotaoCustomizado } from '@/components/ui/ButtomCustom';
import { InputCustomizado } from '@/components/ui/InputCustom';
import { Colors, Fonts, Spacing } from '@/constants/Colors'

export let nomeUsuario = "teste";

export default function LoginScreen() {
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // estado para o olho da senha
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => { //funcao assincrona, chamada quando o botao entrar é pressionado
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    setIsLoading(true);

    const sucesso = await validaLogin(email, senha);
    if (sucesso) {
      //setNomeUsuario = await getNomeUsuario();
      router.replace('/(tabs)/secao');
    } else {
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.title}>Carregando...</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 10} // Ajuste este valor se tiver um header
    >
      <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.container}>

        <View style={styles.headerContainer}>
          <Image
            source={require('@/assets/images/logoAprovaCefet.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>BEM VINDO DE VOLTA!</Text>
          <Text style={styles.subtitle}>Preencha os dados para continuar</Text>
        </View>

        <View style={styles.formContainer}>
          <InputCustomizado
            label="Endereço de email"
            value={email}
            onChangeText={setEmail}
            placeholder='Digite seu email'
            keyboardType='email-address'
            autoCapitalize='none'
          />

          <InputCustomizado
            label="Senha"
            value={senha}
            onChangeText={setSenha}
            placeholder='Digite sua senha'
            isPassword
          />


          <TouchableOpacity onPress={() => router.push('/forgotPassword')}>
            <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerContainer}>
          <BotaoCustomizado title='ENTRAR' onPress={handleLogin} />

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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboard: {
    flex: 1, // Permite que a view ocupe todo o espaço disponível
  },
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
    fontWeight: Fonts.weight.bold as 'bold',
    color: Colors.primary,
    lineHeight: 30,
  },
  subtitle: {
    fontSize: Fonts.size.medium,
    color: Colors.primary,
    lineHeight: 30,
  },
  formContainer: {
    width: '100%',
    gap: Spacing.formGap,
  },
  forgotPassword: {
    textAlign: 'right',
    fontSize: Fonts.size.small,
    fontWeight: Fonts.weight.medium as '500',
    color: Colors.primary,
  },

  footerContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
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
    color: '#004ef799',
    fontSize: 14,
    fontWeight: '500',
  },
});