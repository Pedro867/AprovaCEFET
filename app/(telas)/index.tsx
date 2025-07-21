import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, useNavigation } from 'expo-router';
import React from 'react';
import { Image } from 'expo-image'; //componente para colocar a img da logo
import { Button, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import { navigate } from 'expo-router/build/global-state/routing';

export default function InitialScreen() {
  const navigation = useNavigation();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>AprovaCEFET</ThemedText>
        <ThemedText style={styles.subtitle}>Sua plataforma de estudos para o CEFET-MG</ThemedText>
        <Image
          source={require('@/assets/images/logoTemporario.png')}
          style={styles.logoImage}
          contentFit="contain" // mostra a img toda, sem cortar
        />
      </View>

      <View style={styles.buttonContainer}>
        <Link href="/login">
          <TouchableOpacity style={[styles.button, styles.loginButton]}>
            <ThemedText style={styles.buttonText}>Logar</ThemedText>
          </TouchableOpacity>
        </Link>
        <Link href="/sign">
          <View style={[styles.button, styles.signButton]}>
            <ThemedText style={[styles.buttonText]}>Criar Conta</ThemedText>
          </View>

          {/* <Button title="Cadastrar" onPress={() => console.log("ola")} /> */}

        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '',
    marginBottom: 10,
    lineHeight: 100,
  },
  subtitle: {
    fontSize: 18,
    color: '',
    textAlign: 'center',
    marginBottom: 40,
  },
  logoImage: {
    width: 250,
    height: 250,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 80,
    gap: 50,
  },
  button: {
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000', // Cor da sombra
    shadowOffset: {
      width: 0,
      height: 4, // Deslocamento vertical da sombra
    },
    shadowOpacity: 0.5, // Opacidade da sombra
    shadowRadius: 5, // Raio do desfoque da sombra
    elevation: 8, // Elevação para Android (simula sombra)
    borderWidth: 1, 
    borderColor: '#005F6B',
  },
  loginButton: {
    backgroundColor: Colors.light.tint,
  },
  signButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.light.tint,
  },
  buttonText: {
    color: Colors.light.buttonText,
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 30
  },
});