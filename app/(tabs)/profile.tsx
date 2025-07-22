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

      <View style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>Profile</ThemedText>
      </View>

      <View style={styles.buttonContainer}>
        {/* O Link para maetmatica*/}
        <Link href="/(tabs)/matematica" asChild>
          <TouchableOpacity style={styles.button}>
            <ThemedText style={styles.buttonText}>Matemática</ThemedText>
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
    marginTop: 100,
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 50,
    paddingHorizontal: 50,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.light.verdeClaro,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
