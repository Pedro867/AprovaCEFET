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
    //PAGINA 8
    <View key="Equacoes 2o grau">
      <Text style={styles.titulo2}>4.1 Definições</Text>
      {parseAndRenderMath(
        "Denomina-se equação do 2º grau na incógnita $x$ toda equação da forma $ax^2 + bx + c = 0$, onde $a, b, c$ são números reais e $a \\neq 0$."
      )}

      <Text style={styles.titulo3}>Exemplo 4.1</Text>
      {parseAndRenderMath(
        "$2x^2 + 2x - 40 = 0$ é uma equação do 2º grau, onde $a = 2, b = 2, c = -40$."
      )}
      {parseAndRenderMath(
        "$6x^2 - 9x = 0$ é uma equação do 2º grau, onde $a = 6, b = -9, c = 0$."
      )}
      {parseAndRenderMath(
        "$x^2 - 25 = 0$ é uma equação do 2º grau, onde $a = 1, b = 0, c = -25$."
      )}
      {parseAndRenderMath(
        "Quando $b \\neq 0$ e $c \\neq 0$, a equação se diz **completa**. Como exemplo temos a primeira equação do Exemplo 4.1."
      )}
      {parseAndRenderMath(
        "Quando $b = 0$ e/ou $c = 0$, a equação se diz **incompleta**, conforme as duas últimas equações do Exemplo 4.1."
      )}

      <Text style={styles.titulo2}>4.2 Resolvendo equações do 2º grau</Text>
      {parseAndRenderMath(
        "Resolver uma equação do 2º grau, é o mesmo que encontrar suas raízes. Quando uma equação do 2º grau for incompleta, usaremos a fatoração para resolver. Vejamos:"
      )}

      <Text style={styles.titulo3}>Exemplo 4.2</Text>
      {parseAndRenderMath("Resolver a equação $x^2 - 9x = 0$ no conjunto $\\mathbb{R}$.")}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath("$x^2 - 9x = 0$")}
      {parseAndRenderMath("$x(x - 9) = 0$")}
      {parseAndRenderMath(
        "Ou $x = 0$ ou $x - 9 = 0 \\Rightarrow x = 9$. Logo, o conjunto solução da equação é $S = \\{0, 9\\}$, e os números 0 e 9 são as raízes da equação."
      )}

      <Text style={styles.titulo3}>Exemplo 4.3</Text>
      {parseAndRenderMath("Resolver a equação $3x^2 - 60 = 0$.")}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath("$3x^2 - 60 = 0$")}
      {parseAndRenderMath("$3x^2 = 60$")}
      {parseAndRenderMath("$x^2 = \\frac{60}{3}$")}
      {parseAndRenderMath("$x^2 = 20$")}
      {parseAndRenderMath("$x = \\pm\\sqrt{20}$")}
      {parseAndRenderMath("$x = \\pm 2\\sqrt{5}$")}
      {parseAndRenderMath(
        "Logo, o conjunto solução da equação é $S = \\{\\pm 2\\sqrt{5}\\}$, e os números $-2\\sqrt{5}$ e $+2\\sqrt{5}$ são as raízes da equação."
      )}

      <Text style={styles.titulo3}>Exemplo 4.4</Text>
      {parseAndRenderMath("Determinar a solução da equação $x^2 + 4 = 0$ no conjunto $\\mathbb{R}$.")}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath("$x^2 + 4 = 0$")}
      {parseAndRenderMath("$x^2 = -4$")}
      {parseAndRenderMath("$x = \\pm\\sqrt{-4}$")}
      {parseAndRenderMath(
        "Como $\\sqrt{-4}$ não existe no conjunto $\\mathbb{R}$, não temos os valores reais para $x$. Logo, $S = \\emptyset$ e a equação não tem raízes reais."
      )}
      {parseAndRenderMath(
        "Nestes exemplos, resolvemos equações do 2º grau incompletas. Para resolvermos uma equação do 2º grau completa, usaremos a fórmula de Bhaskara."
      )}
    </View>,

    //PAGINA 9
    <View key="Formula de Bhaskara">
      <Text style={styles.titulo2}>4.2.1 Resolução pela fórmula de Bhaskara</Text>
      {parseAndRenderMath(
        "Pode-se provar que, para encontrarmos as raízes da equação do 2º grau pela fórmula de Bhaskara, utiliza-se as seguintes equações:"
      )}
      {parseAndRenderMath("$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$")}
      {parseAndRenderMath(
        "ou, chamando $\\Delta = b^2 - 4ac$, temos"
      )}
      {parseAndRenderMath("$x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$")}
      {parseAndRenderMath("**Observações**")}
      {parseAndRenderMath(
        "**•** Se $\\Delta > 0$, a equação possui duas raízes reais distintas."
      )}
      {parseAndRenderMath(
        "**•** Se $\\Delta = 0$, a equação possui duas raízes reais iguais."
      )}
      {parseAndRenderMath(
        "**•** Se $\\Delta < 0$, a equação não possui raízes reais."
      )}

      <Text style={styles.titulo3}>Exemplo 4.5</Text>
      {parseAndRenderMath("Resolver a equação $x^2 + 2x - 8 = 0$ no conjunto $\\mathbb{R}$.")}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath(
        "Nessa equação temos: $a = 1, b = 2, c = -8$. Assim,"
      )}
      {parseAndRenderMath(
        "$ \\Delta = b^2 - 4ac = (2)^2 - 4 \\cdot (1) \\cdot (-8) = 36 $"
      )}
      {parseAndRenderMath("Logo,")}
      {parseAndRenderMath(
        "$ x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a} = \\frac{-(2) \\pm \\sqrt{36}}{2 \\cdot (1)} = \\frac{-2 \\pm 6}{2} $"
      )}
      {parseAndRenderMath(
        "$ x' = \\frac{-2 + 6}{2} = \\frac{4}{2} = 2 $"
      )}
      {parseAndRenderMath(
        "$ x'' = \\frac{-2 - 6}{2} = \\frac{-8}{2} = -4 $"
      )}
      {parseAndRenderMath("Então, $S = \\{-4, 2\\}$.")}
    </View>,

    //PAGINA 10
    <View key="Soma e produto">
      <Text style={styles.titulo2}>4.2.2 Soma e Produto</Text>
      {parseAndRenderMath(
        "Consideremos a equação $ax^2 + bx + c = 0$, com $a \\neq 0$, e sejam $x'$ e $x''$ as raízes dessa equação. Entre as raízes $x'$ e $x''$ e os coeficientes $a, b, c$ da equação, existem duas relações importantes:"
      )}
      {parseAndRenderMath("1. $x' + x'' = -\\frac{b}{a}$ (Soma das raízes)")}
      {parseAndRenderMath("2. $x' \\cdot x'' = \\frac{c}{a}$ (Produto das raízes)")}
      {parseAndRenderMath("Vamos usar estas relações para resolvermos alguns problemas.")}

      <Text style={styles.titulo3}>Exemplo 4.6</Text>
      {parseAndRenderMath(
        "Determinar o valor de $m$ na equação $12x^2 - mx - 1 = 0$, de modo que a soma das raízes dessa equação seja $\\frac{5}{6}$."
      )}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath(
        "Pela equação temos, $a = 12, b = -m, c = -1$. De acordo com a relação da soma, podemos escrever:"
      )}
      {parseAndRenderMath(
        "$ x' + x'' = -\\frac{b}{a} = \\frac{-(-m)}{12} = \\frac{m}{12} $"
      )}
      {parseAndRenderMath("Então temos,")}
      {parseAndRenderMath(
        "$ \\frac{m}{12} = \\frac{5}{6} $"
      )}
      {parseAndRenderMath(
        "$ 6m = 60 $"
      )}
      {parseAndRenderMath(
        "$ m = 10 $"
      )}

      <Text style={styles.titulo3}>Exemplo 4.7</Text>
      {parseAndRenderMath(
        "Encontre as raízes da equação $x^2 - x - 20 = 0$, utilizando a relação da soma e do produto das suas raízes."
      )}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath(
        "Nessa equação temos: $a = 1, b = -1, c = -20$. Então,"
      )}
      {parseAndRenderMath(
        "$ x' + x'' = -\\frac{b}{a} = \\frac{-(-1)}{1} = 1 $"
      )}
      {parseAndRenderMath(
        "$ x' \\cdot x'' = \\frac{c}{a} = \\frac{-20}{1} = -20 $"
      )}
      {parseAndRenderMath(
        "Assim, temos que encontrar dois números que somados dê 1 e multiplicados dê -20. Logo, esses números são, -4 e 5. Portanto, as raízes da equação são -4 e 5."
      )}
    </View>,

    //PAGINA 11
    <View key="Equacoes biquadradas">
      <Text style={styles.titulo2}>4.2.3 Resolvendo equações biquadradas</Text>
      {parseAndRenderMath(
        "Denomina-se **equação biquadrada**, na incógnita $x$, toda equação da forma $ax^4 + bx^2 + c = 0$, onde $a, b, c$ são números reais e $a \\neq 0$."
      )}

      <Text style={styles.titulo3}>Exemplo 4.8</Text>
      {parseAndRenderMath("Resolver a equação $x^4 - 5x^2 + 4 = 0$.")}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath("Primeiramente, substituímos")}
      {parseAndRenderMath("$x^2 = y$")}
      {parseAndRenderMath(
        "Então temos, uma nova equação que é do 2º grau"
      )}
      {parseAndRenderMath(
        "$y^2 - 5y + 4 = 0$"
      )}
      {parseAndRenderMath("Resolvendo essa equação pela fórmula de Bhaskara, temos:")}
      {parseAndRenderMath(
        "$ y = \\frac{5 \\pm \\sqrt{9}}{2} = \\frac{5 \\pm 3}{2} $"
      )}
      {parseAndRenderMath("Assim, $y' = 4$ e $y'' = 1$.")}
      {parseAndRenderMath(
        "Em seguida, vamos substituir os valores de $y$ na equação $x^2 = y$ para obtermos os valores de $x$."
      )}
      {parseAndRenderMath("**•** $y = 4$: $x^2 = 4 \\Rightarrow x = \\pm\\sqrt{4} \\Rightarrow x = \\pm 2$")}
      {parseAndRenderMath("**•** $y = 1$: $x^2 = 1 \\Rightarrow x = \\pm\\sqrt{1} \\Rightarrow x = \\pm 1$")}
      {parseAndRenderMath(
        "Portanto, as raízes da equação biquadrada são, $-2, -1, 1, 2$."
      )}
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
          onPress={() => router.replace("/(matematica)/(equacoes)/equacoes")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>MATERIAL TEÓRICO</Text>
          <Text style={styles.headerSubtitle}>Equações do 2º grau</Text>
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