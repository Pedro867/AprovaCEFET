import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { MathJaxSvg } from 'react-native-mathjax-html-to-svg';
import Ionicons from "@expo/vector-icons/Ionicons";

const QuizScreen = () => {
  const [coins, setCoinsUsuario] = useState(0);
  const [page, setPage] = useState(0); // Estado para controlar a página atual

  const scrollViewRef = useRef(null);

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

  const parseAndRenderMath = (text) => {
    const elements = [];
    const regex = /(\$[^\$]+\$|<Text style={styles.boldText}>[^<]+<\/Text>)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        elements.push(<Text key={`text-${lastIndex}`}>{text.substring(lastIndex, match.index)}</Text>);
      }

      const matchedContent = match[0];
      if (matchedContent.startsWith('$') && matchedContent.endsWith('$')) {
        elements.push(
          <MathJaxSvg key={`math-${match.index}`} fontSize={20} style={styles.inlineMath}>
            {matchedContent}
          </MathJaxSvg>
        );
      } else if (matchedContent.startsWith('<Text')) {
        const boldText = matchedContent.replace(/<Text style={styles.boldText}>|<\/Text>/g, '');
        elements.push(<Text key={`bold-${match.index}`} style={styles.boldText}>{boldText}</Text>);
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      elements.push(<Text key={`text-${lastIndex}`}>{text.substring(lastIndex)}</Text>);
    }

    return elements;
  };

  const pages = [
    <View key="Conceitos primitivos">
      <Text style={styles.titulo2}>1.1 Conceitos Primitivos</Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Um conjunto é uma coleção não-ordenada de objetos, a ordem na qual os elementos são escritos não importa; portanto {violeta, mostarda, vermelho}, denota o mesmo conjunto que {mostarda, vermelho, violeta}. Além disso, cada elemento de um conjunto é listado apenas uma vez; seria redundante listá-los mais do que uma única vez.")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Usamos letras maiúsculas para denotarem conjuntos e o símbolo $\\in$ para denotar que um elemento pertence ao conjunto. Portanto, $a \\in A$ significa que $a$ é um elemento, ou membro, do conjunto $A$ e $b \\notin A$ significa que o objeto $b$ não é um elemento do conjunto $A$. Usamos chaves para indicar conjuntos.")}
      </Text>
      <Text style={styles.titulo3}>Exemplo 1.1</Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("A = {1, 2, 3}")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Dois conjuntos são <Text style={styles.boldText}>iguais</Text> se contêm os mesmos elementos. (Em uma definição, \"se\" significa, na verdade, \"se, e somente se\", portanto dois conjuntos são iguais se, e somente se, eles contêm os mesmos elementos.)")}
      </Text>
      <Text style={styles.titulo3}>Exemplo 1.2</Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("A = {1, 2} e B = {2, 1}, então A = B")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Podemos representar um conjunto por meio de uma <Text style={styles.boldText}>propriedade</Text>.")}
      </Text>
      <Text style={styles.titulo3}>Exemplo 1.3</Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Sendo $\\mathbb{N}$ = {0, 1, 2, ..., 10, 11, ...} o conjunto dos números naturais, quais são os elementos do conjunto A = {$x \\in \\mathbb{N}$ | $2x + 5 \\le 17$}?")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("$2x + 5 \\le 17 \\Rightarrow 2x \\le 17 - 5 \\Rightarrow 2x \\le 12 \\Rightarrow x \\le 6$")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Tem-se então que $x \\le 6$ e, portanto, A = {0, 1, 2, 3, 4, 5, 6}.")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Podemos notar que, primeiramente o conjunto A foi representado por uma propriedade, que nos levou a descrever todos os elementos do referido conjunto. Também destacamos que o conjunto $\\mathbb{N}$ , neste exemplo, é chamado de <Text style={styles.boldText}>conjunto universo</Text>. Um conjunto universo é o conjunto ao qual pertencem todos os elementos que podemos utilizar no problema.")}
      </Text>
      <Text style={styles.titulo3}>Exemplo 1.4</Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Quais são os elementos do conjunto B = {$x \\in \\mathbb{N}$ | $x + 2 \\le 1$}?")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("$x + 2 \\le 1 \\Rightarrow x \\le 1 - 2 \\Rightarrow x \\le -1$")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Podemos reparar que não há $x \\in \\mathbb{N}$ que satisfaz a propriedade, logo o conjunto B não possui nenhum elemento. Denominamos tal conjunto de conjunto vazio e denotamos por $\\emptyset$.")}
      </Text>
    </View>,

    <View key="Conjuntos numericos">
      <Text style={styles.titulo2}>1.2 Conjuntos numéricos</Text>
      <Text style={styles.titulo3}>1.2.1 Conjunto dos números naturais</Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Chama-se conjunto dos números naturais o conjunto formado pelos números 0, 1, 2, 3, ... e denotamos por $\\mathbb{N}$.")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("$\\mathbb{N} = {0, 1, 2, 3, ...}$")}
      </Text>

      <Text style={styles.titulo3}>1.2.2 Conjunto dos números inteiros</Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Chama-se conjunto dos números inteiros o conjunto formado pelos números ..., -2, -1, 0, 1, 2, 3, ... e denotamos por $\\mathbb{Z}$.")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("$\\mathbb{Z} = {..., -2, -1, 0, 1, 2, 3, ...}$")}
      </Text>

      <Text style={styles.titulo3}>1.2.3 Conjunto dos números racionais</Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Chama-se conjunto dos números racionais o conjunto formado pelos números que podem ser expressos por $\\frac{a}{b}$ onde $a,b \\in \\mathbb{Z}$ e $b \\neq 0$. Iremos denotar o conjunto por $\\mathbb{Q}$.")}
      </Text>

      <Text style={styles.titulo3}>Exemplo 1.5</Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Os números $-\\frac{5}{1} = -5$, $\\frac{2}{5} = 0,4$ e $-\\frac{1}{3} = -0,3333...$ são exemplos de números racionais.")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Destacamos que o número $\\frac{2}{5} = 0,4$ é chamado de <Text style={styles.boldText}>decimal exato</Text>. Já o número $-\\frac{1}{3} = -0,3333...$ chamamos de <Text style={styles.boldText}>dízima periódica</Text>.")}
      </Text>

      <Text style={styles.titulo3}>Exemplo 1.6</Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Vamos obter uma representação decimal para os números: a) $\\frac{3}{16}$ b) $\\frac{4}{9}$")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Dividindo 3 por 16 obtemos 0,1875 que é a representação decimal do número $\\frac{3}{16}$. Já a divisão de 4 por 9 obtemos 0,4444... que é a representação decimal do número $\\frac{4}{9}$.")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Uma vez entendido o exemplo acima, é fácil concluir que todo número racional pode ser expresso por um decimal exato ou por uma dízima periódica.")}
      </Text>

      <Text style={styles.titulo3}>Exemplo 1.7</Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Queremos representar os seguintes números por frações, essas frações são chamadas de frações geratrizes:")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("a) $ -1,234 = -\\frac{1234}{1000} $")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("b) $ 5,64444... = \\frac{564 - 56}{90} = \\frac{508}{90} $")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("c) $ 5,6454545... = \\frac{5645 - 56}{990} = \\frac{5589}{990} $")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Com estes exemplos, podemos perceber que toda dízima periódica é um número racional. Existem dízimas não-periódicas. Essas dízimas são os números irracionais.")}
      </Text>

      <Text style={styles.titulo3}>1.2.4 Conjunto dos números irracionais</Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("O conjunto será denotado por $\\mathbb{I}$. O conjunto dos números irracionais é constituído pelas dízimas não-periódicas. Como exemplos de números irracionais, podemos citar:")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("$\\pi = 3,1415926535...$")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("$\\sqrt{2} = 1,4142135623...$")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("$\\sqrt{3} = 1,7320508075...$")}
      </Text>

      <Text style={styles.titulo3}>1.2.5 Conjunto dos números reais</Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("A reunião do conjunto dos números irracionais com o dos racionais é o conjunto dos números reais que denotamos por $\\mathbb{R}$.")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("$\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}$")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Os conjuntos numéricos podem ser representados esquematicamente pela Figura 1.1")}
      </Text>

      <View style={styles.imageView}>
        <Image source={require('@/app/(matematica)/(conjuntos)/fig1.1.png')} style={styles.image}></Image>
      </View>

      <Text style={styles.imageSubtitle}>Figura 1.1: Representação dos conjuntos numéricos.</Text>
    </View>,

    <View key="Aritmetica dos inteiros">
      <Text style={styles.titulo2}>1.3 Aritmética dos inteiros</Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Nesta seção, vamos relembrar como escrever um número inteiro na sua forma fatorada, calcular o Mínimo Múltiplo Comum e o Máximo Divisor Comum entre números inteiros. Vejamos estes conceitos por meio de exemplos.")}
      </Text>

      <Text style={styles.titulo3}>Exemplo 1.8</Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Qual a forma fatorada de 528?")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Resolução:")}
      </Text>
      <Text style={[styles.textStyle, styles.preFormattedText]}>
        {"528 | 2\n264 | 2\n132 | 2\n 66 | 2   $=> 2^4 . 3^1 . 11^1$\n 33 | 3\n 11 | 11\n  1 |"}
      </Text>

      <Text style={styles.titulo3}>Exemplo 1.9</Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Quantos divisores possui o número 528?")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Resolução:")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("A forma fatorada do número 528 é $2^4 \\cdot 3^1 \\cdot 11^1$ como vimos no exemplo anterior. Portanto, para encontrarmos o número de divisores de 528 vamos proceder da seguinte forma: $ (4+1) \\cdot (1+1) \\cdot (1+1) = 5 \\cdot 2 \\cdot 2 = 20 $ divisores positivos.")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Sendo $p_1^{\\alpha_1}, p_2^{\\alpha_2}, \\dots, p_n^{\\alpha_n}$ a forma fatorada de um número natural n, pode-se concluir que o número de divisores positivos de n é $(\\alpha_1+1)(\\alpha_2+1)\\dots(\\alpha_n+1)$.")}
      </Text>

      <Text style={styles.titulo3}>Exemplo 1.10</Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Qual é o mínimo múltiplo comum entre os números 20 e 55?")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Resolução:")}
      </Text>
      <Text style={[styles.textStyle, styles.preFormattedText]}>
        {'20, 55 | 2\n10, 55 | 2\n 5, 55 | 5   =>  2 . 2 . 5 . 11 = 220\n 1, 11 | 11\n 1, 1  |'}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Portanto, $mmc(20, 55) = 220$.")}
      </Text>

      <Text style={styles.titulo3}>Exemplo 1.11</Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Qual é o máximo divisor comum entre os números 20 e 60?")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Resolução:")}
      </Text>
      <Text style={[styles.textStyle, styles.preFormattedText]}>
        {'20, 60 | 2\n10, 30 | 2\n 5, 15 | 3   => 2 . 2 . 5 = 20\n 5,  5 | 5\n 1,  1 |'}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Portanto, $mdc(20, 60) = 20$.")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Podemos resolver muitos problemas utilizando o mínimo múltiplo comum e o máximo divisor comum de números inteiros, como vamos apresentar nos dois exemplos a seguir:")}
      </Text>

      <Text style={styles.titulo3}>Exemplo 1.12</Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("De um aeroporto, partem todos os dias, 3 aviões que fazem rotas internacionais. O primeiro avião faz a rota de ida e volta em 4 dias, o segundo em 5 dias e o terceiro em 10 dias. Se num certo dia os três aviões partem simultaneamente, depois de quantos dias esses aviões partirão novamente no mesmo dia?")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Resolução:")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Para resolvermos esse problema, basta encontrar o $mmc(4, 5, 10)$.")}
      </Text>
      <Text style={[styles.textStyle, styles.preFormattedText]}>
        {'4, 5, 10| 2\n2, 5, 5 | 2\n1, 5, 5 | 5   => 2 . 2 . 5 = 20\n1, 1, 1 |'}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Portanto, esses aviões partirão novamente no mesmo dia daqui 20 dias.")}
      </Text>

      <Text style={styles.titulo3}>Exemplo 1.13</Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Um terreno retangular de 221 m por 117 m será cercado. Em toda a volta deste cercado serão plantadas árvores igualmente espaçadas. Qual o maior espaço possível entre as árvores?")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Resolução:")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Neste problema, queremos dividir no maior número possível, então basta encontrarmos o $mdc(221, 117)$ .")}
      </Text>
      <Text style={[styles.textStyle, styles.preFormattedText]}>
        {'221, 117| 13   => 13\n 17, 9  | 9\n 17, 1  | 17\n  1, 1  |'}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Portanto, o maior espaço possível entre as árvores será 13 m.")}
      </Text>
      <Text style={styles.textStyle}>
        {parseAndRenderMath("Observação: Dois números inteiros quaisquer são ditos <Text style={styles.boldText}>primos entre si</Text> se, e somente se, o seu mdc for 1, ou seja, se o único divisor comum entre eles for o 1. Por exemplo, 6 e 25 são números primos entre si.")}
      </Text>
    </View>
  ];

  const handleNavigation = (newPage) => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    setPage(newPage);
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[Colors.gradientEnd, Colors.gradientStart]}
    >
      <TouchableOpacity onPress={() => router.replace('/(matematica)/(conjuntos)/conjuntos')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Animated.ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.titulo1}>Conjuntos</Text>
        {pages[page]}

        <View style={styles.navButtonsContainer}>
          <TouchableOpacity
            style={[styles.navButton, page === 0 && styles.navButtonDisabled]}
            onPress={() => handleNavigation(page - 1)}
            disabled={page === 0}
          >
            <Text style={styles.navButtonText}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, page === pages.length - 1 && styles.navButtonDisabled]}
            onPress={() => handleNavigation(page + 1)}
            disabled={page === pages.length - 1}
          >
            <Text style={styles.navButtonText}>Próximo</Text>
          </TouchableOpacity>
        </View>

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
    marginTop: "30%",
    marginBottom: "10%",
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
  boldText: {
    fontSize: 20,
    fontWeight: 'bold',
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
    alignItems: 'center',
  },
  preFormattedText: {
    fontFamily: 'monospace',
    lineHeight: 20,
  },
  inlineMath: {
    lineHeight: 20,
  },
  navButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginTop: '3%',
  },
  navButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  navButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navButtonDisabled: {
    backgroundColor: '#6c6a6a8f',
  },
});

export default QuizScreen;
