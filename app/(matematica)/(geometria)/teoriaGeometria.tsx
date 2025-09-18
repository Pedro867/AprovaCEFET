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
  if (Platform.OS == 'web') {
    tamanhoMathJax = 2.5;
  }
  if (Platform.OS == 'android') {
    tamanhoMathJax = 17;
  }
  if (Platform.OS == 'ios') {
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
    <View key="Teorema de Tales">
      <Text style={styles.titulo2}>7.1 Teorema de Tales</Text>
      {parseAndRenderMath(
        "O teorema de Tales garante que um feixe de paralelas determina em duas transversais segmentos proporcionais."
      )}
      <Image
        source={require("@/app/(matematica)/(geometria)/7.1.png")}
        style={styles.image}
      />
      {parseAndRenderMath(
        "$ r // s // t \\implies \\frac{AB}{BC} = \\frac{MN}{NP} $"
      )}
      {parseAndRenderMath(
        "Podemos considerar, ainda, outras proporções a partir do teorema de Tales:"
      )}
      {parseAndRenderMath(
        "$ \\frac{AB}{AC} = \\frac{MN}{MP} \\quad \\frac{BC}{AC} = \\frac{NP}{MP} \\quad \\frac{AB}{MN} = \\frac{BC}{NP} $"
      )}
      <Text style={styles.titulo3}>Exemplo 7.1</Text>
      {parseAndRenderMath(
        "Na figura abaixo, determinar a medida de $x$ indicada."
      )}
      <Image
        source={require("@/app/(matematica)/(geometria)/7.1.1.png")}
        style={styles.image}
      />
      {parseAndRenderMath(
        "Pelo teorema de Tales, temos:"
      )}
      {parseAndRenderMath(
        "$ \\frac{10}{2} = \\frac{8}{x} $"
      )}
      {parseAndRenderMath(
        "$ 10x = 2 \\cdot 8 $"
      )}
      {parseAndRenderMath(
        "$ 10x = 16 $"
      )}
      {parseAndRenderMath(
        "$ x = \\frac{16}{10} $"
      )}
      {parseAndRenderMath(
        "$ x = 1,6 $"
      )}
      <Text style={styles.titulo3}>Exemplo 7.2</Text>
      {parseAndRenderMath(
        "Na Figura abaixo, determinar as medidas $x$ e $y$."
      )}
      <Image
        source={require("@/app/(matematica)/(geometria)/7.1.2.png")}
        style={styles.image}
      />
      {parseAndRenderMath(
        "Pelo teorema de Tales, temos:"
      )}
      {parseAndRenderMath(
        "$ \\frac{5}{9} = \\frac{x}{y} $"
      )}
      {parseAndRenderMath(
        "Aplicando a propriedade da soma nas proporções, sabendo que $x + y = 28$:"
      )}
      {parseAndRenderMath(
        "$ \\frac{5 + 9}{5} = \\frac{x + y}{x} $"
      )}
      {parseAndRenderMath(
        "$ \\frac{14}{5} = \\frac{28}{x} $"
      )}
      {parseAndRenderMath(
        "$ 14x = 5 \\cdot 28 $"
      )}
      {parseAndRenderMath(
        "$ 14x = 140 $"
      )}
      {parseAndRenderMath(
        "$ x = \\frac{140}{14} $"
      )}
      {parseAndRenderMath(
        "$ x = 10 $"
      )}
      {parseAndRenderMath(
        "Como $x + y = 28$, então $y = 28 - 10 = 18$."
      )}
      <Text style={styles.titulo3}>Exemplo 7.3</Text>
      {parseAndRenderMath(
        "Na figura, $RS // BC$. Determinar a medida de $x$ no triângulo abaixo."
      )}
      <Image
        source={require("@/app/(matematica)/(geometria)/7.1.3.png")}
        style={styles.image}
      />
      {parseAndRenderMath(
        "Pelo teorema de Tales aplicado nos triângulos temos a seguinte relação:"
      )}
      {parseAndRenderMath(
        "$ \\frac{2x}{x} = \\frac{x + 4}{x + 1} $"
      )}
      {parseAndRenderMath(
        "$ 2x(x + 1) = x(x + 4) $"
      )}
      {parseAndRenderMath(
        "$ 2x^2 + 2x = x^2 + 4x $"
      )}
      {parseAndRenderMath(
        "$ x^2 - 2x = 0 $"
      )}
      {parseAndRenderMath(
        "$ x(x - 2) = 0 $"
      )}
      {parseAndRenderMath(
        "ou $x = 0$ ou $x - 2 = 0 \\implies x = 2$."
      )}
      {parseAndRenderMath(
        "Como $x = 0$ não serve, então $x = 2$."
      )}
    </View>,

    <View key="Figuras Semelhantes">
      <Text style={styles.titulo2}>7.2 Figuras semelhantes</Text>
      {parseAndRenderMath(
        "Em geometria, duas figuras são semelhantes quando todos os ângulos correspondentes têm medidas iguais e quando todas as distâncias correspondentes são proporcionais."
      )}
      {parseAndRenderMath(
        "Dois polígonos com o mesmo número de lados são semelhantes quando possuem os ângulos respectivamente congruentes e os lados correspondentes proporcionais."
      )}
      {parseAndRenderMath(
        "Vamos observar os quadriláteros da Figura 7.2."
      )}
      <Image
        source={require("@/app/(matematica)/(geometria)/7.2.png")}
        style={styles.image}
      />
      {parseAndRenderMath(
        "Os ângulos correspondentes possuem a mesma medida: $\\widehat{A} \\cong \\widehat{M}, \\widehat{B} \\cong \\widehat{N}, \\widehat{C} \\cong \\widehat{P}, \\widehat{D} \\cong \\widehat{Q}$."
      )}
      {parseAndRenderMath(
        "Os lados correspondentes são proporcionais."
      )}
      {parseAndRenderMath(
        "$ \\frac{AB}{MN} = \\frac{6}{2,4} = 2,5 $"
      )}
      {parseAndRenderMath(
        "$ \\frac{BC}{NP} = \\frac{3}{1,2} = 2,5 $"
      )}
      {parseAndRenderMath(
        "$ \\frac{CD}{PQ} = \\frac{5}{2} = 2,5 $"
      )}
      {parseAndRenderMath(
        "$ \\frac{AD}{MQ} = \\frac{4}{1,6} = 2,5 $"
      )}
      {parseAndRenderMath(
        "Podemos notar que a razão entre qualquer lado do quadrilátero $ABCD$ e o lado correspondente no quadrilátero $MNPQ$ é sempre a mesma, 2,5. Dizemos, então, que 2,5 é a **razão de semelhança** entre os polígonos."
      )}
      {parseAndRenderMath(
        "Vamos resolver alguns problemas envolvendo semelhança de figuras planas."
      )}
      <Text style={styles.titulo3}>Exemplo 7.4</Text>
      {parseAndRenderMath(
        "Os quadriláteros $ABCD$ e $EFGH$ são semelhantes. O lado $AB$ do primeiro correspondente ao lado $EF$ do segundo. Sabendo que a razão de semelhança do primeiro para o segundo é de $\\frac{2}{3}$ qual é a medida do lado $EF$ do quadrilátero $EFGH$?"
      )}
      <Image
        source={require("@/app/(matematica)/(geometria)/7.2.1.png")}
        style={styles.image}
      />
      {parseAndRenderMath(
        "Como os quadriláteros são semelhantes, temos:"
      )}
      {parseAndRenderMath(
        "$ \\frac{AB}{EF} = \\frac{2}{3} $"
      )}
      {parseAndRenderMath(
        "$ \\frac{5}{x} = \\frac{2}{3} $"
      )}
      {parseAndRenderMath(
        "$ 2x = 15 $"
      )}
      {parseAndRenderMath(
        "$ x = \\frac{15}{2} $"
      )}
      {parseAndRenderMath(
        "$ x = 7,5 $"
      )}
      {parseAndRenderMath(
        "Logo, $EF = 7,5cm$."
      )}
      <Text style={styles.titulo3}>7.2.1 Triângulos semelhantes</Text>
      {parseAndRenderMath(
        "Dois triângulos são semelhantes quando têm os ângulos respectivamente congruentes ou quando os lados correspondentes são proporcionais."
      )}
      {parseAndRenderMath(
        "Se dois triângulos são semelhantes, então os lados de um são proporcionais aos lados homólogos do outro."
      )}
      {parseAndRenderMath(
        "Vejamos alguns exemplos nos quais aplicamos semelhança de triângulos."
      )}
      <Text style={styles.titulo3}>Exemplo 7.5</Text>
      {parseAndRenderMath(
        "Dada a figura abaixo, determinar os valores de $x$ e $y$."
      )}
      <Image
        source={require("@/app/(matematica)/(geometria)/7.3.png")}
        style={styles.image}
      />
      {parseAndRenderMath(
        "Como os triângulos têm dois ângulos congruentes, concluímos que eles são semelhantes. Logo,"
      )}
      {parseAndRenderMath(
        "$ \\frac{6}{3} = \\frac{x}{4} = \\frac{10}{y} $"
      )}
      {parseAndRenderMath(
        "Assim, resolvendo as duas equações"
      )}
      {parseAndRenderMath(
        "$ \\frac{6}{3} = \\frac{x}{4} $"
      )}
      {parseAndRenderMath(
        "e"
      )}
      {parseAndRenderMath(
        "$ \\frac{6}{3} = \\frac{10}{y} $"
      )}
      {parseAndRenderMath(
        "obtemos, $x = 8cm$ e $y = 5cm$."
      )}
      <Text style={styles.titulo3}>Exemplo 7.6</Text>
      {parseAndRenderMath(
        "Um homem de $1,80m$ de altura projeta uma sombra de $2,70m$ de comprimento no mesmo instante em que uma árvore projeta uma sombra de $9m$ de comprimento. Qual é a altura da árvore?"
      )}
      {parseAndRenderMath(
        "Podemos representar este problema conforme a figura abaixo."
      )}
      <Image
        source={require("@/app/(matematica)/(geometria)/7.4.png")}
        style={styles.image}
      />
      {parseAndRenderMath(
        "Como os triângulos são semelhantes, temos"
      )}
      {parseAndRenderMath(
        "$ \\frac{1,80}{x} = \\frac{2,70}{9} $"
      )}
      {parseAndRenderMath(
        "$ 2,70x = 1,80 \\cdot 9 $"
      )}
      {parseAndRenderMath(
        "$ 2,70x = 16,2 $"
      )}
      {parseAndRenderMath(
        "$ x = \\frac{16,2}{2,70} $"
      )}
      {parseAndRenderMath(
        "$ x = 6 $"
      )}
      {parseAndRenderMath(
        "Então, a altura da árvore é de $6m$."
      )}
    </View>,

    <View key="Relacoes Metricas no Triangulo Retangulo">
      <Text style={styles.titulo2}>7.3 Relações métricas no triângulo retângulo</Text>
      <Text style={styles.titulo3}>7.3.1 Teorema de Pitágoras</Text>
      {parseAndRenderMath(
        "Em todo triângulo retângulo, o quadrado da medida da hipotenusa é igual à soma dos quadrados das medidas dos catetos."
      )}
      <Image
        source={require("@/app/(matematica)/(geometria)/7.5.png")}
        style={styles.image}
      />
      {parseAndRenderMath(
        "Então, pelo teorema de Pitágoras, tem-se"
      )}
      {parseAndRenderMath(
        "$ c^2 = a^2 + b^2 $"
      )}
      <Text style={styles.titulo3}>Exemplo 7.7</Text>
      {parseAndRenderMath(
        "No triângulo retângulo, determine a medida $x$."
      )}
      <Image
        source={require("@/app/(matematica)/(geometria)/7.6.png")}
        style={styles.image}
      />
      {parseAndRenderMath(
        "Pelo teorema de Pitágoras, temos,"
      )}
      {parseAndRenderMath(
        "$ (\\sqrt{5})^2 = (x - 3)^2 + (2x - 1)^2 $"
      )}
      {parseAndRenderMath(
        "$ 5 = x^2 - 6x + 9 + 4x^2 - 4x + 1 $"
      )}
      {parseAndRenderMath(
        "$ 5x^2 - 10x + 5 = 0 $"
      )}
      {parseAndRenderMath(
        "Resolvendo a equação do $2^o$ grau, temos:"
      )}
      {parseAndRenderMath(
        "$ \\Delta = (-10)^2 - 4 \\cdot (5) \\cdot (5) = 100 - 100 = 0 $"
      )}
      {parseAndRenderMath(
        "Assim,"
      )}
      {parseAndRenderMath(
        "$ x = \\frac{-(-10) \\pm \\sqrt{0}}{2 \\cdot 5} = \\frac{10}{10} = 1 $"
      )}
      <Text style={styles.titulo3}>7.3.2 Outras relações métricas no triângulo retângulo</Text>
      {parseAndRenderMath(
        "Dado o triângulo retângulo $ABC$. Sabendo que $AH$ é a altura relativa à base (hipotenusa), pode-se mostrar as seguintes relações métricas."
      )}
      <Image
        source={require("@/app/(matematica)/(geometria)/7.7.png")}
        style={styles.image}
      />
      {parseAndRenderMath(
        "\\begin{array}{|c|c|} \\hline b^2 = m \\cdot a & c^2 = n \\cdot a \\\\ \\hline h^2 = m \\cdot n & b \\cdot c = a \\cdot h \\\\ \\hline a = m + n & a^2 = b^2 + c^2 \\\\ \\hline \\end{array}"
      )}
      <Text style={styles.titulo3}>Exemplo 7.8</Text>
      {parseAndRenderMath(
        "No triângulo retângulo, determinar as medidas $a$, $h$, $b$ e $c$ indicadas."
      )}
      <Image
        source={require("@/app/(matematica)/(geometria)/7.8.png")}
        style={styles.image}
      />
      {parseAndRenderMath(
        "$ a = m + n $"
      )}
      {parseAndRenderMath(
        "$ a = 3,2 + 1,8 $"
      )}
      {parseAndRenderMath(
        "$ a = 5cm $"
      )}
      {parseAndRenderMath(
        "$ h^2 = mn $"
      )}
      {parseAndRenderMath(
        "$ h^2 = 1,8 \\cdot 3,2 $"
      )}
      {parseAndRenderMath(
        "$ h^2 = 5,76 $"
      )}
      {parseAndRenderMath(
        "$ h = \\sqrt{5,76} $"
      )}
      {parseAndRenderMath(
        "$ h = 2,4cm $"
      )}
      {parseAndRenderMath(
        "$ b^2 = a \\cdot m $"
      )}
      {parseAndRenderMath(
        "$ b^2 = 5 \\cdot 3,2 $"
      )}
      {parseAndRenderMath(
        "$ b^2 = 16 $"
      )}
      {parseAndRenderMath(
        "$ b = \\sqrt{16} $"
      )}
      {parseAndRenderMath(
        "$ b = 4cm $"
      )}
      {parseAndRenderMath(
        "$ c^2 = a \\cdot n $"
      )}
      {parseAndRenderMath(
        "$ c^2 = 5 \\cdot 1,8 $"
      )}
      {parseAndRenderMath(
        "$ c^2 = 9 $"
      )}
      {parseAndRenderMath(
        "$ c = \\sqrt{9} $"
      )}
      {parseAndRenderMath(
        "$ c = 3cm $"
      )}
    </View>,

    <View key="Calculando a Area de Algumas Figuras Geometricas">
      <Text style={styles.titulo2}>7.4 Calculando a área de algumas figuras geométricas</Text>
      {parseAndRenderMath(
        "Vamos relembrar como se calcular as áreas de algumas figuras geométricas."
      )}
      <Image
        source={require("@/app/(matematica)/(geometria)/area_retangulo_quadrado.png")}
        style={styles.image}
      />
      <Image
        source={require("@/app/(matematica)/(geometria)/area_triangulo.png")}
        style={styles.image}
      />
      <Image
        source={require("@/app/(matematica)/(geometria)/area_trapezio.png")}
        style={styles.image}
      />
      <Image
        source={require("@/app/(matematica)/(geometria)/area_circulo.png")}
        style={styles.image}
      />
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
    <LinearGradient style={styles.container} colors={[Colors.gradientStart, Colors.gradientStart, Colors.gradientEnd]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/(matematica)/(geometria)/geometria")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>MATERIAL TEÓRICO</Text>
          <Text style={styles.headerSubtitle}>Geometria</Text>
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
  backButton: { right: 40, },
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