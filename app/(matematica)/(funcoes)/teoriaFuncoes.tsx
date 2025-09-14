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
    // A regex agora busca por fórmulas ($...$) ou texto em negrito (**...**) ou cifrão (\\$)
    const parts = text.split(/(\$[^\$]+\$|\*\*[^\*]+\*\*|\\\$)/);

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
          if (part === "\\$") {
            // Retorna o cifrão como texto normal
            return "$";
          }
          return part;
        })}
      </Text>
    );
  };

  const paginasDeConteudo = [

    <View key="A nocao de funcao">
      <Text style={styles.titulo2}>5.1 A noção de função</Text>
      {parseAndRenderMath(
        "Com bastante frequência, encontramos situações que envolvem relações entre duas grandezas variáveis. Consideremos duas situações:"
      )}
      {parseAndRenderMath(
        "**1ª:** Uma caneta custa R\\$ 30,00. Se representamos por $x$ o número dessas canetas que queremos comprar e por $y$ o preço correspondente a pagar, em reais, podemos ter a seguinte sentença:"
      )}
      {parseAndRenderMath("$y = 30x$")}
      {parseAndRenderMath(
        "Onde o preço $y$ a pagar é dado em função do número $x$ de canetas. A sentença acima é chamada lei de formação da função."
      )}
      {parseAndRenderMath(
        "**2ª:** Márcia ligou seu computador à rede internacional de computadores Internet. Para fazer uso dessa rede, ela paga uma mensalidade fixa de R\\$ 30,00 mais 15 centavos a cada minuto de uso. O valor a ser pago por Márcia ao final do mês depende, então, do tempo que ela gasta acessando a internet. Podemos estabelecer uma relação entre o tempo de utilização da rede ($x$) e o valor a ser pago ($y$) por Márcia, formando a seguinte função:"
      )}
      {parseAndRenderMath("$y = 30 + 0,15x$")}
      <Text style={styles.titulo3}>5.1.1 A função como relação entre dois conjuntos</Text>
      {parseAndRenderMath(
        "Sendo $A$ e $B$ dois conjuntos não-vazios, uma relação entre $A$ e $B$ é chamada função quando a cada elemento $x$ do conjunto $A$ está associado um **único** elemento $y$ do conjunto $B$."
      )}

      <Text style={styles.titulo3}>Exemplo 5.1</Text>
      {parseAndRenderMath(
        "Sejam os conjuntos $A = \\{-2, -1, 0, 1, 2\\}$, $B = \\{y \\in \\mathbb{Z} | -5 \\le y \\le 3\\}$ e uma relação entre $A$ e $B$ expressa pela lei de formação $y = 2x - 1$, com $x \\in A$ e $y \\in B$. Podemos visualizar a representação dessa relação pelo diagrama de flechas (Figura 5.1)."
      )}
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(matematica)/(funcoes)/5.1.png")}
          style={styles.image}
        ></Image>
      </View>
      {parseAndRenderMath(
        "Neste exemplo, o conjunto $A = \\{-2, -1, 0, 1, 2\\}$ é chamado de **domínio** da função e o conjunto $B = \\{-5, -4, -3, -2, -1, 0, 1, 2, 3\\}$ é o **contradomínio** da função."
      )}
      {parseAndRenderMath(
        "Note que os valores da variável $y$ que correspondem a um determinado valor de $x$ é chamado de **conjunto imagem** da função, que neste exemplo é o conjunto $Im = \\{-5, -3, -1, 1, 3\\}$."
      )}
    </View>,

    <View key="Funcao de 1o grau">
      <Text style={styles.titulo2}>5.2 Função do 1º grau</Text>
      {parseAndRenderMath(
        "Uma função é chamada de 1º grau quando é definida pela fórmula matemática $y = ax + b$, com $a, b \\in \\mathbb{R}$ e $a \\neq 0$. Observemos alguns exemplos que envolvem funções de 1º grau."
      )}

      <Text style={styles.titulo3}>Exemplo 5.2</Text>
      {parseAndRenderMath(
        "Dada a função definida por $f(x) = -7x + 5$, determinar a imagem do número real -3."
      )}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath(
        "Determinar a imagem do número $-3$ é o mesmo que encontrar $f(-3)$. Assim temos, $f(-3) = -7 \\cdot (-3) + 5 = 21 + 5 = 26$. Logo, 26 é a imagem do número -3 pela função."
      )}

      <Text style={styles.titulo3}>Exemplo 5.3</Text>
      {parseAndRenderMath(
        "Dada a função $y = 5 - 4x$, qual é o número real $x$ cuja imagem pela função é $\\frac{1}{10}$."
      )}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath(
        "Para encontrarmos o número $x$ que tem imagem $\\frac{1}{10}$ basta fazermos"
      )}
      {parseAndRenderMath("$f(x) = \\frac{1}{10}$")}
      {parseAndRenderMath("$5 - 4x = \\frac{1}{10}$")}
      {parseAndRenderMath("$\\frac{50 - 40x}{10} = \\frac{1}{10}$")}
      {parseAndRenderMath("$50 - 40x = 1$")}
      {parseAndRenderMath("$-40x = 1 - 50$")}
      {parseAndRenderMath("$-40x = -49$")}
      {parseAndRenderMath("$x = \\frac{49}{40}$")}
      {parseAndRenderMath("Logo, o número real procurado é $\\frac{49}{40}$." )}

      <Text style={styles.titulo3}>5.2.1 Gráfico da função do 1º grau</Text>
      <Text style={styles.titulo3}>Exemplo 5.4</Text>
      {parseAndRenderMath(
        "Vamos fazer o esboço do gráfico da função $y = 2x - 3$. Inicialmente, elaboramos uma tabela:"
      )}
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(matematica)/(funcoes)/tabela1.png")}
          style={styles.image}
        ></Image>
      </View>
      {parseAndRenderMath(
        "Em seguida, marcamos esses pontos no plano cartesiano e construímos uma reta."
      )}
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(matematica)/(funcoes)/5.2.png")}
          style={styles.image}
        ></Image>
      </View>
      {parseAndRenderMath("**Observações:**")}
      {parseAndRenderMath("**•** O gráfico de uma função do 1º grau é sempre uma **reta**.")}
      {parseAndRenderMath(
        "**•** O gráfico da função $y = ax + b$ intercepta o eixo $y$ no valor de $b$. Observe que no Exemplo 5.4, a reta intercepta o eixo $y$ em $-3$ ($b = -3$). "
      )}
      {parseAndRenderMath(
        "**•** A raiz de uma função, ou zero da função, é o valor onde a reta intercepta o eixo $x$. Para encontrarmos a raiz de uma função $y = ax + b$, basta igualarmos a função a zero e determinarmos o valor de $x$. Vamos encontrar a raiz da função $y = 2x - 3$ do Exemplo 5.4. Então, $2x - 3 = 0 \\Rightarrow 2x = 3 \\Rightarrow x = \\frac{3}{2} = 1,5$. Portanto, $\\frac{3}{2}$ é onde a reta intercepta o eixo $x$."
      )}
      {parseAndRenderMath(
        "**•** Na função $y = ax + b$, se $a > 0$ temos uma função **crescente**. Caso $a < 0$ a função é dita **decrescente**."
      )}
    </View>,

    //PAGINA 12
    <View key="Funcao 2o grau">
      <Text style={styles.titulo2}>5.3 Função do 2º grau</Text>
      {parseAndRenderMath(
        "Uma função é dita do 2º grau quando é definida pela fórmula matemática $f(x) = ax^2 + bx + c$, com $a \\neq 0$."
      )}
      {parseAndRenderMath(
        "Vamos estudar as características de uma função do 2º grau através de alguns exemplos."
      )}
      <Text style={styles.titulo3}>Exemplo 5.5</Text>
      {parseAndRenderMath("Façamos o esboço da função $f(x) = x^2 - 1$." )}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath(
        "Inicialmente, vamos encontrar as raízes da função. Para isto, igualamos a função a zero. Logo temos,"
      )}
      {parseAndRenderMath("$ x^2 - 1 = 0 $")}
      {parseAndRenderMath("$ x^2 = 1 $")}
      {parseAndRenderMath("$ x = \\pm\\sqrt{1} $")}
      {parseAndRenderMath("$ x = \\pm 1 $")}
      {parseAndRenderMath(
        "Assim, $-1, +1$ são as raízes da função $f(x) = x^2 - 1$, ou seja, o gráfico da função intercepta o eixo $x$ em $-1$ e $+1$."
      )}
      {parseAndRenderMath(
        "O gráfico de uma função do 2º grau é sempre uma **parábola**. Ela possui um **vértice** $(V(x_v, y_v))$ que é determinado pelas seguintes fórmulas:"
      )}
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(matematica)/(funcoes)/tabela2.png")}
          style={styles.image}
        ></Image>
      </View>
      {parseAndRenderMath("Vamos determinar o vértice da função $f(x) = x^2 - 1$." )}
      {parseAndRenderMath(
        "$ \\Delta = b^2 - 4ac = 0^2 - 4 \\cdot (1) \\cdot (-1) = 4 $"
      )}
      {parseAndRenderMath("$ x_v = -\\frac{0}{2 \\cdot 1} = 0 $")}
      {parseAndRenderMath("$ y_v = -\\frac{4}{4 \\cdot 1} = -1 $")}
      {parseAndRenderMath(
        "Portanto, o vértice da função $f(x) = x^2 - 1$ é $V(0, -1)$."
      )}
      {parseAndRenderMath(
        "O gráfico da função do 2º grau, intercepta o eixo $y$ em $c$, logo o gráfico da função $f(x) = x^2 - 1$, vai interceptar o eixo $y$ em -1."
      )}
      {parseAndRenderMath(
        "Também vale destacar que: Se $a > 0$, a parábola tem concavidade voltada para cima, se $a < 0$, a concavidade é voltada para baixo. Assim, no exemplo em questão, como $a = 1 > 0$, a concavidade da parábola será voltada para cima. Logo, o esboço do gráfico da função está representado na Figura 5.3."
      )}
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(matematica)/(funcoes)/5.3.png")}
          style={styles.image}
        ></Image>
      </View>
      {parseAndRenderMath(
        "Observando o gráfico dessa função (Figura 5.3), podemos notar que ela possui um **valor mínimo**. Para calculá-lo, basta encontrar o $y_v$."
      )}
      <Text style={styles.titulo3}>Exemplo 5.6</Text>
      {parseAndRenderMath(
        "Determine as raízes, o vértice e faça o esboço do gráfico da função $f(x) = -x^2 + 3x - 2$."
      )}
      {parseAndRenderMath("Resolução:")}
      {parseAndRenderMath("Determinando as raízes:")}
      {parseAndRenderMath("$ -x^2 + 3x - 2 = 0 $")}
      {parseAndRenderMath(
        "Logo, $a = -1, b = 3$ e $c = -2$. Assim,"
      )}
      {parseAndRenderMath("$ \\Delta = 3^2 - 4 \\cdot (-1) \\cdot (-2) = 9 - 8 = 1 $")}
      {parseAndRenderMath(
        "$ x = \\frac{-3 \\pm \\sqrt{1}}{2 \\cdot (-1)} = \\frac{-3 \\pm 1}{-2} $"
      )}
      {parseAndRenderMath("$ x' = 1 \\text{ e } x'' = 2 $")}
      {parseAndRenderMath(
        "Portanto as raízes da função $f(x) = -x^2 + 3x - 2$ são, 1 e 2."
      )}
      {parseAndRenderMath("Determinando o vértice:")}
      {parseAndRenderMath(
        "$ x_v = \\frac{-3}{2 \\cdot (-1)} = \\frac{3}{2} = 1,5 $"
      )}
      {parseAndRenderMath(
        "$ y_v = \\frac{-1}{4 \\cdot (-1)} = \\frac{1}{4} = 0,25 $"
      )}
      {parseAndRenderMath(
        "Assim, como na função $f(x) = -x^2 + 3x - 2, a < 0$, a concavidade da parábola é para baixo, ela possui um valor máximo que é $y_v = 0,25$."
      )}
      {parseAndRenderMath(
        "Também destacamos que o gráfico intercepta o eixo $y$ em $c = -2$. Com estes valores, podemos fazer o esboço do gráfico da função."
      )}
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(matematica)/(funcoes)/5.4.png")}
          style={styles.image}
        ></Image>
      </View>
      {parseAndRenderMath(
        "Nestes dois exemplos podemos notar que $\\Delta > 0$, ou seja, que as funções possuem duas raízes reais diferentes. Vejamos um exemplo onde $\\Delta = 0$ (duas raízes reais iguais) e um exemplo onde $\\Delta < 0$ (não possui raízes reais)."
      )}
      <Text style={styles.titulo3}>Exemplo 5.7</Text>
      {parseAndRenderMath("Consideremos a função $g(x) = x^2 - 2x + 1$." )}
      {parseAndRenderMath("Notemos que,")}
      {parseAndRenderMath(
        "$ \\Delta = (-2)^2 - 4 \\cdot (1) \\cdot (1) = 0 $"
      )}
      {parseAndRenderMath(
        "Logo, a função possui raízes reais iguais. Vamos determiná-las:"
      )}
      {parseAndRenderMath("$ x = \\frac{-(-2) \\pm \\sqrt{0}}{2 \\cdot 1} = \\frac{2 \\pm 0}{2} = 1 $")}
      {parseAndRenderMath(
        "Assim, o gráfico da função $g(x) = x^2 - 2x + 1$ intercepta o eixo $x$ em apenas um ponto, como podemos observar na Figura 5.5."
      )}
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(matematica)/(funcoes)/5.5.png")}
          style={styles.image}
        ></Image>
      </View>
      <Text style={styles.titulo3}>Exemplo 5.8</Text>
      {parseAndRenderMath("Consideremos agora a função $f(x) = x^2 - x + 1$." )}
      {parseAndRenderMath("Notemos que,")}
      {parseAndRenderMath(
        "$ \\Delta = (-1)^2 - 4 \\cdot 1 \\cdot 1 = -3 < 0 $"
      )}
      {parseAndRenderMath(
        "Portanto a função $f(x) = x^2 - x + 1$ não admite raízes reais, logo seu gráfico não intercepta o eixo $x$ como podemos observar na Figura 5.6."
      )}
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(matematica)/(funcoes)/5.6.png")}
          style={styles.image}
        ></Image>
      </View>
      {parseAndRenderMath(
        "Para finalizarmos nossos estudos de função do 2º grau, vamos resolver dois problemas:"
      )}
      <Text style={styles.titulo3}>Exemplo 5.9</Text>
      {parseAndRenderMath(
        "Qual a função representada pela parábola abaixo?"
      )}
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(matematica)/(funcoes)/5.7.png")}
          style={styles.image}
        ></Image>
      </View>
      <Text style={styles.titulo3}>Exemplo 5.10</Text>
      {parseAndRenderMath(
        "Um muro será usado como um dos lados de um galinheiro retangular, conforme a Figura 5.8. Para os outros lados será usado um rolo de 25 metros de tela de arame. Determinar quais devem ser as dimensões do galinheiro para que sua área seja máxima."
      )}
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(matematica)/(funcoes)/5.8.png")}
          style={styles.image}
        ></Image>
      </View>
      {parseAndRenderMath(
        "Sendo as dimensões do galinheiro $x$ e $y$, temos"
      )}
      {parseAndRenderMath("$ x + 2y = 25 $")}
      {parseAndRenderMath(
        "Isolando $x$, temos a seguinte equação: $x = 25 - 2y$."
      )}
      {parseAndRenderMath(
        "A área do galinheiro será igual a $A = x \\cdot y$. Substituindo o $x = 25 - 2y$ obtemos a seguinte função:"
      )}
      {parseAndRenderMath("$ A = x \\cdot y $")}
      {parseAndRenderMath("$ A = (25 - 2y) \\cdot y $")}
      {parseAndRenderMath("$ A = 25y - 2y^2 $")}
      {parseAndRenderMath(
        "É fácil concluir que a área será máxima para"
      )}
      {parseAndRenderMath("$ y = \\frac{-25}{2 \\cdot (-2)} = \\frac{-25}{-4} = 6,25 $")}
      {parseAndRenderMath("E assim temos,")}
      {parseAndRenderMath(
        "$ x = 25 - 2y = 25 - 2 \\cdot (6,25) = 12,5 $"
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
    <LinearGradient style={styles.container} colors={[Colors.gradientStart, Colors.gradientStart, Colors.gradientEnd]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/(matematica)/(funcoes)/funcoes")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>MATERIAL TEÓRICO</Text>
          <Text style={styles.headerSubtitle}>Estudo das funções</Text>
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