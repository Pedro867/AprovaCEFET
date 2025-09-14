import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Fonts } from "@/constants/Colors";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TeoriaConjuntosScreen() {
  const [page, setPage] = useState(0);
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

  //estilos aq pq n ta reconhecendo deixar dps do codigo de renderizar
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

  // -- CONTEUDO DAS PAGINAS --
  const paginasDeConteudo = [
    //PAGINA 1
    <View key="Conceitos primitivos">
      <Text style={styles.titulo2}>1.1 Conceitos Primitivos</Text>
      {parseAndRenderMath(
        "Um conjunto é uma coleção não-ordenada de objetos, a ordem na qual os elementos são escritos não importa; portanto {violeta, mostarda, vermelho}, denota o mesmo conjunto que {mostarda, vermelho, violeta}. Além disso, cada elemento de um conjunto é listado apenas uma vez; seria redundante listá-los mais do que uma única vez."
      )}
      {parseAndRenderMath(
        "Usamos letras maiúsculas para denotarem conjuntos e o símbolo $\\in$ para denotar que um elemento pertence ao conjunto. Portanto, $a \\in A$ significa que $a$ é um elemento, ou membro, do conjunto  $A$ e     $b  \\notin A$ significa que o objeto    $b$ não é um elemento do conjunto   $A$. Usamos chaves para indicar conjuntos."
      )}

      <Text style={styles.titulo3}>Exemplo 1.1</Text>
      {parseAndRenderMath("$A = \\{1, 2, 3\\}$")}
      {parseAndRenderMath(
        'Dois conjuntos são **iguais** se contêm os mesmos elementos. (Em uma definição, "se" significa, na verdade, "se, e somente se", portanto dois conjuntos são iguais se, e somente se, eles contêm os mesmos elementos.)'
      )}

      <Text style={styles.titulo3}>Exemplo 1.2</Text>
      {parseAndRenderMath(
        "$A = \\{1, 2\\}$ e    $B = \\{2, 1\\}$, então $A = B$."
      )}
      {parseAndRenderMath(
        "Podemos representar um conjunto por meio de uma **propriedade**."
      )}

      <Text style={styles.titulo3}>Exemplo 1.3</Text>
      {parseAndRenderMath(
        "Sendo $\\mathbb{N} = \\{0, 1, 2, ..., 10, 11, ...\\}$ o conjunto dos números naturais, quais são os elementos do conjunto $A = \\{x \\in \\mathbb{N} | 2x + 5 \\le 17\\}$ ?"
      )}
      {parseAndRenderMath(
        "$2x + 5 \\le 17 \\Rightarrow 2x \\le 17 - 5 \\Rightarrow 2x \\le 12 \\Rightarrow x \\le 6$"
      )}
      {parseAndRenderMath(
        "Tem-se então que  $x \\le 6$ e, portanto, $A = \\{0, 1, 2, 3, 4, 5, 6\\}$."
      )}
      {parseAndRenderMath(
        "Podemos notar que, primeiramente o conjunto A foi representado por uma propriedade, que nos levou a descrever todos os elementos do referido conjunto. Também destacamos que o conjunto  $\\mathbb{N}$ , neste exemplo, é chamado de **conjunto universo**. Um conjunto universo é o conjunto ao qual pertencem todos os elementos que podemos utilizar no problema."
      )}

      <Text style={styles.titulo3}>Exemplo 1.4</Text>
      {parseAndRenderMath(
        "Quais são os elementos do conjunto $B = \\{x \\in \\mathbb{N} | x + 2 \\le 1\\}$ ?"
      )}
      {parseAndRenderMath(
        "$x + 2 \\le 1 \\Rightarrow x \\le 1 - 2 \\Rightarrow x \\le -1$"
      )}
      {parseAndRenderMath(
        "Podemos reparar que não há   $x \\in \\mathbb{N}$ que satisfaz a propriedade, logo o conjunto B não possui nenhum elemento. Denominamos tal conjunto de conjunto vazio e denotamos $\\{\\}$ por $\\emptyset$."
      )}
    </View>,

    //PAGINA 2
    <View key="Conjuntos numericos">
      <Text style={styles.titulo2}>1.2 Conjuntos numéricos</Text>
      <Text style={styles.titulo3}>1.2.1 Conjunto dos números naturais</Text>
      {parseAndRenderMath(
        "Chama-se conjunto dos números naturais o conjunto formado pelos números 0, 1, 2, 3, ... e denotamos por $\\mathbb{N}$."
      )}
      {parseAndRenderMath("$\\mathbb{N} = \\{0, 1, 2, 3, ...\\}$")}

      <Text style={styles.titulo3}>1.2.2 Conjunto dos números inteiros</Text>
      {parseAndRenderMath(
        "Chama-se conjunto dos números inteiros o conjunto formado pelos números ..., -2, -1, 0, 1, 2, 3, ... e denotamos por $\\mathbb{Z}$."
      )}
      {parseAndRenderMath("$\\mathbb{Z} = \\{..., -2, -1, 0, 1, 2, 3, ...\\}$")}

      <Text style={styles.titulo3}>1.2.3 Conjunto dos números racionais</Text>
      {parseAndRenderMath(
        "Chama-se conjunto dos números racionais o conjunto formado pelos números que podem ser expressos por $\\frac{a}{b}$ onde  $a,b \\in \\mathbb{Z}$ e   $b \\neq 0$. Iremos denotar o conjunto por $\\mathbb{Q}$."
      )}

      <Text style={styles.titulo3}>Exemplo 1.5</Text>
      {parseAndRenderMath(
        "Os números  $-\\frac{5}{1} = -5$ ,    $\\frac{2}{5} = 0,4$ e $-\\frac{1}{3} = -0,3333...$ são exemplos de números racionais."
      )}
      {parseAndRenderMath(
        "Destacamos que o número   $\\frac{2}{5} = 0,4$ é chamado de **decimal exato**. Já o número $-\\frac{1}{3} = -0,3333...$ chamamos de **dízima periódica**."
      )}

      <Text style={styles.titulo3}>Exemplo 1.6</Text>
      {parseAndRenderMath(
        "Vamos obter uma representação decimal para os números: a) $\\frac{3}{16}$ b) $\\frac{4}{9}$"
      )}
      {parseAndRenderMath(
        "Dividindo 3 por 16 obtemos 0,1875 que é a representação decimal do número $\\frac{3}{16}$. Já a divisão de 4 por 9 obtemos 0,4444... que é a representação decimal do número $\\frac{4}{9}$."
      )}
      {parseAndRenderMath(
        "Uma vez entendido o exemplo acima, é fácil concluir que todo número racional pode ser expresso por um decimal exato ou por uma dízima periódica."
      )}

      <Text style={styles.titulo3}>Exemplo 1.7</Text>
      {parseAndRenderMath(
        "Queremos representar os seguintes números por frações, essas frações são chamadas de frações geratrizes:"
      )}
      {parseAndRenderMath("a) $ -1,234 = -\\frac{1234}{1000} $")}
      {parseAndRenderMath(
        "b) $ 5,64444... = \\frac{564 - 56}{90} = \\frac{508}{90} $"
      )}
      {parseAndRenderMath(
        "c) $ 5,6454545... = \\frac{5645 - 56}{990} = \\frac{5589}{990} $"
      )}
      {parseAndRenderMath(
        "Com estes exemplos, podemos perceber que toda dízima periódica é um número racional. Existem dízimas não-periódicas. Essas dízimas são os números irracionais."
      )}

      <Text style={styles.titulo3}>1.2.4 Conjunto dos números irracionais</Text>
      {parseAndRenderMath(
        "O conjunto será denotado por      $\\mathbb{I}$. O conjunto dos números irracionais é constituído pelas dízimas não-periódicas. Como exemplos de números irracionais, podemos citar:"
      )}
      {parseAndRenderMath("$\\pi = 3,1415926535...$")}
      {parseAndRenderMath("$\\sqrt{2} = 1,4142135623...$")}
      {parseAndRenderMath("$\\sqrt{3} = 1,7320508075...$")}

      <Text style={styles.titulo3}>1.2.5 Conjunto dos números reais</Text>
      {parseAndRenderMath(
        "A reunião do conjunto dos números irracionais com o dos racionais é o conjunto dos números reais que denotamos por $\\mathbb{R}$."
      )}
      {parseAndRenderMath("$\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}$")}
      {parseAndRenderMath(
        "Os conjuntos numéricos podem ser representados esquematicamente pela Figura 1.1"
      )}

      <View style={styles.imageView}>
        <Image
          source={require("@/app/(matematica)/(conjuntos)/fig1.1.png")}
          style={styles.image}
        ></Image>
      </View>
      <Text style={styles.imageSubtitle}>
        Figura 1.1: Representação dos conjuntos numéricos.
      </Text>
    </View>,

    //PAGINA 3
    <View key="Aritmetica dos inteiros">
      <Text style={styles.titulo2}>1.3 Aritmética dos inteiros</Text>
      {parseAndRenderMath(
        "Nesta seção, vamos relembrar como escrever um número inteiro na sua forma fatorada, calcular o Mínimo Múltiplo Comum e o Máximo Divisor Comum entre números inteiros. Vejamos estes conceitos por meio de exemplos."
      )}

      <Text style={styles.titulo3}>Exemplo 1.8</Text>
      {parseAndRenderMath("Qual a forma fatorada de 528?")}
      {parseAndRenderMath("Resolução:")}
      <View style={styles.fatoracaoContainer}>
        <Text style={styles.preFormattedText}>
          {"528 | 2\n264 | 2\n132 | 2\n 66 | 2\n 33 | 3\n 11 | 11\n  1 |"}
        </Text>
        <Text style={styles.fatoracaoSeta}>{"=>"}</Text>
        <MathJaxSvg color="#333" fontSize={tamanhoMathJax}>
          {"$2^4 \\cdot 3^1 \\cdot 11^1$"}
        </MathJaxSvg>
      </View>

      <Text style={styles.titulo3}>Exemplo 1.9</Text>
      {parseAndRenderMath("Quantos divisores possui o número 528?")}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath(
        "A forma fatorada do número 528 é $2^4 \\cdot 3^1 \\cdot 11^1$ como vimos no exemplo anterior. Portanto, para encontrarmos o número de divisores de 528 vamos proceder da seguinte forma:"
      )}
      {parseAndRenderMath(
        "$(4+1) \\cdot (1+1) \\cdot (1+1) = 5 \\cdot 2 \\cdot 2 = 20 $"
      )}
      {parseAndRenderMath("divisores positivos.")}
      {parseAndRenderMath(
        "Sendo $p_1^{\\alpha_1}, p_2^{\\alpha_2}, \\dots, p_n^{\\alpha_n}$ a forma fatorada de um número natural n, pode-se concluir que o número de divisores positivos de n é $(\\alpha_1+1)(\\alpha_2+1)\\dots(\\alpha_n+1)$."
      )}

      <Text style={styles.titulo3}>Exemplo 1.10</Text>
      {parseAndRenderMath(
        "Qual é o mínimo múltiplo comum entre os números 20 e 55?"
      )}
      {parseAndRenderMath("Resolução:")}
      <View style={styles.fatoracaoContainer}>
        <Text style={styles.preFormattedText}>
          {"20, 55 | 2\n10, 55 | 2\n 5, 55 | 5\n 1, 11 | 11\n 1, 1  |"}
        </Text>
        <Text style={styles.fatoracaoSeta}>{"=>"}</Text>
        <MathJaxSvg color="#333" fontSize={tamanhoMathJax}>
          {"$2 \\cdot 2 \\cdot 5 \\cdot 11 = 220$"}
        </MathJaxSvg>
      </View>
      {parseAndRenderMath("Portanto, $mmc(20, 55) = 220$.")}

      <Text style={styles.titulo3}>Exemplo 1.11</Text>
      {parseAndRenderMath(
        "Qual é o máximo divisor comum entre os números 20 e 60?"
      )}
      {parseAndRenderMath("Resolução:")}
      <View style={styles.fatoracaoContainer}>
        <Text style={styles.preFormattedText}>
          {"20, 60 | 2\n10, 30 | 2\n 5, 15 | 3\n 5,  5 | 5\n 1,  1 |"}
        </Text>
        <Text style={styles.fatoracaoSeta}>{"=>"}</Text>
        <MathJaxSvg color="#333" fontSize={tamanhoMathJax}>
          {"$2 \\cdot 2 \\cdot 5 = 20$"}
        </MathJaxSvg>
      </View>
      {parseAndRenderMath("Portanto, $mdc(20, 60) = 20$.")}
      {parseAndRenderMath(
        "Podemos resolver muitos problemas utilizando o mínimo múltiplo comum e o máximo divisor comum de números inteiros, como vamos apresentar nos dois exemplos a seguir:"
      )}

      <Text style={styles.titulo3}>Exemplo 1.12</Text>
      {parseAndRenderMath(
        "De um aeroporto, partem todos os dias, 3 aviões que fazem rotas internacionais. O primeiro avião faz a rota de ida e volta em 4 dias, o segundo em 5 dias e o terceiro em 10 dias. Se num certo dia os três aviões partem simultaneamente, depois de quantos dias esses aviões partirão novamente no mesmo dia?"
      )}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath(
        "Para resolvermos esse problema, basta encontrar o $mmc(4, 5, 10)$."
      )}
      <View style={styles.fatoracaoContainer}>
        <Text style={styles.preFormattedText}>
          {"4, 5, 10| 2\n2, 5, 5 | 2\n1, 5, 5 | 5\n1, 1, 1 |"}
        </Text>
        <Text style={styles.fatoracaoSeta}>{"=>"}</Text>
        <MathJaxSvg color="#333" fontSize={tamanhoMathJax}>
          {"$2 \\cdot 2 \\cdot 5 = 20$"}
        </MathJaxSvg>
      </View>
      {parseAndRenderMath(
        "Portanto, esses aviões partirão novamente no mesmo dia daqui 20 dias."
      )}

      <Text style={styles.titulo3}>Exemplo 1.13</Text>
      {parseAndRenderMath(
        "Um terreno retangular de 221 m por 117 m será cercado. Em toda a volta deste cercado serão plantadas árvores igualmente espaçadas. Qual o maior espaço possível entre as árvores?"
      )}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath(
        "Neste problema, queremos dividir no maior número possível, então basta encontrarmos o $mdc(221, 117)$."
      )}
      <View style={styles.fatoracaoContainer}>
        <Text style={styles.preFormattedText}>
          {"221, 117| 13\n 17, 9  | 9\n 17, 1  | 17\n  1, 1  |"}
        </Text>
        <Text style={styles.fatoracaoSeta}>{"=> 13"}</Text>
      </View>
      {parseAndRenderMath(
        "Portanto, o maior espaço possível entre as árvores será 13 m."
      )}
      {parseAndRenderMath(
        "Observação: Dois números inteiros quaisquer são ditos **primos entre si** se, e somente se, o seu mdc for 1, ou seja, se o único divisor comum entre eles for o 1. Por exemplo, 6 e 25 são números primos entre si."
      )}
    </View>,
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
          onPress={() => router.replace("/(matematica)/(conjuntos)/conjuntos")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>MATERIAL TEÓRICO</Text>
          <Text style={styles.headerSubtitle}>Conjuntos</Text>
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
}
