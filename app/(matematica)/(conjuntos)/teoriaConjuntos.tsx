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
  const parentesisFechados = ')';
  const espaco = ' ';

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
          pertence ao conjunto. Portanto, a ∈ A significa que a é um elemento, ou membro, do conjunto A e b ∉ A
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
        <Text style={styles.textStyle}>Sendo {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\mathbb{N}$'}</MathJaxSvg>
          {espaco} = {chavesAbertas}0, 1, 2, ..., 10, 11, ...{chavesFechadas} o conjunto dos números naturais, quais são os elementos do conjunto
          A = {chavesAbertas}x ∈ {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\mathbb{N}$'}</MathJaxSvg>
          {espaco} |2x + 5 ≤ 17{chavesFechadas}? {enter} {enter}
          2x + 5 ≤ 17 ⇒ 2x ≤ 17 - 5 ⇒ 2x ≤ 12 ⇒ x ≤ 6 {enter} {enter}
          Tem-se então que x ≤ 6 e, portanto, A = {chavesAbertas}0, 1, 2, 3, 4, 5, 6{chavesFechadas}. {enter} {enter}
          Podemos notar que, primeiramente o conjunto A foi representado por uma propriedade, que nos levou a
          descrever todos os elementos do referido conjunto. Também destacamos que o conjunto {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\mathbb{N}$'}</MathJaxSvg>
          , neste exemplo,
          é chamado de conjunto universo.
          Um conjunto universo é o conjunto ao qual pertencem todos os elementos que podemos utilizar no
          problema
        </Text>
        <Text style={styles.titulo3}>Exemplo 1.4</Text>
        <Text style={styles.textStyle}>Quais são os elementos do conjunto B = {chavesAbertas}x ∈ {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\mathbb{N}$'}</MathJaxSvg>
          {espaco} |x + 2 ≤ 1{chavesFechadas}?
          x + 2 ≤ 1 ⇒ x ≤ 1 - 2 ⇒ x ≤ -1
          Podemos reparar que não há x ∈ N que satisfaz a propriedade, logo o conjunto B não possui nenhum
          elemento. Denominamos tal conjunto de conjunto vazio e denotamos por {chavesAbertas} {chavesFechadas} ou Ø.
        </Text>

        <Text style={styles.titulo2}>1.2 Conjuntos numéricos</Text>
        <Text style={styles.titulo3}>1.2.1 Conjunto dos números naturais</Text>
        <Text style={styles.textStyle}>Chama-se conjunto dos números naturais o conjunto formado pelos números 0, 1, 2, 3, ... e denotamos por {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\mathbb{N}$'}</MathJaxSvg>
          .</Text>
        <Text style={styles.textStyle}>
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\mathbb{N}$'}</MathJaxSvg>
          {espaco} = {`{0, 1, 2, 3, ...}`}</Text>

        <Text style={styles.titulo3}>1.2.2 Conjunto dos números inteiros</Text>
        <Text style={styles.textStyle}>Chama-se conjunto dos números inteiros o conjunto formado pelos números ..., -2, -1, 0, 1, 2, 3, ... e denotamos por {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$a,b \\in \\mathbb{Z}$'}</MathJaxSvg>
          .</Text>
        <Text style={styles.textStyle}>
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$a,b \\in \\mathbb{Z}$'}</MathJaxSvg> {espaco}
          = {`{..., -2, -1, 0, 1, 2, 3, ...}`}</Text>

        <Text style={styles.titulo3}>1.2.3 Conjunto dos números racionais</Text>
        <Text style={styles.textStyle}>Chama-se conjunto dos números racionais o conjunto formado pelos números que podem ser expressos por {espaco}
          <MathJaxSvg fontSize={2.5} style={styles.textStyle}>{'$\\frac{a}{b}$'}</MathJaxSvg> {espaco}
          onde {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$a,b \\in \\mathbb{Z}$'}</MathJaxSvg>
          {espaco} e {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$b \\neq 0$'}</MathJaxSvg> {espaco}
          . Iremos denotar o conjunto por {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$a,b \\in \\mathbb{Q}$'}</MathJaxSvg>
          .</Text>

        <Text style={styles.titulo3}>Exemplo 1.5</Text>
        <Text style={styles.textStyle}>Os números {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$-\\frac{5}{1} = -5$'}</MathJaxSvg>
          , {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\frac{2}{5} = 0,4$'}</MathJaxSvg> {espaco}
          e {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$-\\frac{1}{3} = -0,3333...$'}</MathJaxSvg> {espaco}
          são exemplos de números racionais.</Text>
        <Text style={styles.textStyle}>Destacamos que o número {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\frac{2}{5} = 0,4$'}</MathJaxSvg>
          {espaco} é chamado de decimal exato. Já o número {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$-\\frac{1}{3} = -0,3333...$ '}</MathJaxSvg> {espaco}
          chamamos de dízima periódica.</Text>

        <Text style={styles.titulo3}>Exemplo 1.6</Text>
        <Text style={styles.textStyle}>Vamos obter uma representação decimal para os números:</Text>
        <Text style={styles.textStyle}>a{parentesisFechados}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\frac{3}{16}$ '}</MathJaxSvg>
          {espaco} b{parentesisFechados}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\frac{4}{9}$'}</MathJaxSvg>
        </Text>

        {/* This seems to be the answer to Exemplo 1.6 */}
        <Text style={styles.textStyle}>Dividindo 3 por 16 obtemos 0,1875 que é a representação decimal do número {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\frac{3}{16}$'}</MathJaxSvg>
          . Já a divisão de 4 por 9 obtemos 0,4444... que é a representação decimal do número {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\frac{4}{9}$'}</MathJaxSvg>
          .</Text>
        <Text style={styles.textStyle}>Uma vez entendido o exemplo acima, é fácil concluir que todo número racional pode ser expresso por um decimal exato ou por uma dízima periódica.</Text>

        <Text style={styles.titulo3}>Exemplo 1.7</Text>
        <Text style={styles.textStyle}>Queremos representar os seguintes números por frações, essas frações são chamadas de frações geratrizes:</Text>
        <Text style={styles.textStyle}>a{parentesisFechados} {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$-1,234 = -\\frac{1234}{1000}$'}</MathJaxSvg>
        </Text>
        <Text style={styles.textStyle}>b{parentesisFechados} {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$5,64444... = \\frac{564 - 56}{90} = \\frac{508}{90}$'}</MathJaxSvg>
        </Text>
        <Text style={styles.textStyle}>c{parentesisFechados} {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$5,6454545... = \\frac{5645 - 56}{990} = \\frac{5589}{990}$'}</MathJaxSvg>
        </Text>
        <Text style={styles.textStyle}>Com estes exemplos, podemos perceber que toda dízima periódica é um número racional. Existem dízimas não-periódicas. Essas dízimas são os números irracionais.</Text>

        {/* --- Section on Irrational and Real Numbers --- */}
        <Text style={styles.titulo3}>1.2.4 Conjunto dos números irracionais</Text>
        {/* <Text style={styles.textStyle}>O conjunto será denotado por $\mathbb{I}$. O conjunto dos números irracionais é constituído pelas dízimas não-periódicas. Como exemplos de números irracionais, podemos citar:</Text> */}
        <Text style={styles.textStyle}><MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\pi = 3,1415926535...$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}><MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\sqrt{2} = 1,4142135623...$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}><MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\sqrt{3} = 1,7320508075...$'}</MathJaxSvg></Text>

        <Text style={styles.titulo3}>1.2.5 Conjunto dos números reais</Text>
        <Text style={styles.textStyle}>A reunião do conjunto dos números irracionais com o dos racionais é o conjunto dos números reais que denotamos por {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\mathbb{R}$'}</MathJaxSvg>.</Text> {enter}
        <Text style={styles.textStyle}><MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}$'}</MathJaxSvg></Text> {enter}
        <Text style={styles.textStyle}>Os conjuntos numéricos podem ser representados esquematicamente pela Figura 1.1</Text>

        <View style={styles.imageView}>
            <Image source={require('@/app/(matematica)/(conjuntos)/fig1.1.png')} style={styles.image}></Image>
        </View>

        <Text style={styles.imageSubtitle}>Figura 1.1: Representação dos conjuntos numéricos.</Text>

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
    marginTop: 20,
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
  imageSubtitle: {
    fontSize: 18,
    fontWeight: 'normal',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: '80%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  imageView: {
    alignItems  : 'center',
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