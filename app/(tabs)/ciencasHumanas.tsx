import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated  from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Link, useNavigation } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Animated.ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {/* Botão de voltar */}

        <View style={styles.titleContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('secao')} style={styles.backButton}>
            <IconSymbol name="arrow.left" size={24} color={Colors.light.text} />
          </TouchableOpacity>
          <ThemedText type="title" style={styles.title}>Ciencias Humanas</ThemedText>
        </View>
        <View style={styles.subtitleContainer}>
          <ThemedText type="subtitle" style={styles.subtitle}>Unidades</ThemedText>
        </View>

        <View style={styles.buttonContainer}>
          {/* O Link para matematica*/}
          <Link href="/(tabs)/unidade" asChild>
            <TouchableOpacity style={styles.button}>
              <ThemedText style={styles.buttonText}>Unidade 1</ThemedText>
            </TouchableOpacity>
          </Link>

          <Link href="/(tabs)/unidade" asChild>
            <TouchableOpacity style={styles.button}>
              <ThemedText style={styles.buttonText}>Unidade 2</ThemedText>
            </TouchableOpacity>
          </Link>

          <Link href="/(tabs)/unidade" asChild>
            <TouchableOpacity style={styles.button}>
              <ThemedText style={styles.buttonText}>Unidade 3</ThemedText>
            </TouchableOpacity>
          </Link>

          <Link href="/(tabs)/unidade" asChild>
            <TouchableOpacity style={styles.button}>
              <ThemedText style={styles.buttonText}>Unidade 4</ThemedText>
            </TouchableOpacity>
          </Link>

          <Link href="/(tabs)/unidade" asChild>
            <TouchableOpacity style={styles.button}>
              <ThemedText style={styles.buttonText}>Unidade 5</ThemedText>
            </TouchableOpacity>
          </Link>

          <Link href="/(tabs)/unidade" asChild>
            <TouchableOpacity style={styles.button}>
              <ThemedText style={styles.buttonText}>Unidade 6</ThemedText>
            </TouchableOpacity>
          </Link>

          <Link href="/(tabs)/unidade" asChild>
            <TouchableOpacity style={styles.button}>
              <ThemedText style={styles.buttonText}>Unidade 7</ThemedText>
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
    left: '-10%',
    zIndex: 1,
  },
  titleContainer: {
    backgroundColor: Colors.light.amarelo,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '5%',
    gap: 8,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 10,
    lineHeight: 100,
    minHeight: '25%',
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 10,
    lineHeight: 100,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
    gap: 30,
  },
  button: {
    backgroundColor: Colors.light.pageBackground,
    height: '15%',
    width: '80%',
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
