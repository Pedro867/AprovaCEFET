import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { MathJaxSvg } from 'react-native-mathjax-html-to-svg';

const imageMap = {
  //   "./q4.png": require('./q4.png'),
};

const QuizScreen = () => {
  const [coins, setCoinsUsuario] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const carregaCoins = async () => {
      try {
        const coins = await AsyncStorage.getItem("userPontuacao");
        setCoinsUsuario(parseInt(coins));
      } catch (error) {
        console.error("Erro ao carregar as coins do usuário", error);
      }
    };

    carregaCoins();
  }, []);

  const parseAndRenderMath = (text, fontSize) => {
    // Regex para encontrar equações inline ($...$) e em display ($$...$$)
    const parts = text.split(/(\$.*?\$|\$\$[\s\S]*?\$\$)/);

    return parts.map((part, index) => {
      // Se a parte começar com $, é uma equação MathJax
      if (part.startsWith('$')) {
        return (
          <MathJaxSvg key={index} fontSize={2}>
            {part}
          </MathJaxSvg>
        );
      }
      // Caso contrário, é texto normal
      else {
        return (
          <Text key={index} style={{ fontSize: fontSize }}>
            {part}
          </Text>
        );
      }
    });
  };

  /* PRECISA MUDAR A FUNÇÃO PARA RETORNAR A STRING DAS OPÇÕES PQ É UM TOUCHABLEOPACITY */
  const parseAndRenderMathOptions = (text, fontSize) => {
    // Regex para encontrar equações inline ($...$) e em display ($$...$$)
    const parts = text.split(/(\$.*?\$|\$\$[\s\S]*?\$\$)/);

    return parts.map((part, index) => {
      // Se a parte começar com $, é uma equação MathJax
      if (part.startsWith('$')) {
        return (
          <MathJaxSvg key={index} fontSize={2}>
            {part}
          </MathJaxSvg>
        );
      }
      // Caso contrário, é texto normal
      else {
        return (
          <Text key={index} style={{ fontSize: fontSize }}>
            {part}
          </Text>
        );
      }
    });
  };

  const chavesAbertas = '{';
  const chavesFechadas = '}';
  const enter = '\n';

  return (
    <LinearGradient
      style={styles.container}
      colors={[Colors.gradientEnd, Colors.gradientStart]}
    >
      <TouchableOpacity onPress={() => router.replace('/(matematica)/(conjuntos)/conjuntos')} style={styles.backButton}>
        <IconSymbol name="arrow.left" size={32} color={Colors.light.text} />
      </TouchableOpacity>
      <View style={styles.coinContainer}>
        <Image
          source={require("@/assets/images/pontos.png")}
          style={styles.coinIcon}
        />
        <Text style={styles.coinNumber}>{coins}</Text>
      </View>

      <Animated.ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.titulo1}>Conjuntos</Text>
        <Text style={styles.titulo2}>1.1 Conceitos Primitivos</Text>
        <Text style={styles.textStyle}>Um conjunto é uma coleção não-ordenada de objetos, a ordem na qual os elementos são escritos não
          importa; portanto {chavesAbertas}violeta, mostarda, vermelho{chavesFechadas}, denota o mesmo conjunto que {chavesAbertas}mostarda, vermelho,
          violeta{chavesFechadas}. Além disso, cada elemento de um conjunto é listado apenas uma vez; seria redundante listá-los
          mais do que uma única vez.{enter}
          Usamos letras maiúsculas para denotarem conjuntos e o símbolo ∈ para denotar que um elemento
          pertence ao conjunto. Portanto, a ∈ A significa que a é um elemento, ou membro, do conjunto A e b /∈ A
          significa que o objeto b não é um elemento do conjunto A. Usamos chaves para indicar conjuntos.
        </Text>
        <Text style={styles.titulo3}>Exemplo 1.1</Text>
        <Text style={styles.textStyle}>A = {chavesAbertas}1, 2, 3{chavesFechadas} {enter} {enter}
          Dois conjuntos são iguais se contêm os mesmos elementos. (Em uma definição, "se" significa, na
          verdade, "se, e somente se", portanto dois conjuntos são iguais se, e somente se, eles contêm os mesmos
          elementos.)
        </Text>
        <Text style={styles.titulo3}>Exemplo 1.2</Text>
        <Text style={styles.textStyle}>A = {chavesAbertas}1, 2{chavesFechadas} e B = {chavesAbertas}2, 1{chavesFechadas}, então A = B {enter} {enter}
          Podemos representar um conjunto por meio de uma propriedade.
        </Text>
        <Text style={styles.titulo3}>Exemplo 1.3</Text>
        <Text style={styles.textStyle}>Sendo N = {chavesAbertas}0, 1, 2, ..., 10, 11, ...{chavesFechadas} o conjunto dos números naturais, quais são os elementos do conjunto
          A = {chavesAbertas}x ∈ N/2x + 5 ≤ 17{chavesFechadas}? {enter} {enter}
          2x + 5 ≤ 17 ⇒ 2x ≤ 17 - 5 ⇒ 2x ≤ 12 ⇒ x ≤ 6 {enter} {enter}
          Tem-se então que x ≤ 6 e, portanto, A = {chavesAbertas}0, 1, 2, 3, 4, 5, 6{chavesFechadas}. {enter} {enter}
          Podemos notar que, primeiramente o conjunto A foi representado por uma propriedade, que nos levou a
          descrever todos os elementos do referido conjunto. Também destacamos que o conjunto N, neste exemplo,
          é chamado de conjunto universo.
          Um conjunto universo é o conjunto ao qual pertencem todos os elementos que podemos utilizar no
          problema
        </Text>
        <Text style={styles.titulo3}>Exemplo 1.4</Text>
        <Text style={styles.textStyle}>Quais são os elementos do conjunto B = {chavesAbertas}x ∈ N/x + 2 ≤ 1{chavesFechadas}?
          x + 2 ≤ 1 ⇒ x ≤ 1 - 2 ⇒ x ≤ -1
          Podemos reparar que não há x ∈ N que satisfaz a propriedade, logo o conjunto B não possui nenhum
          elemento. Denominamos tal conjunto de conjunto vazio e denotamos por {chavesAbertas} {chavesFechadas} ou Ø.
        </Text>
      </Animated.ScrollView>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: "5%",
    paddingBottom: 20,
    paddingHorizontal: "10%",
  },
  container: {
    flex: 1,
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  titulo1: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
  },
  titulo2: {
    fontSize: 28,
    fontWeight: 'semibold',
    marginBottom: 20,
    textAlign: 'left',
  },
  titulo3: {
    fontSize: 24,
    fontWeight: 'semibold',
    marginBottom: 20,
    textAlign: 'left',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'normal',
    marginBottom: 20,
    textAlign: 'justify',
  },
  textBold: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'justify',
  },
  image: {
    width: '80%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  coinContainer: {
    position: 'absolute',
    top: 50,
    right: 50,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  coinContainerScore: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  coinIcon: {
    width: 30,
    height: 30,
  },
  coinNumber: {
    fontSize: 20,
    color: "#060302",
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    marginLeft: 5,
  },
});

export default QuizScreen;