import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { BotaoCustomizado } from '@/components/ui/ButtomCustom';
import { InputCustomizado } from '@/components/ui/InputCustom';
import { Colors, Fonts, Spacing } from '@/constants/Colors';

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = async () => {
    if (!password.trim() || !confirmPassword.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setIsLoading(true);

    
    //TORRES -> ALTERAR A SENHA NO BD AQ

    Alert.alert('Sucesso', 'Sua senha foi alterada com sucesso.');
    router.replace('/login');

    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.title}>Alterando...</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 10}
    >
      <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.container}>

        <View style={styles.headerContainer}>
          <Image
            source={require('@/assets/images/logoAprovaCefet.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>ALTERAR SENHA</Text>
          <Text style={styles.subtitle}>Insira sua nova senha</Text>
        </View>

        <View style={styles.formContainer}>
          <InputCustomizado
            label="Nova Senha"
            value={password}
            onChangeText={setPassword}
            placeholder='Digite sua nova senha'
            isPassword
          />
          <InputCustomizado
            label="Confirmar Nova Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder='Confirme sua nova senha'
            isPassword
          />
        </View>

        <View style={styles.footerContainer}>
          <BotaoCustomizado title='ALTERAR SENHA' onPress={handleResetPassword} />
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
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
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
  footerContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
});