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
        <Image
          source={require('@/assets/images/gifLogoAprovaCef.gif')}
          style={styles.logoImage}
          contentFit="contain" // mostra a img toda, sem cortar
        />
      </View>

      <View style={styles.buttonContainer}>
        {/*Botão de Entrar */}
        <Link href="/login" asChild>
          <TouchableOpacity>
            <View style={styles.buttonWrapper}>
              {/* Sombra do botão */}
              <View style={styles.buttonShadow} />
              {/* Botão principal */}
              <View style={styles.button}>
                <Text style={styles.buttonText}>ENTRAR</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>

        <Link href="/sign" asChild>
          <TouchableOpacity>
            <View style={styles.buttonWrapper}>
              {/* Sombra do botão */}
              <View style={styles.buttonShadow} />
              {/* Botão principal */}
              <View style={styles.button}>
                <Text style={styles.buttonText}>REGISTRAR</Text>
              </View>
            </View>
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
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 250,
    height: 250,
    marginBottom: 40,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80,
    gap: 50,
  },
  buttonWrapper: {
    width: 232,
    height: 64, 
  },
  button: {
    width: '100%',
    height: '100%',
    backgroundColor: '#003869',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //para ficar sobre a sombra
  },
  buttonShadow: {
    width: '100%',
    height: '100%',
    backgroundColor: '#004ef75e', // Cor da "sombra" com transparência
    borderRadius: 7,
    position: 'absolute', 
    top: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20, // text-xl
    fontWeight: 'bold',
  },
});