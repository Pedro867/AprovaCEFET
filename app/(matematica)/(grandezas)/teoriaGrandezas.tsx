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
    <View key="Grandezas Proporcionais">
      <Text style={styles.titulo2}>6.1 Grandezas proporcionais</Text>
      <Text style={styles.titulo3}>6.1.1 Grandezas diretamente proporcionais</Text>
      {parseAndRenderMath(
        "Duas grandezas variáveis são diretamente proporcionais quando, aumentando ou diminuindo uma delas numa determinada razão, a outra aumenta ou diminui nessa mesma razão. As razões de cada elemento da primeira por cada elemento correspondente da segunda são iguais, ou seja, possuem o mesmo coeficiente de proporcionalidade."
      )}
      <Text style={styles.titulo3}>Exemplo 6.1</Text>
      {parseAndRenderMath(
        "Os números 3, 10 e 8 são diretamente proporcionais aos números 6, 20 e 16, nessa ordem, como podemos ver na seguinte proporção:"
      )}
      {parseAndRenderMath("$$ \\frac{3}{6} = \\frac{10}{20} = \\frac{8}{16} = \\frac{1}{2} $$")}
      <Text style={styles.titulo3}>6.1.2 Grandezas inversamente proporcionais</Text>
      {parseAndRenderMath(
        "Duas grandezas são inversamente proporcionais quando, aumentando ou diminuindo uma delas numa determinada razão, a outra diminui ou aumenta na mesma razão. As razões de cada elemento da primeira pelo inverso de cada elemento correspondente da segunda são iguais."
      )}
      <Text style={styles.titulo3}>Exemplo 6.2</Text>
      {parseAndRenderMath(
        "Os números 9,6 e 2 são inversamente proporcionais aos números 4, 6 e 18, nessa ordem, como podemos ver na seguinte proporção:"
      )}
      {parseAndRenderMath(
        "$$ \\frac{9}{\\frac{1}{4}} = \\frac{6}{\\frac{1}{6}} = \\frac{2}{\\frac{1}{18}} = 36 $$"
      )}
      {parseAndRenderMath("Que resulta em:")}
      {parseAndRenderMath("$$ 9 \\cdot 4 = 6 \\cdot 6 = 2 \\cdot 18 = 36 $$")}
      <Text style={styles.titulo3}>Exemplo 6.3</Text>
      {parseAndRenderMath(
        "Duas pessoas, **A** e **B**, trabalham numa determinada tarefa, sendo que **A** trabalhou durante 6 horas e **B** trabalhou durante 5 horas. Como elas irão dividir com justiça R$ 660,00 que serão pagos pela tarefa? Chamamos de $x$ o valor que **A** irá receber e $y$ o valor que **B** irá receber. Então, $x + y = 660$. A divisão dos R$ 660,00 será em partes **diretamente** proporcionais às horas trabalhadas, então temos:"
      )}
      {parseAndRenderMath("$$ \\frac{x}{6} = \\frac{y}{5} $$")}
      {parseAndRenderMath(
        "Aplicando as propriedades de proporção, vista nas séries anteriores, temos:"
      )}
      {parseAndRenderMath("$$ \\frac{x+y}{6+5} = \\frac{x}{6} = \\frac{y}{5} $$")}
      {parseAndRenderMath("$$ \\frac{660}{11} = \\frac{x}{6} = \\frac{y}{5} $$")}
      {parseAndRenderMath("Logo, temos duas equações a serem resolvidas,")}
      {parseAndRenderMath("$$ \\frac{660}{11} = \\frac{x}{6} \\hspace{1cm} e \\hspace{1cm} \\frac{660}{11} = \\frac{y}{5} $$")}
      {parseAndRenderMath("Resolvendo cada uma delas, encontramos os seguintes resultados:")}
      {parseAndRenderMath("$$ x = 360 \\hspace{1cm} e \\hspace{1cm} y = 300 $$")}
      {parseAndRenderMath(
        "Assim, a pessoa **A** irá receber R$ 360,00 enquanto a pessoa **B** irá receber R$ 300,00. Uma outra maneira de resolvermos este problema é somarmos os números inversos, $\\frac{1}{3} + \\frac{1}{5} = \\frac{5+3}{15} = \\frac{8}{15}$ partes, Logo, dividindo 660 por 11 temos"
      )}
      {parseAndRenderMath("$$ \\frac{660}{11} = 60 $$")}
      {parseAndRenderMath(
        "Assim, cada parte terá 60 reais. Sabendo que cada trabalhador receberá conforme as horas trabalhadas, então o trabalhador **A** irá receber $60 \\cdot 6 = 360$ e o trabalhador **B**,$60 \\cdot 5 = 300$."
      )}
      {parseAndRenderMath(
        "Vejamos agora como resolver problemas de divisão em partes inversamente proporcionais."
      )}
      <Text style={styles.titulo3}>Exemplo 6.4</Text>
      {parseAndRenderMath(
        "Duas pessoas **A** e **B** trabalham durante um mesmo período para fabricar e vender por R$ 160,00 um certo artigo. Se **A** chegou atrasada ao trabalho 3 dias e **B**, 5 dias, quanto cada uma irá receber? Chamamos de $x$ o valor que **A** irá receber e $y$ o valor que **B** irá receber. Então, $x + y = 160$. A divisão dos R$ 160,00 será em partes **inversamente** proporcionais aos dias de atraso, então temos:"
      )}
      {parseAndRenderMath("$$ \\frac{x}{\\frac{1}{3}} = \\frac{y}{\\frac{1}{5}} $$")}
      {parseAndRenderMath("Aplicando as propriedades de proporção, temos:")}
      {parseAndRenderMath("$$ \\frac{x+y}{\\frac{1}{3} + \\frac{1}{5}} = \\frac{x}{\\frac{1}{3}} = \\frac{y}{\\frac{1}{5}} $$")}
      {parseAndRenderMath("Ou ainda,")}
      {parseAndRenderMath("$$ \\frac{160}{\\frac{8}{15}} = \\frac{x}{\\frac{1}{3}} = \\frac{y}{\\frac{1}{5}} $$")}
      {parseAndRenderMath(
        "Assim temos as seguintes equações a serem resolvidas,"
      )}
      {parseAndRenderMath(
        "$$ \\frac{160}{\\frac{8}{15}} = \\frac{x}{\\frac{1}{3}} \\hspace{1cm} e \\hspace{1cm} \\frac{160}{\\frac{8}{15}} = \\frac{y}{\\frac{1}{5}} $$"
      )}
      {parseAndRenderMath("Resolvendo cada uma das equações acima, obtemos")}
      {parseAndRenderMath("$$ x = 100 \\hspace{1cm} e \\hspace{1cm} y = 60 $$")}
      {parseAndRenderMath("Portanto, **A** irá receber R$ 100,00 e **B** R$ 60,00.")}
      {parseAndRenderMath(
        "Uma outra maneira de resolvermos este problema é somarmos os números inversos, $\\frac{1}{3} + \\frac{1}{5} = \\frac{5+3}{15} = \\frac{8}{15}$ partes, Logo, dividindo 160 por $\\frac{8}{15}$ temos"
      )}
      {parseAndRenderMath("$$ \\frac{160}{\\frac{8}{15}} = 160 \\cdot \\frac{15}{8} = 20 \\cdot 15 = 300 $$")}
      {parseAndRenderMath(
        "Em seguida, multiplicamos 300 pelo número correspondente a cada número inverso, ou seja,"
      )}
      {parseAndRenderMath(
        "$$ \\frac{1}{3} \\text{ corresponde a } \\frac{5}{15} \\text{, portanto, } 300 \\cdot \\frac{1}{3} = 100 $$"
      )}
      {parseAndRenderMath(
        "$$ \\frac{1}{5} \\text{ corresponde a } \\frac{3}{15} \\text{, portanto, } 300 \\cdot \\frac{1}{5} = 60 $$"
      )}
      {parseAndRenderMath("Assim, **A** irá receber 100 reais e **B**, 60 reais.")}
      <Text style={styles.titulo3}>Exemplo 6.5</Text>
      {parseAndRenderMath(
        "Vamos dividir o número 130 em partes inversamente proporcionais a 2, 5 e 6, utilizando o método simplificado."
      )}
      {parseAndRenderMath("Primeiramente temos,")}
      {parseAndRenderMath("$$ \\frac{1}{2} + \\frac{1}{5} + \\frac{1}{6} = \\frac{15 + 6 + 5}{30} = \\frac{26}{30} $$")}
      {parseAndRenderMath("Em seguida, dividimos 130 em 26 partes, logo")}
      {parseAndRenderMath("$$ \\frac{130}{26} = 5 $$")}
      {parseAndRenderMath(
        "Agora, basta multiplicarmos 5 pelas partes correspondentes aos números inversos."
      )}
      {parseAndRenderMath(
        "$\\frac{1}{2}$ corresponde a $\\frac{15}{30}$, portanto, $5 \\cdot 15 = 75$."
      )}
      {parseAndRenderMath(
        "$\\frac{1}{5}$ corresponde a $\\frac{6}{30}$, portanto, $5 \\cdot 6 = 30$."
      )}
      {parseAndRenderMath(
        "$\\frac{1}{6}$ corresponde a $\\frac{5}{30}$, portanto, $5 \\cdot 5 = 25$."
      )}
    </View>,

    <View key="Regra de tres">
      <Text style={styles.titulo2}>6.2 Regra de três</Text>
      {parseAndRenderMath(
        "Vamos ver agora algumas resoluções de problemas utilizando a regra de três simples e a regra de três composta."
      )}
      <Text style={styles.titulo3}>Exemplo 6.6</Text>
      {parseAndRenderMath(
        "Cinco metros de um tecido custam 80 reais. Quanto pagarei por 9 metros do mesmo tecido?"
      )}
      {parseAndRenderMath("Primeiramente, montamos uma tabela com as variáveis do problema.")}
      {parseAndRenderMath("Comprimento (m) \\hspace{2cm} Preço (R$)")}
      {parseAndRenderMath("5 \\hspace{3cm} 80")}
      {parseAndRenderMath("9 \\hspace{3cm} x")}
      {parseAndRenderMath(
        "Podemos observar que, quanto mais se aumentar o comprimento, mais se aumenta o preço, portanto temos uma **regra de três direta**."
      )}
      {parseAndRenderMath("Logo,")}
      {parseAndRenderMath("$$ \\frac{5}{9} = \\frac{80}{x} $$")}
      {parseAndRenderMath("$$ 5x = 720 $$")}
      {parseAndRenderMath("$$ x = \\frac{720}{5} $$")}
      {parseAndRenderMath("$$ x = 144 $$")}
      {parseAndRenderMath("Assim, irei pagar pelos 9 metros do tecido, 144 reais.")}
      <Text style={styles.titulo3}>Exemplo 6.7</Text>
      {parseAndRenderMath(
        "Um carro percorre um trecho com velocidade de 60 km/h em 40 min. Se ele percorresse o mesmo trecho com uma velocidade de 80 km/h, quanto tempo gastaria?"
      )}
      {parseAndRenderMath("Montando a tabela temos,")}
      {parseAndRenderMath("Velocidade \\hspace{1cm} Tempo")}
      {parseAndRenderMath("60 \\hspace{1cm} 40")}
      {parseAndRenderMath("80 \\hspace{1cm} x")}
      {parseAndRenderMath(
        "Podemos observar que, quando a velocidade aumenta, o tempo diminui. Portanto, temos uma **regra de três inversa**."
      )}
      {parseAndRenderMath("Logo,")}
      {parseAndRenderMath("$$ \\frac{80}{60} = \\frac{40}{x} $$")}
      {parseAndRenderMath("$$ 80x = 2400 $$")}
      {parseAndRenderMath("$$ x = 30 $$")}
      {parseAndRenderMath("Assim, o carro irá gastar 30 minutos.")}
      <Text style={styles.titulo3}>Exemplo 6.8</Text>
      {parseAndRenderMath(
        "Três operários, trabalhando 6 dias, produzem 400 peças. Quantas peças, desse mesmo tipo, produzirão 7 operários, trabalhando 9 dias?"
      )}
      {parseAndRenderMath("Montando a tabela temos,")}
      {parseAndRenderMath("Operários \\hspace{0.5cm} Dias \\hspace{0.5cm} Peças")}
      {parseAndRenderMath("3 \\hspace{0.5cm} 6 \\hspace{0.5cm} 400")}
      {parseAndRenderMath("7 \\hspace{0.5cm} 9 \\hspace{0.5cm} x")}
      {parseAndRenderMath(
        "Neste exemplo, temos um problema de regra de três composta. Para resolvê-lo, basta verificarmos as grandezas que contêm o $x$ com as demais, para sabermos se são grandezas diretamente ou inversamente proporcionais. Vejamos:"
      )}
      {parseAndRenderMath(
        "Quando se aumenta o número de operários, o número de peças aumenta, portanto são diretamente proporcionais."
      )}
      {parseAndRenderMath(
        "Quando se aumenta os dias trabalhados, o número de peças aumenta, portanto são diretamente proporcionais."
      )}
      {parseAndRenderMath("Assim,")}
      {parseAndRenderMath("$$ \\frac{3 \\cdot 6}{7 \\cdot 9} = \\frac{400}{x} $$")}
      {parseAndRenderMath("$$ \\frac{18}{63} = \\frac{400}{x} $$")}
      {parseAndRenderMath("$$ 18x = 25200 $$")}
      {parseAndRenderMath("$$ x = 1400 $$")}
      {parseAndRenderMath("Logo, serão produzidas 1400 peças.")}
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
          onPress={() => router.replace("/(matematica)/(grandezas)/grandezas")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>MATERIAL TEÓRICO</Text>
          <Text style={styles.headerSubtitle}>Grandezas proporcionais e regra de três</Text>
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