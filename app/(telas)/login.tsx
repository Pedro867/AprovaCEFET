import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, useNavigation } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { validaLogin } from '../api/conexaoFetch';

export default function LoginScreen() {
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  return (
    <ThemedView style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity onPress={() => navigation.navigate('index')} style={styles.backButton}>
        <IconSymbol name="arrow.left" size={24} color={Colors.light.text} />
      </TouchableOpacity>

      <ThemedText type="title" style={styles.title}>Login</ThemedText>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Email</ThemedText>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Digite seu e-mail"
            placeholderTextColor={Colors.light.text}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <ThemedText style={styles.label}>Senha</ThemedText>
          <TextInput
            style={styles.input}
            onChangeText={setSenha}
            value={senha}
            placeholder="Digite sua senha"
            placeholderTextColor={Colors.light.text}
            autoCapitalize="none"
            secureTextEntry
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {/* O Link para 'home' vai para a tela principal após o cadastro */}
        <Link href="/(tabs)/secao" asChild>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              if (!email.trim() || !senha.trim()) {
                Alert.alert('Erro', 'Preencha todos os campos.');
                return;
              }
              await validaLogin(email, senha);
              navigation.navigate('/(tabs)/secao');
            }}
          >
            <ThemedText style={styles.buttonText}>Cadastrar</ThemedText>
          </TouchableOpacity>
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#444',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: Colors.light.text,
    backgroundColor: Colors.light.input,
    fontSize: 16,
    //TIRAR DPS
    shadowColor: '#000', // Cor da sombra
    shadowOffset: {
      width: 0,
      height: 4, // Deslocamento vertical da sombra
    },
    shadowOpacity: 0.5, // Opacidade da sombra
    shadowRadius: 5, // Raio do desfoque da sombra
    elevation: 8, // Elevação para Android (simula sombra)
    borderWidth: 1, 
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.light.verdeClaro,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
