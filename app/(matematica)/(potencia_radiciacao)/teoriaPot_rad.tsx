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

        <Text style={styles.titulo1}>Potenciação e Radiciação</Text>

        <Text style={styles.titulo2}>2.1 Potenciação</Text>
        <Text style={styles.textStyle}>
          Definição 2.1 Dado um número real <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$a$'}</MathJaxSvg> e um número inteiro <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$n$'}</MathJaxSvg>, {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$n > 1$'}</MathJaxSvg>, chama-se <Text style={{ fontWeight: 'bold' }}>potência enésima de <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$a$'}</MathJaxSvg></Text>
          , que se indica por <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$a^n$'}</MathJaxSvg>, ao produto de <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$n$'}</MathJaxSvg> fatores iguais a <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$a$'}</MathJaxSvg>. Assim:
        </Text>
        <Text style={styles.textStyle}>
          <MathJaxSvg fontSize={2} style={styles.textStyle}>
            {'$$ a^n = \\underbrace{a.a...a}_{n \\text{ fatores}} $$'}
          </MathJaxSvg>
        </Text>
        <Text style={styles.textStyle}>A seguir apresentamos alguns exemplos:</Text>

        <Text style={styles.titulo3}>Exemplo 2.1</Text>
        <Text style={styles.textStyle}>a{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$2^3 = 2 \\cdot 2 \\cdot 2 = 8$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}>b{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$(-2)^3 = (-2) \\cdot (-2) \\cdot (-2) = 8$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}>c{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$(-3)^2 = (-3) \\cdot (-3) = 9$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}>d{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$(\\frac{2}{3})^2 = \\frac{4}{9}$'}</MathJaxSvg></Text>

        <Text style={styles.titulo3}>Observações:</Text>
        <Text style={styles.textStyle}>1{parentesisFechados} {espaco} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$(-2)^2 \\ne -2^2$'}</MathJaxSvg>, pois: <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$(-2)^2 = 4$'}</MathJaxSvg> e <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$-2^2 = -4$'}</MathJaxSvg>;</Text>
        <Text style={styles.textStyle}>2{parentesisFechados} {espaco} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$(-1)^n = 1$'}</MathJaxSvg>, se {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$n$'}</MathJaxSvg> {espaco}
          é par e <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$(-1)^n = -1$'}</MathJaxSvg>, se {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$n$'}</MathJaxSvg> {espaco}
          é ímpar;</Text>
        <Text style={styles.textStyle}>3{parentesisFechados} {espaco} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$1^n = 1$'}</MathJaxSvg>;</Text>
        <Text style={styles.textStyle}>4{parentesisFechados} {espaco} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$0^n = 0$'}</MathJaxSvg>, se {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$n \\ne 0$'}</MathJaxSvg> {espaco}
          ;</Text>
        <Text style={styles.textStyle}>5{parentesisFechados} {espaco} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$a^1 = a$'}</MathJaxSvg>;</Text>
        <Text style={styles.textStyle}>6{parentesisFechados} {espaco} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$a^0 = 1$'}</MathJaxSvg>;</Text>
        <Text style={styles.textStyle}>7{parentesisFechados} {espaco} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$a^{-n} = \\frac{1}{a^n} = (\\frac{1}{a})^n$'}</MathJaxSvg>, {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$a \\ne 0$'}</MathJaxSvg>.</Text>

        <Text style={styles.titulo3}>2.1.1 Propriedades das potências</Text>
        <Text style={styles.textStyle}>Para todo <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$a \\in \\mathbb{R}$'}</MathJaxSvg>, {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$b \\in \\mathbb{R}$'}</MathJaxSvg>, {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$m$'}</MathJaxSvg> e {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$n$'}</MathJaxSvg> inteiros, temos:</Text>
        <Text style={styles.textStyle}><Text style={{ fontWeight: 'bold' }}>P1. {espaco}</Text> <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$a^m \\cdot a^n = a^{m+n}$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}><Text style={{ fontWeight: 'bold' }}>P2. {espaco}</Text> <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\frac{a^m}{a^n} = a^{m-n}$'}</MathJaxSvg>, {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$a \\ne 0$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}><Text style={{ fontWeight: 'bold' }}>P3. {espaco}</Text> <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$(a^m)^n = a^{m \\cdot n}$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}><Text style={{ fontWeight: 'bold' }}>P4. {espaco}</Text> <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$(\\frac{a}{b})^n = \\frac{a^n}{b^n}$'}</MathJaxSvg>, {espaco}
          <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$b \\ne 0$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}><Text style={{ fontWeight: 'bold' }}>P5. {espaco}</Text> <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$(a \\cdot b)^n = a^n \\cdot b^n$'}</MathJaxSvg></Text>

        <Text style={styles.titulo3}>Exemplo 2.2</Text>
        <Text style={styles.textStyle}>a{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$2^7 \\cdot 2^3 = 2^{7+3} = 2^{10}$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}>b{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$2^7 \\cdot 2^3 \\cdot 2^{-2} = 2^{7+3+(-2)} = 2^8$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}>c{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\frac{2^7}{2^3} = 2^{7-3} = 2^4$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}>d{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$(2^5)^3 = 2^{5 \\cdot 3} = 2^{15}$'}</MathJaxSvg></Text>

        <Text style={styles.titulo3}>Exemplo 2.3</Text>
        <Text style={styles.textStyle}>Calcular:</Text>
        <Text style={styles.textStyle}>a{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\frac{(5^3 \\cdot 5^7)^2}{5^{18}} = \\frac{(5^{10})^2}{5^{18}} = \\frac{5^{20}}{5^{18}} = 5^2 = 25$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}>b{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\frac{(10^{-1})^{3} \\cdot 10^{-7}}{10^{-10}} = \\frac{10^{-3} \\cdot 10^{-7}}{10^{-10}} = \\frac{10^{-10}}{10^{-10}} = 1$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}>c{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$3^{2^3} = 3^{(2^3)} = 3^8 = 6561$'}</MathJaxSvg></Text>

        <Text style={styles.titulo3}>2.1.2 Notação científica</Text>
        <Text style={styles.textStyle}>Um número escrito na notação científica corresponde ao produto de um número decimal de 1 a 10, excluído o 10, por uma potência de base 10.</Text>
        <Text style={styles.textStyle}>Por exemplo, os números <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$2,6 \\cdot 10^6$'}</MathJaxSvg> e <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$3 \\cdot 10^{-3}$'}</MathJaxSvg> estão em notação científica.</Text>
        <Text style={styles.textStyle}>Para se escrever um número em notação científica, podemos utilizar a seguinte ideia:</Text>
        <Text style={styles.textStyle}>
          <Text style={{ fontWeight: 'bold' }}>P1.</Text> quando deslocamos a vírgula para a <Text style={{ fontWeight: 'bold' }}>direita</Text>, o expoente do 10 fica <Text style={{ fontWeight: 'bold' }}>negativo</Text>.
        </Text>
        <Text style={styles.textStyle}>
          <Text style={{ fontWeight: 'bold' }}>P2.</Text> quando deslocamos a vírgula para a <Text style={{ fontWeight: 'bold' }}>esquerda</Text>, o expoente do 10 fica <Text style={{ fontWeight: 'bold' }}>positivo</Text>.
        </Text>

        <Text style={styles.titulo3}>Exemplo 2.4</Text>
        <Text style={styles.textStyle}>Vamos escrever os seguintes números em notação científica:</Text>
        <Text style={styles.textStyle}>a{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$1700000 = 1,7 \\cdot 10^7$'}</MathJaxSvg> (deslocamos 7 casas decimais à esquerda)</Text>
        <Text style={styles.textStyle}>b{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$0,422 = 4,22 \\cdot 10^{-1}$'}</MathJaxSvg> (deslocamos 1 casa decimal à direita)</Text>
        <Text style={styles.textStyle}>c{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$-60200 = -6,02 \\cdot 10^4$'}</MathJaxSvg> (deslocamos 4 casas decimais à esquerda)</Text>
        <Text style={styles.textStyle}>d{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$23,49 = 2,349 \\cdot 10^1$'}</MathJaxSvg> (deslocamos 1 casa decimal à esquerda)</Text>

        <Text style={styles.titulo2}>2.2 Radiciação</Text>
        <Text style={styles.textStyle}>Para entendermos a ideia de radiciação, vamos observar as seguintes situações:</Text>
        <Text style={styles.textStyle}>1{parentesisFechados} Um terreno quadrado tem <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$900 m^2$'}</MathJaxSvg> de área. Qual é a medida do seu lado?</Text>

        {/* Figura do quadrado não será incluída */}

        <Text style={styles.textStyle}><MathJaxSvg fontSize={2} style={styles.textStyle}>{'$x^2 = 900$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}><MathJaxSvg fontSize={2} style={styles.textStyle}>{'$x = \\sqrt{900}$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}><MathJaxSvg fontSize={2} style={styles.textStyle}>{'$x = 30$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}>Logo, a medida de seu lado é <Text style={styles.boldText}>30 m</Text>.</Text>
        <Text style={styles.textStyle}>2{parentesisFechados} Um reservatório de água tem a forma cúbica e sua capacidade é de 8 litros <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$(8 m^3)$'}</MathJaxSvg>. Quanto mede cada aresta desse reservatório?</Text>

        {/* Figura do cubo não será incluída */}

        <Text style={styles.textStyle}><MathJaxSvg fontSize={2} style={styles.textStyle}>{'$x^3 = 8$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}><MathJaxSvg fontSize={2} style={styles.textStyle}>{'$x = \\sqrt[3]{8}$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}><MathJaxSvg fontSize={2} style={styles.textStyle}>{'$x = 2$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}>Logo, a medida de cada aresta desse reservatório é 8 m.</Text>

        <Text style={styles.textStyle}>
          <Text style={styles.boldText}>Definição 2.2</Text> Sendo <MathJaxSvg fontSize={2} style={styles.textStyle}>{' $a > 0$ '}</MathJaxSvg> e <MathJaxSvg fontSize={2} style={styles.textStyle}>{' $n \\in \\mathbb{N}^*$ '}</MathJaxSvg>, tem-se:
        </Text>
        <Text style={styles.textCenter}>
          <MathJaxSvg fontSize={2} style={styles.textStyle}>
            {'$$ \\sqrt[n]{a} = b \\Leftrightarrow b^n = a \\text{ e } b \\ge 0 $$'}
          </MathJaxSvg>
        </Text>
        <Text style={styles.textStyle}>onde <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$b$'}</MathJaxSvg> é um número real chamado raiz enésima de <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$a$'}</MathJaxSvg>.</Text>

        <Text style={styles.titulo3}>Exemplo 2.5</Text>
        <Text style={styles.textStyle}>Usando a definição temos:</Text>
        <Text style={styles.textStyle}>a{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\sqrt{9} = 3$'}</MathJaxSvg>, pois <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$3^2 = 9$'}</MathJaxSvg> e <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$3 \\ge 0$'}</MathJaxSvg>.</Text>
        <Text style={styles.textStyle}>b{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\sqrt[3]{64} = 4$'}</MathJaxSvg>, pois <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$4^3 = 64$'}</MathJaxSvg> e <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$4 \\ge 0$'}</MathJaxSvg>.</Text>
        <Text style={styles.textStyle}>c{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\sqrt[3]{\\frac{8}{27}} = \\frac{2}{3}$'}</MathJaxSvg>, pois <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$(\\frac{2}{3})^3 = \\frac{8}{27}$'}</MathJaxSvg> e <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\frac{2}{3} \\ge 0$'}</MathJaxSvg>.</Text>
        <Text style={styles.textStyle}>
          <Text style={styles.boldText}>Observação:</Text> Existem dois valores de <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$x$'}</MathJaxSvg> que tornam verdadeira a sentença <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$x^2 = 25$'}</MathJaxSvg>: 5 e -5, pois, <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$5^2 = 25$'}</MathJaxSvg> e <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$(-5)^2 = 25$'}</MathJaxSvg>. Também vale lembrar que, <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\sqrt[n]{-a} = -\\sqrt[n]{a}$'}</MathJaxSvg> se <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$n$'}</MathJaxSvg> for um número ímpar.
        </Text>

        <Text style={styles.titulo3}>2.2.1 Propriedades dos radicais</Text>
        <Text style={styles.textStyle}><Text style={styles.boldText}>P1.</Text> <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\sqrt[n]{a^n} = a$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}>Exemplo: <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\sqrt{3^2} = 3$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}><Text style={styles.boldText}>P2.</Text> <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\sqrt[n]{a^m} = \\sqrt[n\\div p]{a^{m\\div p}}$'}</MathJaxSvg> e <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\sqrt[n]{a^m} = \\sqrt[n \\cdot r]{a^{m \\cdot r}}$'}</MathJaxSvg>, com $p \\ne 0$ e $p$ divisor comum de $m$ e $n$.</Text>
        <Text style={styles.textStyle}>Exemplos: <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\sqrt[6]{2^6} = \\sqrt[6\\div 2]{2^{6\\div 2}} = \\sqrt[3]{2^3}$'}</MathJaxSvg> e <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\sqrt[3]{3^2} = \\sqrt[3 \\cdot 2]{3^{2 \\cdot 2}} = \\sqrt[6]{3^4}$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}><Text style={styles.boldText}>P3.</Text> <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\sqrt[n]{a \\cdot b} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}>Exemplo: <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\sqrt{6 \\cdot 7} = \\sqrt{6} \\cdot \\sqrt{7}$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}><Text style={styles.boldText}>P4.</Text> <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\sqrt[n]{\\frac{a}{b}} = \\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}}$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}>Exemplo: <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\sqrt[3]{\\frac{3}{4}} = \\frac{\\sqrt[3]{3}}{\\sqrt[3]{4}}$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}><Text style={styles.boldText}>P5.</Text> <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\sqrt[n]{\\sqrt[m]{a}} = \\sqrt[n \\cdot m]{a}$'}</MathJaxSvg></Text> {/* BUG AQ */}
        <Text style={styles.textStyle}>Exemplo: <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\sqrt[3]{\\sqrt[4]{7}} = \\sqrt[3 \\cdot 4]{7} = \\sqrt[12]{7}$'}</MathJaxSvg></Text>

        <Text style={styles.textStyle}>Podemos utilizar as propriedades para simplificar os radicais.</Text>

        <Text style={styles.titulo3}>Exemplo 2.6</Text>
        <Text style={styles.textStyle}>Simplificar os radicais:</Text>
        <Text style={styles.textStyle}>a{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\sqrt[3]{320}$'}</MathJaxSvg> b{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\sqrt{32}$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}>Resolução:</Text>
        <Text style={styles.textStyle}>a{parentesisFechados} Fatorando o 320, temos:</Text>
        <Text style={[styles.textStyle, styles.preFormattedText]}>
          {'320 | 2 '}
          {'\n160 | 2 '}
          {'\n 80 | 2 '}
          {'\n 40 | 2 '}
          {'\n 20 | 2 '}
          {'\n 10 | 2 '}
          {'\n  5 | 5 '}
          {'\n  1 | '}
        </Text>
        <Text style={styles.textStyle}>Logo, <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\sqrt[3]{320} = 2 \\cdot 2 \\cdot \\sqrt[3]{5} = 4\\sqrt[3]{5}$'}</MathJaxSvg>.</Text>
        <Text style={styles.textStyle}>b{parentesisFechados} Fatorando o 32, temos:</Text>
        <Text style={[styles.textStyle, styles.preFormattedText]}>
          {'32 | 2 '}
          {'\n16 | 2 '}
          {'\n 8 | 2 '}
          {'\n 4 | 2 '}
          {'\n 2 | 2 '}
          {'\n 1 | '}
        </Text>
        <Text style={styles.textStyle}>Logo, <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\sqrt{32} = 2 \\cdot 2 \\cdot \\sqrt{2} = 4\\sqrt{2}$'}</MathJaxSvg>.</Text>

        <Text style={styles.titulo3}>2.2.2 Racionalização de denominadores</Text>
        <Text style={styles.textStyle}>Vejamos agora como podemos evitar a divisão por números irracionais, ou seja, por radicais.</Text>

        <Text style={styles.titulo3}>Exemplo 2.7</Text>
        <Text style={styles.textStyle}>Racionalizar o denominador de:</Text>
        <Text style={styles.textStyle}>
          a{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\frac{3}{\\sqrt{2}} = \\frac{3 \\cdot \\sqrt{2}}{\\sqrt{2} \\cdot \\sqrt{2}} = \\frac{3 \\sqrt{2}}{2}$'}</MathJaxSvg>
        </Text>
        <Text style={styles.textStyle}>
          b{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\frac{5}{\\sqrt[3]{7}} = \\frac{5 \\cdot \\sqrt[3]{7^2}}{\\sqrt[3]{7} \\cdot \\sqrt[3]{7^2}} = \\frac{5 \\sqrt[3]{49}}{7}$'}</MathJaxSvg>
        </Text>
        <Text style={styles.textStyle}>
          c{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$\\frac{3}{\\sqrt{7}+2} = \\frac{3(\\sqrt{7}-2)}{(\\sqrt{7}+2)(\\sqrt{7}-2)} = \\frac{3(\\sqrt{7}-2)}{7-4} = \\frac{3(\\sqrt{7}-2)}{3} = \\sqrt{7}-2$'}</MathJaxSvg>
        </Text>

        <Text style={styles.titulo3}>2.2.3 Potência com expoente racional</Text>
        <Text style={styles.textStyle}>Na seção anterior estudamos expressões da forma <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$10^2$'}</MathJaxSvg>, <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$6^{-1}$'}</MathJaxSvg> e <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$2^0$'}</MathJaxSvg>, que são potências com expoente inteiro cujo significado já conhecemos.</Text>
        <Text style={styles.textStyle}>Qual será, então, o significado de uma potência com expoente fracionário, como, por exemplo, a expressão <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$2^{\\frac{3}{4}}$'}</MathJaxSvg>?</Text>
        <Text style={styles.textStyle}>Logo, pode-se demonstrar que</Text>
        <Text style={styles.textCenter}>
          <MathJaxSvg fontSize={2} style={styles.textStyle}>
            {'$$ 2^{\\frac{3}{4}} = \\sqrt[4]{2^3} $$'}
          </MathJaxSvg>
        </Text>
        <Text style={styles.textStyle}>Vejamos outros exemplos:</Text>

        <Text style={styles.titulo3}>Exemplo 2.8</Text>
        <Text style={styles.textStyle}>Escreva as potências como radicais:</Text>
        <Text style={styles.textStyle}>a{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$5^{\\frac{6}{7}} = \\sqrt[7]{5^6}$'}</MathJaxSvg></Text>
        <Text style={styles.textStyle}>b{parentesisFechados} <MathJaxSvg fontSize={2} style={styles.textStyle}>{'$9^{0,4} = 9^{\\frac{4}{10}} = 9^{\\frac{2}{5}} = \\sqrt[5]{9^2}$'}</MathJaxSvg></Text>

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
    fontFamily: 'monospace', // Usar uma fonte de largura fixa para alinhamento
    // whiteSpace: 'pre',      // Preservar espaços e quebras de linha
    lineHeight: 20,         // Ajuste a altura da linha conforme necessário
  },
  inlineMath: {
    // Estilo para o MathJax para que ele se ajuste na mesma linha do texto
    // `lineHeight` pode precisar ser ajustado para alinhar com o texto
  },
  textCenter: {
    textAlign: 'center',
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default QuizScreen;