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

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendCode = async () => {
    if (!email.trim()) { 
    Alert.alert('Erro', 'Preencha o campo de email.');
    return;
  }
    setIsLoading(true);
    //TORRES -> logica de enviar email aq
    router.push('/verifyCode');
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.title}>Enviando...</Text>
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
          <Text style={styles.title}>RECUPERAR SENHA</Text>
          <Text style={styles.subtitle}>Insira seu email para receber o código</Text>
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
        </View>

        <View style={styles.footerContainer}>
          <BotaoCustomizado title='ENVIAR CÓDIGO' onPress={handleSendCode} />
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
    fontSize: 34,
    fontWeight: Fonts.weight.bold as 'bold',
    color: Colors.primary,
    lineHeight: 30,
  },
  subtitle: {
    fontSize: Fonts.size.large,
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