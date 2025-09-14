import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors, Fonts } from "@/constants/Colors";
import { MathJaxSvg } from 'react-native-mathjax-html-to-svg';

const QuizScreen = () => {
  const [page, setPage] = useState(0); // Estado para controlar a página atual
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  let tamanhoMathJax = 0;
    //TAMANHO DO MATHJAX
    if (Platform.OS == 'web'){
      tamanhoMathJax = 2.5;
    }
    if (Platform.OS == 'android'){
      tamanhoMathJax = 17;
    }
    if (Platform.OS == 'ios'){
      tamanhoMathJax = 17; //testar dps
    }

  // -- FUNCAO PARA RENDERIZAR TEXTO COM MATHJAX --
    const parseAndRenderMath = (text: string) => {
      // A regex agora busca por fórmulas ($...$) ou texto em negrito (**...**)
      const parts = text.split(/(\$[^\$]+\$|\*\*[^\*]+\*\*)/);
  
      return (
        <Text style={styles.textStyle}>
          {parts.map((part, index) => {
            if (part.startsWith("$") && part.endsWith("$")) {
              return (
                <MathJaxSvg
                  key={index}
                  color={styles.textStyle.color}
                  fontSize={tamanhoMathJax}
                >
                  {part}
                </MathJaxSvg>
              );
            }
            if (part.startsWith("**") && part.endsWith("**")) {
              // Remove os asteriscos e aplica o estilo de negrito
              return (
                <Text key={index} style={styles.boldText}>
                  {part.slice(2, -2)}
                </Text>
              );
            }
            return part;
          })}
        </Text>
      );
    };

  const paginasDeConteudo = [
    // Conteúdo da página 1 (Potenciação)
    <View key="potenciacao">
      <Text style={styles.titulo2}>2.1 Potenciação</Text>

      {parseAndRenderMath('Definição 2.1 Dado um número real $a$ e um número inteiro $n$, com $n > 1$, chama-se **potência enésima de $a$**, que se indica por $a^n$, ao produto de $n$ fatores iguais a $a$. Assim:')}


      {parseAndRenderMath('$a^n = \\underbrace{a.a...a}_{n \\text{ fatores}} $')}


      {parseAndRenderMath('A seguir apresentamos alguns exemplos:')}


      <Text style={styles.titulo3}>Exemplo 2.1</Text>

      {parseAndRenderMath('a) $2^3 = 2 \\cdot 2 \\cdot 2 = 8$')}


      {parseAndRenderMath('b) $(-2)^3 = (-2) \\cdot (-2) \\cdot (-2) = -8$')}


      {parseAndRenderMath('c) $(-3)^2 = (-3) \\cdot (-3) = 9$')}


      {parseAndRenderMath('d) $(\\frac{2}{3})^2 = \\frac{4}{9}$')}


      <Text style={styles.titulo3}>Observações:</Text>

      {parseAndRenderMath('1) $(-2)^2 \\ne -2^2$, pois: $(-2)^2 = 4$ e $-2^2 = -4$;')}


      {parseAndRenderMath('2) $(-1)^n = 1$, se $n$ é par e $(-1)^n = -1$, se $n$ é ímpar;')}


      {parseAndRenderMath('3) $1^n = 1$;')}


      {parseAndRenderMath('4) $0^n = 0$, se $n \\ne 0$;')}


      {parseAndRenderMath('5) $a^1 = a$;')}


      {parseAndRenderMath('6) $a^0 = 1$;')}


      {parseAndRenderMath('7) $a^{-n} = \\frac{1}{a^n} = (\\frac{1}{a})^n$, $a \\ne 0$.')}


      <Text style={styles.titulo3}>2.1.1 Propriedades das potências</Text>

      {parseAndRenderMath('Para todo $a \\in \\mathbb{R}$, $b \\in \\mathbb{R}$, $m$ e $n$ inteiros, temos:')}


      {parseAndRenderMath('**P1.** $a^m \\cdot a^n = a^{m+n}$')}


      {parseAndRenderMath('**P2.** $\\frac{a^m}{a^n} = a^{m-n}$, $a \\ne 0$')}


      {parseAndRenderMath('**P3.** $(a^m)^n = a^{m \\cdot n}$')}


      {parseAndRenderMath('**P4.** $(\\frac{a}{b})^n = \\frac{a^n}{b^n}$, $b \\ne 0$')}


      {parseAndRenderMath('**P5.** $(a \\cdot b)^n = a^n \\cdot b^n$')}


      <Text style={styles.titulo3}>Exemplo 2.2</Text>

      {parseAndRenderMath('a) $2^7 \\cdot 2^3 = 2^{7+3} = 2^{10}$')}


      {parseAndRenderMath('b) $2^7 \\cdot 2^3 \\cdot 2^{-2} = 2^{7+3+(-2)} = 2^8$')}


      {parseAndRenderMath('c) $\\frac{2^7}{2^3} = 2^{7-3} = 2^4$')}


      {parseAndRenderMath('d) $(2^5)^3 = 2^{5 \\cdot 3} = 2^{15}$')}


      <Text style={styles.titulo3}>Exemplo 2.3</Text>

      {parseAndRenderMath('Calcular:')}


      {parseAndRenderMath('a) $\\frac{(5^3 \\cdot 5^7)^2}{5^{18}} = \\frac{(5^{10})^2}{5^{18}} = \\frac{5^{20}}{5^{18}} = 5^2 = 25$')}


      {parseAndRenderMath('b) $\\frac{(10^{-1})^{3} \\cdot 10^{-7}}{10^{-10}} = \\frac{10^{-3} \\cdot 10^{-7}}{10^{-10}} = \\frac{10^{-10}}{10^{-10}} = 1$')}


      {parseAndRenderMath('c) $3^{2^3} = 3^{(2^3)} = 3^8 = 6561$')}


      <Text style={styles.titulo3}>2.1.2 Notação científica</Text>

      {parseAndRenderMath('Um número escrito na notação científica corresponde ao produto de um número decimal de 1 a 10, excluído o 10, por uma potência de base 10.')}


      {parseAndRenderMath('Por exemplo, os números $2,6 \\cdot 10^6$ e $3 \\cdot 10^{-3}$ estão em notação científica.')}


      {parseAndRenderMath('Para se escrever um número em notação científica, podemos utilizar a seguinte ideia:')}


      {parseAndRenderMath('**P1.** quando deslocamos a vírgula para a **direita**, o expoente do 10 fica **negativo**.')}


      {parseAndRenderMath('**P2.** quando deslocamos a vírgula para a **esquerda**, o expoente do 10 fica **positivo**.')}


      <Text style={styles.titulo3}>Exemplo 2.4</Text>

      {parseAndRenderMath('Vamos escrever os seguintes números em notação científica:')}


      {parseAndRenderMath('a) $1700000 = 1,7 \\cdot 10^7$ (deslocamos 7 casas decimais à esquerda)')}


      {parseAndRenderMath('b) $0,422 = 4,22 \\cdot 10^{-1}$ (deslocamos 1 casa decimal à direita)')}


      {parseAndRenderMath('c) $-60200 = -6,02 \\cdot 10^4$ (deslocamos 4 casas decimais à esquerda)')}


      {parseAndRenderMath('d) $23,49 = 2,349 \\cdot 10^1$ (deslocamos 1 casa decimal à esquerda)')}

    </View>,

    // Conteúdo da página 2 (Radiciação)
    <View key="radiciacao">
      <Text style={styles.titulo2}>2.2 Radiciação</Text>
      
        {parseAndRenderMath('Para entendermos a ideia de radiciação, vamos observar as seguintes situações:')}
      
      
        {parseAndRenderMath('1) Um terreno quadrado tem $900 m^2$ de área. Qual é a medida do seu lado?')}
      

      
        {parseAndRenderMath('$x^2 = 900$')}
      
      
        {parseAndRenderMath('$x = \\sqrt{900}$')}
      
      
        {parseAndRenderMath('$x = 30$')}
      
      
        {parseAndRenderMath('Logo, a medida de seu lado é **30 m**.')}
      
      
        {parseAndRenderMath('2) Um reservatório de água tem a forma cúbica e sua capacidade é de 8 litros $(8 m^3)$. Quanto mede cada aresta desse reservatório?')}
      

      
        {parseAndRenderMath('$x^3 = 8$')}
      
      
        {parseAndRenderMath('$x = \\sqrt[3]{8}$')}
      
      
        {parseAndRenderMath('$x = 2$')}
      
      
        {parseAndRenderMath('Logo, a medida de cada aresta desse reservatório é 8 m.')}
      

      
        {parseAndRenderMath('**Definição 2.2** Sendo $a > 0$ e $n \\in \\mathbb{N}^*$, tem-se:')}
      
      <Text style={styles.textCenter}>
        {parseAndRenderMath('$ \\sqrt[n]{a} = b \\Leftrightarrow b^n = a \\text{ e } b \\ge 0 $')}
      </Text>
      
        {parseAndRenderMath('onde $b$ é um número real chamado raiz enésima de $a$.')}
      

      <Text style={styles.titulo3}>Exemplo 2.5</Text>
      
        {parseAndRenderMath('Usando a definição temos:')}
      
      
        {parseAndRenderMath('a) $\\sqrt{9} = 3$, pois $3^2 = 9$ e $3 \\ge 0$.')}
      
      
        {parseAndRenderMath('b) $\\sqrt[3]{64} = 4$, pois $4^3 = 64$ e $4 \\ge 0$.')}
      
      
        {parseAndRenderMath('c) $\\sqrt[3]{\\frac{8}{27}} = \\frac{2}{3}$, pois $(\\frac{2}{3})^3 = \\frac{8}{27}$ e $\\frac{2}{3} \\ge 0$.')}
      
      
        {parseAndRenderMath('**Observação:** Existem dois valores de $x$ que tornam verdadeira a sentença $x^2 = 25$: 5 e -5, pois, $5^2 = 25$ e $(-5)^2 = 25$. Também vale lembrar que, $\\sqrt[n]{-a} = -\\sqrt[n]{a}$ se $n$ for um número ímpar.')}
      

      <Text style={styles.titulo3}>2.2.1 Propriedades dos radicais</Text>
      
        {parseAndRenderMath('**P1.** $\\sqrt[n]{a^n} = a$')}
      
      
        {parseAndRenderMath('Exemplo: $\\sqrt{3^2} = 3$')}
      
      
        {parseAndRenderMath('**P2.** $\\sqrt[n]{a^m} = \\sqrt[n\\div p]{a^{m\\div p}}$ e $\\sqrt[n]{a^m} = \\sqrt[n \\cdot r]{a^{m \\cdot r}}$, com $p \\ne 0$ e $p$ divisor comum de $m$ e $n$.')}
      
      
        {parseAndRenderMath('Exemplos: $\\sqrt[6]{2^6} = \\sqrt[6\\div 2]{2^{6\\div 2}} = \\sqrt[3]{2^3}$ e $\\sqrt[3]{3^2} = \\sqrt[3 \\cdot 2]{3^{2 \\cdot 2}} = \\sqrt[6]{3^4}$')}
      
      
        {parseAndRenderMath('**P3.** $\\sqrt[n]{a \\cdot b} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}$')}
      
      
        {parseAndRenderMath('Exemplo: $\\sqrt{6 \\cdot 7} = \\sqrt{6} \\cdot \\sqrt{7}$')}
      
      
        {parseAndRenderMath('**P4.** $\\sqrt[n]{\\frac{a}{b}} = \\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}}$')}
      
      
        {parseAndRenderMath('Exemplo: $\\sqrt[3]{\\frac{3}{4}} = \\frac{\\sqrt[3]{3}}{\\sqrt[3]{4}}$')}
      
      
        {parseAndRenderMath('**P5.** $\\sqrt[n]{\\sqrt[m]{a}} = \\sqrt[n \\cdot m]{a}$')}
      
      
        {parseAndRenderMath('Exemplo: $\\sqrt[3]{\\sqrt[4]{7}} = \\sqrt[3 \\cdot 4]{7} = \\sqrt[12]{7}$')}
      

      
        {parseAndRenderMath('Podemos utilizar as propriedades para simplificar os radicais.')}
      

      <Text style={styles.titulo3}>Exemplo 2.6</Text>
      
        {parseAndRenderMath('Simplificar os radicais:')}
      
      
        {parseAndRenderMath('a) $\\sqrt[3]{320}$ b) $\\sqrt{32}$')}
      
      
        {parseAndRenderMath('Resolução:')}
      
      
        {parseAndRenderMath('a) Fatorando o 320, temos:')}
      
      <Text style={[styles.textStyle, styles.preFormattedText]}>
        {'320 | 2 \n160 | 2 \n 80 | 2 \n 40 | 2 \n 20 | 2 \n 10 | 2 \n  5 | 5 \n  1 | '}
      </Text>
      
        {parseAndRenderMath('Logo, $\\sqrt[3]{320} = 2 \\cdot 2 \\cdot \\sqrt[3]{5} = 4\\sqrt[3]{5}$.')}
      
      
        {parseAndRenderMath('b) Fatorando o 32, temos:')}
      
      <Text style={[styles.textStyle, styles.preFormattedText]}>
        {'32 | 2 \n16 | 2 \n 8 | 2 \n 4 | 2 \n 2 | 2 \n 1 | '}
      </Text>
      
        {parseAndRenderMath('Logo, $\\sqrt{32} = 2 \\cdot 2 \\cdot \\sqrt{2} = 4\\sqrt{2}$.')}
      

      <Text style={styles.titulo3}>2.2.2 Racionalização de denominadores</Text>
      
        {parseAndRenderMath('Vejamos agora como podemos evitar a divisão por números irracionais, ou seja, por radicais.')}
      

      <Text style={styles.titulo3}>Exemplo 2.7</Text>
      
        {parseAndRenderMath('Racionalizar o denominador de:')}
      
      
        {parseAndRenderMath('a) $\\frac{3}{\\sqrt{2}} = \\frac{3 \\cdot \\sqrt{2}}{\\sqrt{2} \\cdot \\sqrt{2}} = \\frac{3 \\sqrt{2}}{2}$')}
      
      
        {parseAndRenderMath('b) $\\frac{5}{\\sqrt[3]{7}} = \\frac{5 \\cdot \\sqrt[3]{7^2}}{\\sqrt[3]{7} \\cdot \\sqrt[3]{7^2}} = \\frac{5 \\sqrt[3]{49}}{7}$')}
      
      
        {parseAndRenderMath('c) $\\frac{3}{\\sqrt{7}+2} = \\frac{3(\\sqrt{7}-2)}{(\\sqrt{7}+2)(\\sqrt{7}-2)} = \\frac{3(\\sqrt{7}-2)}{7-4} = \\frac{3(\\sqrt{7}-2)}{3} = \\sqrt{7}-2$')}
      

      <Text style={styles.titulo3}>2.2.3 Potência com expoente racional</Text>
      
        {parseAndRenderMath('Na seção anterior estudamos expressões da forma $10^2$, $6^{-1}$ e $2^0$, que são potências com expoente inteiro cujo significado já conhecemos.')}
      
      
        {parseAndRenderMath('Qual será, então, o significado de uma potência com expoente fracionário, como, por exemplo, a expressão $2^{\\frac{3}{4}}$?')}
      
      
        {parseAndRenderMath('Logo, pode-se demonstrar que')}
      
      <Text style={styles.textCenter}>
        {parseAndRenderMath('$ 2^{\\frac{3}{4}} = \\sqrt[4]{2^3} $')}
      </Text>
      
        {parseAndRenderMath('Vejamos outros exemplos:')}
      

      <Text style={styles.titulo3}>Exemplo 2.8</Text>
      
        {parseAndRenderMath('Escreva as potências como radicais:')}
      
      
        {parseAndRenderMath('a) $5^{\\frac{6}{7}} = \\sqrt[7]{5^6}$')}
      
      
        {parseAndRenderMath('b) $9^{0,4} = 9^{\\frac{4}{10}} = 9^{\\frac{2}{5}} = \\sqrt[5]{9^2}$')}
      
    </View>
  ];

  const totalPages = paginasDeConteudo.length;

  const handleNavigation = (direction: "next" | "prev") => {
    const newPage = direction === "next" ? page + 1 : page - 1;
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }
  };

  return (
    <LinearGradient style={styles.container} colors={[Colors.gradientStart , Colors.gradientStart, Colors.gradientEnd]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/(matematica)/(potencia_radiciacao)/pot_rad")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>MATERIAL TEÓRICO</Text>
          <Text style={styles.headerSubtitle}>Potenciação e Radiciação</Text>
        </View>
        <View style={{ width: 48 }} />
      </View>

      <View style={styles.contentCard}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollViewContent}
        >
          {paginasDeConteudo[page]}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation("prev")}
          disabled={page === 0}
        >
          <Ionicons
            name="chevron-back"
            size={30}
            color={page === 0 ? "#A9A9A9" : "white"}
          />
        </TouchableOpacity>

        <Text style={styles.pageIndicator}>{`${page + 1}/${totalPages}`}</Text>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation("next")}
          disabled={page === totalPages - 1}
        >
          <Ionicons
            name="chevron-forward"
            size={30}
            color={page === totalPages - 1 ? "#A9A9A9" : "white"}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderBottomColor: "white",
      borderTopColor: "white",
    },
    backButton: { right : 40,},
    headerTitles: {
      alignItems: "center",
    },
    headerTitle: {
      fontSize: Fonts.size.large,
      fontFamily: Fonts.family.kumbhSans,
      color: Colors.white,
      letterSpacing: 1,
    },
    headerSubtitle: {
      fontSize: Fonts.size.medium,
      fontFamily: Fonts.family.kumbhSans,
      color: Colors.white,
      opacity: 0.8,
    },
    contentCard: {
      flex: 1,
      backgroundColor: "white",
      marginHorizontal: 16,
      marginVertical: 15,
      borderRadius: 10,
      overflow: "hidden",
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    scrollViewContent: {
      padding: 24,
    },
    titulo2: {
      fontSize: 22,
      fontFamily: Fonts.family.bold,
      color: Colors.primary,
      marginBottom: 20,
    },
    titulo3: {
      fontSize: 18,
      fontFamily: Fonts.family.bold,
      color: "#444",
      marginBottom: 12,
      marginTop: 12,
    },
    textStyle: {
      fontSize: 17,
      fontFamily: Fonts.family.regular,
      lineHeight: 28,
      color: "#333",
      marginBottom: 16,
      textAlign: "justify",
      flexWrap: "wrap",
      flexDirection: "row",
      alignItems: "center",
    },
    boldText: {
      fontFamily: Fonts.family.bold,
      color: "#333",
    },
    textCenter: {
      textAlign: 'center',
    },
    footer: {
      height: 60,
      backgroundColor: Colors.primary,
      marginHorizontal: 15,
      marginBottom: 20,
      borderRadius: 25,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 25,
      elevation: 5,
    },
    navButton: {
      padding: 5,
    },
    pageIndicator: {
      fontSize: 18,
      fontFamily: Fonts.family.bold,
      color: "white",
    },
    imageView: {
      alignItems: "center",
      marginVertical: 10,
    },
    image: {
      width: "90%",
      height: 220,
      resizeMode: "contain",
    },
    imageSubtitle: {
      fontSize: 14,
      color: "#666",
      textAlign: "center",
      fontStyle: "italic",
      marginTop: 4,
    },
    fatoracaoContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
      padding: 15,
      borderRadius: 8,
      marginVertical: 10,
    },
    preFormattedText: {
      fontFamily: "monospace",
      fontSize: 16,
      lineHeight: 24,
      color: "#333",
    },
    fatoracaoSeta: {
      fontFamily: "monospace",
      fontSize: 16,
      lineHeight: 24,
      color: "#333",
      marginHorizontal: 10,
    },
  });

export default QuizScreen;