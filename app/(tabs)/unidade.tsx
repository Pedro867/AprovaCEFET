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
      <TouchableOpacity onPress={() => navigation.navigate('matematica')} style={styles.backButton} >
        <IconSymbol name="arrow.left" size={24} color={Colors.light.text} />
      </TouchableOpacity >

      <View style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>Unidade</ThemedText>
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    gap: 8,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 10,
    lineHeight: 100,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    gap: 30,
  },
  button: {
    backgroundColor: Colors.light.tint,
    height: 60,
    width: 500,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.light.buttonText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
