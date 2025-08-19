import { Image } from 'expo-image';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Link, useNavigation } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}

      <View>
        <ThemedText type="title" style={styles.title}>Não implementado ainda!</ThemedText>
      </View>

      <View style={styles.buttonContainer}>
        <Link href="/(tabs)/secao" asChild>
          <TouchableOpacity style={styles.buttonContainer}>
            <ThemedText style={styles.buttonText}>Retornar a Seção</ThemedText>
          </TouchableOpacity>
        </Link>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10%',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.verdeEscuro,
    width: '60%',
    height: '5%',
    borderRadius: 100,
  },
  buttonText: {
    color: Colors.light.pageText,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
