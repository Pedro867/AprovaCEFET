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
    <View key="Tecnicas de fatoracao">
      <Text style={styles.titulo2}>3.1 Técnicas de fatoração</Text>
      <Text style={styles.titulo3}>3.1.1 Valor numérico</Text>
      {parseAndRenderMath(
        "Quando, numa expressão algébrica, cada letra for substituída por um número e as eventuais operações puderem ser efetuadas, obter-se-á um resultado chamado de valor numérico da expressão algébrica."
      )}

      <Text style={styles.titulo3}>Exemplo 3.1</Text>
      {parseAndRenderMath("Obter o valor numérico de $a^2 - b^2 + ab$, para:")}
      {parseAndRenderMath("a) $a = 1$ e $b = 2$")}
      {parseAndRenderMath("$(1)^2 - (2)^2 + 1 \\cdot 2$")}
      {parseAndRenderMath("$1 - 4 + 2$")}
      {parseAndRenderMath("$-1$")}
      {parseAndRenderMath("b) $a = 2$ e $b = 1$")}
      {parseAndRenderMath("$(2)^2 - (1)^2 + 2 \\cdot 1$")}
      {parseAndRenderMath("$4 - 1 + 2$")}
      {parseAndRenderMath("$5$")}
    </View>,

    //PAGINA 5
    <View key="Fatoracao">
      <Text style={styles.titulo3}>3.1.2 Fatoração</Text>
      {parseAndRenderMath("Vejamos alguns casos de fatoração:")}
      <Text style={styles.titulo3}>1º Caso: Fator Comum</Text>
      {parseAndRenderMath(
        "Pela propriedade distributiva, temos que $a(b + c) = ab + ac$ e portanto,"
      )}
      {parseAndRenderMath("$a \\cdot b + a \\cdot c = a(b + c)$")}

      <Text style={styles.titulo3}>Exemplo 3.3</Text>
      {parseAndRenderMath("Fatorar $2x + xy - ax$.")}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath(
        "Como $x$ é fator comum, segue que: $2x + xy - ax = x(2 + y - a)$."
      )}

      <Text style={styles.titulo3}>Exemplo 3.4</Text>
      {parseAndRenderMath("Fatorar $8x^2 - 4x$.")}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath(
        "Como $4x$ é fator comum, segue que: $8x^2 - 4x = 4x(2x - 1)$"
      )}
    </View>,

    //PAGINA 6
    <View key="Trinomio Quadrado Perfeito e Diferença de Quadrados">
      <Text style={styles.titulo3}>2º Caso: Diferença de dois quadrados</Text>
      {parseAndRenderMath(
        "Vejamos o produto da soma pela diferença de dois termos:"
      )}
      {parseAndRenderMath("$(a + b)(a - b) = a^2 - ab + ab - b^2 = a^2 - b^2$")}
      {parseAndRenderMath("Portanto, a fatoração de $a^2 - b^2$ é $(a + b)(a - b)$.")}

      <Text style={styles.titulo3}>Exemplo 3.5</Text>
      {parseAndRenderMath("Fatorar $ax + ay - bx - by$.")}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath("$ax + ay - bx - by = (ax + ay) - (bx + by)$")}
      {parseAndRenderMath("$= a(x + y) - b(x + y)$")}
      {parseAndRenderMath("$= (x + y)(a - b)$")}

      <Text style={styles.titulo3}>Exemplo 3.6</Text>
      {parseAndRenderMath("Fatorar $x^2 - 25$.")}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath("$x^2 - 25 = x^2 - 5^2 = (x + 5)(x - 5)$")}

      <Text style={styles.titulo3}>Exemplo 3.7</Text>
      {parseAndRenderMath("Fatorar $a^4 - b^4$.")}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath(
        "$a^4 - b^4 = (a^2)^2 - (b^2)^2 = (a^2 + b^2)(a^2 - b^2) = (a^2 + b^2)(a + b)(a - b)$"
      )}

      <Text style={styles.titulo3}>3º Caso: Trinômio Quadrado Perfeito</Text>
      {parseAndRenderMath(
        "Lembre-se do quadrado da soma e do quadrado da diferença:"
      )}
      {parseAndRenderMath("$a^2 + 2ab + b^2 = (a + b)^2$")}
      {parseAndRenderMath("$a^2 - 2ab + b^2 = (a - b)^2$")}

      <Text style={styles.titulo3}>Exemplo 3.8</Text>
      {parseAndRenderMath("Desenvolver $(2x + 3y^2)^2$.")}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath(
        "$(2x + 3y^2)^2 = (2x)^2 + 2 \\cdot (2x) \\cdot (3y^2) + (3y^2)^2 = 4x^2 + 12xy^2 + 9y^4$"
      )}

      <Text style={styles.titulo3}>Exemplo 3.9</Text>
      {parseAndRenderMath("Desenvolver $(x - \\frac{1}{x})^2$.")}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath(
        "$(x - \\frac{1}{x})^2 = x^2 - 2 \\cdot (x) \\cdot (\\frac{1}{x}) + (\\frac{1}{x})^2 = x^2 - 2 + \\frac{1}{x^2}$"
      )}

      <Text style={styles.titulo3}>Exemplo 3.10</Text>
      {parseAndRenderMath("Fatorar $a^2 + 10ab + 25b^2$.")}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath(
        "$a^2 + 10ab + 25b^2 = (a)^2 + 2 \\cdot (a) \\cdot (5b) + (5b)^2 = (a + 5b)^2$"
      )}

      <Text style={styles.titulo3}>Exemplo 3.2</Text>
      {parseAndRenderMath(
        "Mostrar que o valor numérico de $(a + 2)(ab + 1) - a(ab + 2b + 1)$ independe dos valores de $a$ e $b$."
      )}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath("Efetuando os produtos indicados, obtemos:")}
      {parseAndRenderMath(
        "$a^2b + a + 2ab + 2 - a^2b - 2ab - a = 2$"
      )}
      {parseAndRenderMath(
        "Portanto, para quaisquer valores de $a$ e $b$, a expressão terá valor numérico 2."
      )}
    </View>,

    //PAGINA 7
    <View key="Sistemas de equacoes lineares">
      <Text style={styles.titulo2}>3.2 Sistemas de equações lineares</Text>
      {parseAndRenderMath(
        "Para resolver um sistema de equações lineares, vamos apresentar dois métodos: método da adição e o método da substituição."
      )}

      <Text style={styles.titulo3}>Método da adição:</Text>
      {parseAndRenderMath(
        "Consideremos o seguinte sistema de equações. Aplicando o método da adição temos:"
      )}
      {parseAndRenderMath(
        "$ \\begin{cases} 2x + y = 10 \\\\ x - y = 8 \\end{cases} $"
      )}
      {parseAndRenderMath("$3x = 18$")}
      {parseAndRenderMath("$x = 6$")}
      {parseAndRenderMath("Logo,")}
      {parseAndRenderMath("$x - y = 8 \\Rightarrow 6 - y = 8 \\Rightarrow y = -2$")}
      {parseAndRenderMath("Portanto, o conjunto solução do sistema é $\{(6, -2)\}$.")}

      <Text style={styles.titulo3}>Método da substituição:</Text>
      {parseAndRenderMath(
        "Consideremos o mesmo sistema de equações visto no método da adição. Assim, pelo método da substituição, vamos proceder da seguinte forma:"
      )}
      {parseAndRenderMath(
        "$ \\begin{cases} 2x + y = 10 \\\\ x - y = 8 \\rightarrow x = 8 + y \\end{cases} $"
      )}
      {parseAndRenderMath("Logo, substituindo na primeira equação temos,")}
      {parseAndRenderMath("$2x + y = 10$")}
      {parseAndRenderMath("$2(8 + y) + y = 10$")}
      {parseAndRenderMath("$16 + 2y + y = 10$")}
      {parseAndRenderMath("$3y = 10 - 16$")}
      {parseAndRenderMath("$y = -2$")}
      {parseAndRenderMath("E voltando na equação $x = 8 + y$, obtemos")}
      {parseAndRenderMath("$x = 8 + (-2) \\Rightarrow x = 6$")}
      {parseAndRenderMath(
        "Portanto, o conjunto solução do sistema é $\{(6, -2)\}$. Neste apostila, apenas apresentamos um exemplo de cada método, com o intuito de relembrar o processo. Nos testes a seguir, teremos a oportunidade de aplicar estes métodos na resolução de alguns problemas."
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
          onPress={() => router.replace("/(matematica)/(fatoracao_sistemas)/fat_sis")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>MATERIAL TEÓRICO</Text>
          <Text style={styles.headerSubtitle}>Fatoração e Sistemas Lineares</Text>
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