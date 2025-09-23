import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { BotaoCustomizado } from '@/components/ui/ButtomCustom';
import { Colors, Fonts, Spacing } from '@/constants/Colors';

export default function EnterCodeScreen() {
  const [code, setCode] = useState(['', '', '', '']); //array q armazena os digitos
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const inputs = useRef<Array<TextInput | null>>([]); //muda o 'foco' de cada campo (pula pro prox)

  const handleInputChange = (text: string, index: number) => { //move o cursor para o prox input
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerifyCode = async () => {
    const enteredCode = code.join(''); //junta o codigo em uma string só
    if (enteredCode.length !== 4) {
      Alert.alert('Erro', 'Por favor, insira o código de 4 dígitos.');
      return;
    }

    setIsLoading(true);

    // teste
    if (enteredCode === '1234') {
      router.push('/resetPassword');
    } else {
      Alert.alert('Erro', 'Código inválido.');
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.title}>Verificando...</Text>
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
          <Text style={styles.title}>VERIFICAR CÓDIGO</Text>
          <Text style={styles.subtitle}>Insira o código enviado para o seu e-mail</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.codeInputContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.codeInput}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(text) => handleInputChange(text, index)}
                value={digit}
                ref={(ref) => {inputs.current[index] = ref; }}
              />
            ))}
          </View>
        </View>

        <View style={styles.footerContainer}>
          <BotaoCustomizado title='VERIFICAR' onPress={handleVerifyCode} />
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
    fontSize: Fonts.size.medium,
    color: Colors.primary,
    lineHeight: 30,
    textAlign: 'center'
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
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
    
  },
  codeInput: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 28,
    backgroundColor: Colors.white,
    marginHorizontal: 2,
    
  },
});