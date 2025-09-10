import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { MathJaxSvg } from 'react-native-mathjax-html-to-svg';

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

  // Função refatorada para renderizar fórmulas e texto em negrito
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
    // Conteúdo da página 1 (Potenciação)
    <View key="potenciacao">
      <Text style={styles.titulo2}>2.1 Potenciação</Text>
      <Text>
        {parseAndRenderMath('Definição 2.1 Dado um número real $a$ e um número inteiro $n$, com $n > 1$, chama-se **potência enésima de $a$**, que se indica por $a^n$, ao produto de $n$ fatores iguais a $a$. Assim:')}
      </Text>
      <Text>
        {parseAndRenderMath('$a^n = \\underbrace{a.a...a}_{n \\text{ fatores}} $')}
      </Text>
      <Text>
        {parseAndRenderMath('A seguir apresentamos alguns exemplos:')}
      </Text>

      <Text style={styles.titulo3}>Exemplo 2.1</Text>
      <Text>
        {parseAndRenderMath('a) $2^3 = 2 \\cdot 2 \\cdot 2 = 8$')}
      </Text>
      <Text>
        {parseAndRenderMath('b) $(-2)^3 = (-2) \\cdot (-2) \\cdot (-2) = -8$')}
      </Text>
      <Text>
        {parseAndRenderMath('c) $(-3)^2 = (-3) \\cdot (-3) = 9$')}
      </Text>
      <Text>
        {parseAndRenderMath('d) $(\\frac{2}{3})^2 = \\frac{4}{9}$')}
      </Text>

      <Text style={styles.titulo3}>Observações:</Text>
      <Text>
        {parseAndRenderMath('1) $(-2)^2 \\ne -2^2$, pois: $(-2)^2 = 4$ e $-2^2 = -4$;')}
      </Text>
      <Text>
        {parseAndRenderMath('2) $(-1)^n = 1$, se $n$ é par e $(-1)^n = -1$, se $n$ é ímpar;')}
      </Text>
      <Text>
        {parseAndRenderMath('3) $1^n = 1$;')}
      </Text>
      <Text>
        {parseAndRenderMath('4) $0^n = 0$, se $n \\ne 0$;')}
      </Text>
      <Text>
        {parseAndRenderMath('5) $a^1 = a$;')}
      </Text>
      <Text>
        {parseAndRenderMath('6) $a^0 = 1$;')}
      </Text>
      <Text>
        {parseAndRenderMath('7) $a^{-n} = \\frac{1}{a^n} = (\\frac{1}{a})^n$, $a \\ne 0$.')}
      </Text>

      <Text style={styles.titulo3}>2.1.1 Propriedades das potências</Text>
      <Text>
        {parseAndRenderMath('Para todo $a \\in \\mathbb{R}$, $b \\in \\mathbb{R}$, $m$ e $n$ inteiros, temos:')}
      </Text>
      <Text>
        {parseAndRenderMath('**P1.** $a^m \\cdot a^n = a^{m+n}$')}
      </Text>
      <Text>
        {parseAndRenderMath('**P2.** $\\frac{a^m}{a^n} = a^{m-n}$, $a \\ne 0$')}
      </Text>
      <Text>
        {parseAndRenderMath('**P3.** $(a^m)^n = a^{m \\cdot n}$')}
      </Text>
      <Text>
        {parseAndRenderMath('**P4.** $(\\frac{a}{b})^n = \\frac{a^n}{b^n}$, $b \\ne 0$')}
      </Text>
      <Text>
        {parseAndRenderMath('**P5.** $(a \\cdot b)^n = a^n \\cdot b^n$')}
      </Text>

      <Text style={styles.titulo3}>Exemplo 2.2</Text>
      <Text>
        {parseAndRenderMath('a) $2^7 \\cdot 2^3 = 2^{7+3} = 2^{10}$')}
      </Text>
      <Text>
        {parseAndRenderMath('b) $2^7 \\cdot 2^3 \\cdot 2^{-2} = 2^{7+3+(-2)} = 2^8$')}
      </Text>
      <Text>
        {parseAndRenderMath('c) $\\frac{2^7}{2^3} = 2^{7-3} = 2^4$')}
      </Text>
      <Text>
        {parseAndRenderMath('d) $(2^5)^3 = 2^{5 \\cdot 3} = 2^{15}$')}
      </Text>

      <Text style={styles.titulo3}>Exemplo 2.3</Text>
      <Text>
        {parseAndRenderMath('Calcular:')}
      </Text>
      <Text>
        {parseAndRenderMath('a) $\\frac{(5^3 \\cdot 5^7)^2}{5^{18}} = \\frac{(5^{10})^2}{5^{18}} = \\frac{5^{20}}{5^{18}} = 5^2 = 25$')}
      </Text>
      <Text>
        {parseAndRenderMath('b) $\\frac{(10^{-1})^{3} \\cdot 10^{-7}}{10^{-10}} = \\frac{10^{-3} \\cdot 10^{-7}}{10^{-10}} = \\frac{10^{-10}}{10^{-10}} = 1$')}
      </Text>
      <Text>
        {parseAndRenderMath('c) $3^{2^3} = 3^{(2^3)} = 3^8 = 6561$')}
      </Text>

      <Text style={styles.titulo3}>2.1.2 Notação científica</Text>
      <Text>
        {parseAndRenderMath('Um número escrito na notação científica corresponde ao produto de um número decimal de 1 a 10, excluído o 10, por uma potência de base 10.')}
      </Text>
      <Text>
        {parseAndRenderMath('Por exemplo, os números $2,6 \\cdot 10^6$ e $3 \\cdot 10^{-3}$ estão em notação científica.')}
      </Text>
      <Text>
        {parseAndRenderMath('Para se escrever um número em notação científica, podemos utilizar a seguinte ideia:')}
      </Text>
      <Text>
        {parseAndRenderMath('**P1.** quando deslocamos a vírgula para a **direita**, o expoente do 10 fica **negativo**.')}
      </Text>
      <Text>
        {parseAndRenderMath('**P2.** quando deslocamos a vírgula para a **esquerda**, o expoente do 10 fica **positivo**.')}
      </Text>

      <Text style={styles.titulo3}>Exemplo 2.4</Text>
      <Text>
        {parseAndRenderMath('Vamos escrever os seguintes números em notação científica:')}
      </Text>
      <Text>
        {parseAndRenderMath('a) $1700000 = 1,7 \\cdot 10^7$ (deslocamos 7 casas decimais à esquerda)')}
      </Text>
      <Text>
        {parseAndRenderMath('b) $0,422 = 4,22 \\cdot 10^{-1}$ (deslocamos 1 casa decimal à direita)')}
      </Text>
      <Text>
        {parseAndRenderMath('c) $-60200 = -6,02 \\cdot 10^4$ (deslocamos 4 casas decimais à esquerda)')}
      </Text>
      <Text>
        {parseAndRenderMath('d) $23,49 = 2,349 \\cdot 10^1$ (deslocamos 1 casa decimal à esquerda)')}
      </Text>
    </View>,

    // Conteúdo da página 2 (Radiciação)
    <View key="radiciacao">
      <Text style={styles.titulo2}>2.2 Radiciação</Text>
      <Text>
        {parseAndRenderMath('Para entendermos a ideia de radiciação, vamos observar as seguintes situações:')}
      </Text>
      <Text>
        {parseAndRenderMath('1) Um terreno quadrado tem $900 m^2$ de área. Qual é a medida do seu lado?')}
      </Text>

      <Text>
        {parseAndRenderMath('$x^2 = 900$')}
      </Text>
      <Text>
        {parseAndRenderMath('$x = \\sqrt{900}$')}
      </Text>
      <Text>
        {parseAndRenderMath('$x = 30$')}
      </Text>
      <Text>
        {parseAndRenderMath('Logo, a medida de seu lado é **30 m**.')}
      </Text>
      <Text>
        {parseAndRenderMath('2) Um reservatório de água tem a forma cúbica e sua capacidade é de 8 litros $(8 m^3)$. Quanto mede cada aresta desse reservatório?')}
      </Text>

      <Text>
        {parseAndRenderMath('$x^3 = 8$')}
      </Text>
      <Text>
        {parseAndRenderMath('$x = \\sqrt[3]{8}$')}
      </Text>
      <Text>
        {parseAndRenderMath('$x = 2$')}
      </Text>
      <Text>
        {parseAndRenderMath('Logo, a medida de cada aresta desse reservatório é 8 m.')}
      </Text>

      <Text>
        {parseAndRenderMath('**Definição 2.2** Sendo $a > 0$ e $n \\in \\mathbb{N}^*$, tem-se:')}
      </Text>
      <Text style={styles.textCenter}>
        {parseAndRenderMath('$ \\sqrt[n]{a} = b \\Leftrightarrow b^n = a \\text{ e } b \\ge 0 $')}
      </Text>
      <Text>
        {parseAndRenderMath('onde $b$ é um número real chamado raiz enésima de $a$.')}
      </Text>

      <Text style={styles.titulo3}>Exemplo 2.5</Text>
      <Text>
        {parseAndRenderMath('Usando a definição temos:')}
      </Text>
      <Text>
        {parseAndRenderMath('a) $\\sqrt{9} = 3$, pois $3^2 = 9$ e $3 \\ge 0$.')}
      </Text>
      <Text>
        {parseAndRenderMath('b) $\\sqrt[3]{64} = 4$, pois $4^3 = 64$ e $4 \\ge 0$.')}
      </Text>
      <Text>
        {parseAndRenderMath('c) $\\sqrt[3]{\\frac{8}{27}} = \\frac{2}{3}$, pois $(\\frac{2}{3})^3 = \\frac{8}{27}$ e $\\frac{2}{3} \\ge 0$.')}
      </Text>
      <Text>
        {parseAndRenderMath('**Observação:** Existem dois valores de $x$ que tornam verdadeira a sentença $x^2 = 25$: 5 e -5, pois, $5^2 = 25$ e $(-5)^2 = 25$. Também vale lembrar que, $\\sqrt[n]{-a} = -\\sqrt[n]{a}$ se $n$ for um número ímpar.')}
      </Text>

      <Text style={styles.titulo3}>2.2.1 Propriedades dos radicais</Text>
      <Text>
        {parseAndRenderMath('**P1.** $\\sqrt[n]{a^n} = a$')}
      </Text>
      <Text>
        {parseAndRenderMath('Exemplo: $\\sqrt{3^2} = 3$')}
      </Text>
      <Text>
        {parseAndRenderMath('**P2.** $\\sqrt[n]{a^m} = \\sqrt[n\\div p]{a^{m\\div p}}$ e $\\sqrt[n]{a^m} = \\sqrt[n \\cdot r]{a^{m \\cdot r}}$, com $p \\ne 0$ e $p$ divisor comum de $m$ e $n$.')}
      </Text>
      <Text>
        {parseAndRenderMath('Exemplos: $\\sqrt[6]{2^6} = \\sqrt[6\\div 2]{2^{6\\div 2}} = \\sqrt[3]{2^3}$ e $\\sqrt[3]{3^2} = \\sqrt[3 \\cdot 2]{3^{2 \\cdot 2}} = \\sqrt[6]{3^4}$')}
      </Text>
      <Text>
        {parseAndRenderMath('**P3.** $\\sqrt[n]{a \\cdot b} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}$')}
      </Text>
      <Text>
        {parseAndRenderMath('Exemplo: $\\sqrt{6 \\cdot 7} = \\sqrt{6} \\cdot \\sqrt{7}$')}
      </Text>
      <Text>
        {parseAndRenderMath('**P4.** $\\sqrt[n]{\\frac{a}{b}} = \\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}}$')}
      </Text>
      <Text>
        {parseAndRenderMath('Exemplo: $\\sqrt[3]{\\frac{3}{4}} = \\frac{\\sqrt[3]{3}}{\\sqrt[3]{4}}$')}
      </Text>
      <Text>
        {parseAndRenderMath('**P5.** $\\sqrt[n]{\\sqrt[m]{a}} = \\sqrt[n \\cdot m]{a}$')}
      </Text>
      <Text>
        {parseAndRenderMath('Exemplo: $\\sqrt[3]{\\sqrt[4]{7}} = \\sqrt[3 \\cdot 4]{7} = \\sqrt[12]{7}$')}
      </Text>

      <Text>
        {parseAndRenderMath('Podemos utilizar as propriedades para simplificar os radicais.')}
      </Text>

      <Text style={styles.titulo3}>Exemplo 2.6</Text>
      <Text>
        {parseAndRenderMath('Simplificar os radicais:')}
      </Text>
      <Text>
        {parseAndRenderMath('a) $\\sqrt[3]{320}$ b) $\\sqrt{32}$')}
      </Text>
      <Text>
        {parseAndRenderMath('Resolução:')}
      </Text>
      <Text>
        {parseAndRenderMath('a) Fatorando o 320, temos:')}
      </Text>
      <Text style={[styles.textStyle, styles.preFormattedText]}>
        {'320 | 2 \n160 | 2 \n 80 | 2 \n 40 | 2 \n 20 | 2 \n 10 | 2 \n  5 | 5 \n  1 | '}
      </Text>
      <Text>
        {parseAndRenderMath('Logo, $\\sqrt[3]{320} = 2 \\cdot 2 \\cdot \\sqrt[3]{5} = 4\\sqrt[3]{5}$.')}
      </Text>
      <Text>
        {parseAndRenderMath('b) Fatorando o 32, temos:')}
      </Text>
      <Text style={[styles.textStyle, styles.preFormattedText]}>
        {'32 | 2 \n16 | 2 \n 8 | 2 \n 4 | 2 \n 2 | 2 \n 1 | '}
      </Text>
      <Text>
        {parseAndRenderMath('Logo, $\\sqrt{32} = 2 \\cdot 2 \\cdot \\sqrt{2} = 4\\sqrt{2}$.')}
      </Text>

      <Text style={styles.titulo3}>2.2.2 Racionalização de denominadores</Text>
      <Text>
        {parseAndRenderMath('Vejamos agora como podemos evitar a divisão por números irracionais, ou seja, por radicais.')}
      </Text>

      <Text style={styles.titulo3}>Exemplo 2.7</Text>
      <Text>
        {parseAndRenderMath('Racionalizar o denominador de:')}
      </Text>
      <Text>
        {parseAndRenderMath('a) $\\frac{3}{\\sqrt{2}} = \\frac{3 \\cdot \\sqrt{2}}{\\sqrt{2} \\cdot \\sqrt{2}} = \\frac{3 \\sqrt{2}}{2}$')}
      </Text>
      <Text>
        {parseAndRenderMath('b) $\\frac{5}{\\sqrt[3]{7}} = \\frac{5 \\cdot \\sqrt[3]{7^2}}{\\sqrt[3]{7} \\cdot \\sqrt[3]{7^2}} = \\frac{5 \\sqrt[3]{49}}{7}$')}
      </Text>
      <Text>
        {parseAndRenderMath('c) $\\frac{3}{\\sqrt{7}+2} = \\frac{3(\\sqrt{7}-2)}{(\\sqrt{7}+2)(\\sqrt{7}-2)} = \\frac{3(\\sqrt{7}-2)}{7-4} = \\frac{3(\\sqrt{7}-2)}{3} = \\sqrt{7}-2$')}
      </Text>

      <Text style={styles.titulo3}>2.2.3 Potência com expoente racional</Text>
      <Text>
        {parseAndRenderMath('Na seção anterior estudamos expressões da forma $10^2$, $6^{-1}$ e $2^0$, que são potências com expoente inteiro cujo significado já conhecemos.')}
      </Text>
      <Text>
        {parseAndRenderMath('Qual será, então, o significado de uma potência com expoente fracionário, como, por exemplo, a expressão $2^{\\frac{3}{4}}$?')}
      </Text>
      <Text>
        {parseAndRenderMath('Logo, pode-se demonstrar que')}
      </Text>
      <Text style={styles.textCenter}>
        {parseAndRenderMath('$ 2^{\\frac{3}{4}} = \\sqrt[4]{2^3} $')}
      </Text>
      <Text>
        {parseAndRenderMath('Vejamos outros exemplos:')}
      </Text>

      <Text style={styles.titulo3}>Exemplo 2.8</Text>
      <Text>
        {parseAndRenderMath('Escreva as potências como radicais:')}
      </Text>
      <Text>
        {parseAndRenderMath('a) $5^{\\frac{6}{7}} = \\sqrt[7]{5^6}$')}
      </Text>
      <Text>
        {parseAndRenderMath('b) $9^{0,4} = 9^{\\frac{4}{10}} = 9^{\\frac{2}{5}} = \\sqrt[5]{9^2}$')}
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
      <TouchableOpacity onPress={() => router.replace('/(matematica)/(potencia_radiciacao)/pot_rad')} style={styles.backButton}>
        <IconSymbol name="arrow.left" size={32} color={Colors.light.text} />
      </TouchableOpacity>
      <View style={styles.coinContainer}>
        <Image
          source={require("@/assets/images/pontos.png")}
          style={styles.coinIcon}
        />
        <Text style={styles.coinNumber}>{coins}</Text>
      </View>

      <Animated.ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.titulo1}>Potenciação e Radiciação</Text>
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
  preFormattedText: {
    fontFamily: 'monospace',
    lineHeight: 20,
  },
  inlineMath: {},
  textCenter: {
    textAlign: 'center',
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