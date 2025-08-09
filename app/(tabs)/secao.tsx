import {StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated  from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Link, useNavigation } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Animated.ScrollView contentContainerStyle={styles.scrollViewContent}>
    <View style={styles.container}>

      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => router.replace('/(telas)')} style={styles.backButton}>
          <MaterialIcons name="exit-to-app" size={30} color={Colors.light.text} />
        </TouchableOpacity>

        <ThemedText type="title" style={styles.title}>Seções</ThemedText>
      </View>

      <View style={styles.buttonContainer}>
        <Link href="/(matematica)/matematica" asChild>
          <TouchableOpacity style={matematica.buttonMatematica}>
            <ThemedText style={styles.buttonText}>Matemática</ThemedText>
          </TouchableOpacity>
        </Link>

        <Link href="/(linguagens)/linguagens" asChild>
          <TouchableOpacity style={linguagens.buttonLinguagens}>
            <ThemedText style={styles.buttonText}>Linguagens</ThemedText>
          </TouchableOpacity>
        </Link>

        <Link href="/(natureza)/cienciasNatureza" asChild>
          <TouchableOpacity style={cienciasNatureza.buttonCienciasNatureza}>
            <ThemedText style={styles.buttonText}>Ciencias da Natureza</ThemedText>
          </TouchableOpacity>
        </Link>

        <Link href="/(humanas)/cienciasHumanas" asChild>
          <TouchableOpacity style={cienciasHumanas.buttonCienciasHumanas}>
            <ThemedText style={styles.buttonText}>Ciencias Humanas</ThemedText>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1, // Allows the content to grow and fill the available space
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    left: '8%',
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
    marginTop: 100,
    alignItems: 'center',
    width: '100%',
    height: '15%',
    rowGap: 100,
    columnGap: 50,
    flexDirection: 'row', // Arrange items in a row
    flexWrap: 'wrap',     // Allow items to wrap to the next line
    justifyContent: 'space-around', // Distribute items evenly in the row
  },
  button: {
    height: '100%',
    width: '30%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  buttonText: {
    color: Colors.light.pageText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const matematica = StyleSheet.create({
  buttonMatematica: {
    ...styles.button,
    backgroundColor: Colors.light.vermelho,
  }
});

const linguagens = StyleSheet.create({
  buttonLinguagens: {
    ...styles.button,
    backgroundColor: Colors.light.verdeEscuro,
  }
});

const cienciasNatureza = StyleSheet.create({
  buttonCienciasNatureza: {
    ...styles.button,
    backgroundColor: Colors.light.azul,
  }
});

const cienciasHumanas = StyleSheet.create({
  buttonCienciasHumanas: {
    ...styles.button,
    backgroundColor: Colors.light.amarelo,
  }
});