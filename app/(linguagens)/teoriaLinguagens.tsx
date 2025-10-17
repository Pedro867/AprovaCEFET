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
  if (Platform.OS == 'web') {
    tamanhoMathJax = 2.5;
  }
  if (Platform.OS == 'android') {
    tamanhoMathJax = 17;
  }
  if (Platform.OS == 'ios') {
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
    <View key="Conceituacao de Texto">
      <Text style={styles.titulo2}>1 Linguagem, Língua e Variedade Regional</Text>
      <Text style={styles.titulo3}>1.1 Conceituação de Texto</Text>
      {parseAndRenderMath(
        "O texto é uma manifestação linguística produzida por alguém, em alguma situação concreta (contexto), com alguma intenção. Independentemente de sua extensão, o texto deve dar a sensação de completude, do contrário não será um texto."
      )}
      {parseAndRenderMath(
        "O texto é uma manifestação linguística produzida por alguém, em alguma situação concreta (contexto), com alguma intenção. Independentemente de sua extensão, o texto deve dar a sensação de completude, do contrário não será um texto."
      )}
      {parseAndRenderMath(
        "**Fatores pragmáticos1** - intencionalidade, aceitabilidade, situacionalidade, informatividade e intertextualidade - dizem respeito aos fatores contextuais que determinam os usos linguísticos nas situações de comunicação e contribuem para a construção do sentido do texto:"
      )}
      {parseAndRenderMath(
        "-> intencionalidade: é a manifestação da intenção, do objetivo do emissor numa determinada situação sociocomunicativa;"
      )}
      {parseAndRenderMath(
        "-> aceitabilidade: é a expectativa que o leitor manifesta de que o texto com que se defronta seja coerente, coeso, útil, relevante;"
      )}
      {parseAndRenderMath(
        "-> situacionalidade: pertinência e relevância do texto quanto ao contexto em que ocorre. Ela orienta tanto a produção quanto a recepção de textos;"
      )}
      {parseAndRenderMath(
        "-> informatividade: diz respeito à taxa de informação do texto. Ela depende da situação, do público, das intenções;"
      )}
      {parseAndRenderMath(
        "-> intertextualidade: refere-se ao diálogo entre textos. A produção e compreensão de textos dependem do conhecimento de outros textos."
      )}
      {/* COLOCAR POEMA */}
      {parseAndRenderMath(
        "Esse texto pode parecer um amontoado de palavras sem sentido se o leitor não perceber as intenções do autor, se não aceitá-lo como um texto coerente. Mas, para isso, ele deve ter em seu repertório a informação de que este texto refere-se a outro (dialoga com outro) do Romantismo brasileiro - Canção do exílio, de Gonçalves Dias - e dirige-se a leitores de um tempo moderno, caracterizado pela pressa, daí seu título."
      )}
      {parseAndRenderMath(
        "**Fator semântico conceitual** - dele depende a coerência do texto;"
      )}
      {parseAndRenderMath(
        "**Fator formal** - diz respeito à coesão textual (corresponde à superfície linguística do texto). Como você viu, um texto vai além de sua superfície linguística e pressupõe um comunicador atento a todas as suas dimensões. Em seguida, vamos tratar com maior profundidade os dois últimos fatores: o semântico conceitual e o formal."
      )}

      <Text style={styles.titulo2}>1.2 Coerência (ou fator semântico conceitual)</Text>
      {parseAndRenderMath(
        "A coerência é o resultado de processos cognitivos, relações de sentido, conhecimentos partilhados, condições operantes entre os usuários - emissor e destinatário - e não apenas um traço constitutivo dos textos. **Para ser coerente, um texto deve:** manter o mesmo tema; não ser contraditório; ter um valor de verdade que possa ser percebido e aceito por sua organização; trazer sempre uma informação nova."
      )}
      {parseAndRenderMath(
        "A realização da coerência condiciona-se à adequação entre os elementos cognitivos ativados pelas palavras e o universo de referência do texto."
      )}
      {parseAndRenderMath(
        "Veja este exemplo: Os leões subiram as montanhas geladas e puseram-se a perseguir a foca. Os esquimós os chamavam por seus nomes. As feras corriam sobre o gelo, protegendo-se com suas garras para não cair. Quando estavam prestes a alcançá-la, a foca alçou voo. (In: GUIMARÃES, Elisa. A articulação do texto. São Paulo: Ática, 1990. p. 39)"
      )}
      {parseAndRenderMath(
        "Se considerarmos o “mundo normal”, a incoerência do texto decorre da incompatibilidade entre aquilo que ele descreve e os fatos da realidade: os leões não habitam territórios gelados, os esquimós não se utilizam desses animais para caçadas, nem as focas voam. No entanto, inserido num contexto ficcional fantástico, o mesmo texto teria a coerência própria (o valor de verdade) desse tipo de contexto. Como se trata do “mundo normal”, teria de haver a consonância entre os referentes textual e externo (situacional) em que repousa a coerência."
      )}
      {parseAndRenderMath(
        "A coerência também é representada pela organização linear das sequências e pela ordenação temporal relativa aos fatos descritos. Nas seguintes frases, só a primeira é coerente:"
      )}
      {parseAndRenderMath(
        "A menina despediu-se da mãe, disse o dia da sua volta, tomou o táxi e partiu"
      )}
      {parseAndRenderMath(
        "A menina partiu, despediu-se da mãe, tomou o táxi e disse o dia da sua volta."
      )}

      <Text style={styles.titulo2}>1.3 Coesão (ou fator formal)</Text>
      {parseAndRenderMath(
        "A coesão, efeito da coerência, manifesta-se no plano linguístico e constrói-se por meio de mecanismos gramaticais e lexicais."
      )}
      {parseAndRenderMath(
        "-> **Mecanismos gramaticais:** o conhecimento da gramática nos auxilia a produzir textos coesos."
      )}
      {parseAndRenderMath(
        "Entre alguns dos recursos gramaticais que auxiliam a coesão estão os pronomes, conjunções, pontuação, crase, advérbios, a elipse, a concordância, a correlação entre os tempos verbais, a colocação das palavras na frase, a pontuação etc."
      )}
      {parseAndRenderMath(
        "-> **Mecanismos lexicais:** a coesão lexical se dá, entre outros processos, pela reiteração, pela substituição e pela expansão lexical."
      )}
      {parseAndRenderMath(
        "-> reiteração: repetição do mesmo item lexical;"
      )}
      {parseAndRenderMath(
        "-> substituição: inclui a sinonímia, a antonímia, a hiponímia e a hiperonímia e os nomes genéricos (coisa, negócio, gente, pessoa, lugar);"
      )}
      {parseAndRenderMath(
        "-> expansões lexicais: trazem para o texto novas informações sobre o termo substituído, marcando também o posicionamento ideológico do enunciador, pois as palavras não são neutras, manifestam intenções. Ex.: João Paulo II esteve em Varsóvia. Na capital da Polônia, o sumo Pontífice disse que a Igreja continua a favor do celibato clerical. // João Paulo II esteve em Varsóvia. Na cidade do odioso gueto, o mais recente aliado do capitalismo disse que a Igreja continua a favor dessa excrescência que é o celibato clerical."
      )}
      {parseAndRenderMath(
        "O texto abaixo, publicado na primeira página de um jornal de bairro da Zona Sul de São Paulo logo após os resultados do primeiro turno para eleição do prefeito da cidade, em 2000, exemplifica aspectos da coerência e coesão: “Os dois mais votados agora procuram adeptos para somarem votos. Na verdade àqueles que votaram no Alckmin e no Tuma, com certeza, vão votar no Maluf, pois pertencem a uma classe que não querem o comunismo ou, pelo menos, que o prefeito seja conduzido pelos princípios que regem as diretrizes do PT. Até na Rússia por terem sofrido barbaridades, impostas pelo sistema do comunismo, massacrante, autoritário, sem qualquer liberdade, o muro da vergonha foi derrubado, demonstrando a insatisfação de um povo sofredor, mas que mesmo assim até hoje sentem os reflexos do sistema.”"
      )}
      {parseAndRenderMath(
        "Esse texto não apresenta coerência porque não trata de um único assunto nem a informação da introdução foi desenvolvida (portanto não houve progressão semântica), houve, também, uma informação que contraria nosso conhecimento do mundo: o Muro da Vergonha ficava em Berlim (Alemanha) e não na Rússia. No plano linguístico, faltou-lhe coesão, pois a crase no àqueles não remete a nada e não há correlação entre os termos pertencem/ querem/ classe; terem sofrido/ sentem/ povo. No segundo período, terem sofrido não tem sujeito explícito, portanto o muro da vergonha é o sujeito dessa oração reduzida e o mas e o mesmo assim marcam uma relação que não existe. Conclusão: texto(?) mal-estruturado, que jamais deveria ter sido publicado."
      )}

      <Text style={styles.titulo2}>1.4 Relação Coerência, Coesão e Conjunções - Recapitulando Coerência e Coesão Texuais</Text>
      <Text style={styles.titulo3}>Coerência</Text>
      {parseAndRenderMath(
        "Um texto pode ser incoerente em ou para determinada situação se seu autor não consegue inferir um sentido ou uma ideia através da articulação de suas frases e parágrafos e por meio de recursos linguísticos (pontuação, vocabulário, etc.)."
      )}
      {parseAndRenderMath(
        "A coerência textual é a relação lógica entre as ideias, pois essas devem se complementar, é o resultado da não contradição entre as partes do texto."
      )}
      {parseAndRenderMath(
        "A coerência de um texto inclui fatores como o conhecimento que o produtor e o receptor têm do assunto abordado no texto, conhecimento de mundo, o conhecimento que esses têm da língua que usam e intertextualidade."
      )}
      {parseAndRenderMath(
        "Pode-se concluir que texto coerente é aquele do qual é possível estabelecer sentido; é entendido como um princípio de interpretabilidade."
      )}
      {parseAndRenderMath(
        "Veja o exemplo: “As crianças estão morrendo de fome por causa da riqueza do país.” “ Adoro sanduíche porque engorda.” As frases acima são contraditórias, não apresentam informações claras, portanto, são incoerentes."
      )}
      <Text style={styles.titulo3}>Coerência</Text>
      {parseAndRenderMath(
        "Coesão é a conexão, ligação, harmonia entre os elementos de um texto. Percebemos tal definição quando lemos um texto e verificamos que as palavras, as frases e os parágrafos estão entrelaçados, um dando continuidade ao outro. Os elementos de coesão determinam a transição de ideias entre as frases e os parágrafos. Observe a coesão presente no texto a seguir:"
      )}
      {parseAndRenderMath(
        "“Os sem-terra fizeram um protesto em Brasília contra a política agrária do país, **porque** consideram injusta a atual distribuição de terras. **Porém** o ministro da Agricultura considerou a manifestação um ato de rebeldia, **uma vez que** o projeto de Reforma Agrária pretende assentar milhares de sem-terra.” JORDÃO, R., BELLEZI C. Linguagens. São Paulo: Escala Educacional, 2007, p. 566"
      )}
      {parseAndRenderMath(
        "As palavras destacadas têm o papel de ligar as partes do texto, podemos dizer que elas são responsáveis pela coesão do texto."
      )}
      {parseAndRenderMath(
        "Há vários recursos que respondem pela coesão do texto, os principais são:"
      )}
      {parseAndRenderMath(
        "**Palavras de transição:** são palavras responsáveis pela coesão do texto, estabelecem a inter-relação entre os enunciados (orações, frases, parágrafos), são preposições, conjunções, alguns advérbios e locuções adverbiais. Ex.: A prática de atividade física é essencial ao nosso cotidiano. **Assim sendo**, quem a pratica possui uma melhor qualidade de vida."
      )}
      {parseAndRenderMath(
        "**Coesão por referência:** existem palavras que têm a função de fazer referência, são elas: Ex.: Marcela obteve uma ótima colocação no concurso. Tal resultado demonstra que **ela** se esforçou bastante para alcançar o objetivo que tanto almejava."
      )}
      {parseAndRenderMath(
        "**Coesão por substituição:** substituição de um nome (pessoa, objeto, lugar etc.), verbos, períodos ou trechos do texto por uma palavra ou expressão que tenha sentido próximo, evitando a repetição no corpo do texto. Ex.: Porto Alegre pode ser substituída por “a capital gaúcha”; Castro Alves pode ser substituído por 'O Poeta dos Escravos'; João Paulo II: Sua Santidade; Vênus: A Deusa da Beleza. Ex.: Castro Alves é autor de uma vastíssima obra literária. Não é por acaso que o **'Poeta dos Escravos'** é considerado o mais importante da geração a qual representou."
      )}
      {parseAndRenderMath(
        "Assim, a coesão confere textualidade aos enunciados agrupados em conjuntos."
      )}
      <Text style={styles.titulo3}>Conjunções</Text>
      {parseAndRenderMath(
        "A palavra “conjunção” provém de “conjunto”. Vejamos a definição do último termo no dicionário Aurélio: Conjunto: adj. 1. Junto simultaneamente. sm. 2 Reunião das partes dum todo. Já o sufixo -ção tem significado de “resultado de uma ação”. Logo, se associarmos as duas definições temos que: conjunção é a ação de juntar simultaneamente as partes de um todo. Com essa primeira definição, vejamos essa frase composta por três verbos, ou seja, por três orações: Ex: Os dias passam, as prestações chegam, a vida continua."
      )}
      {parseAndRenderMath(
        "Vamos acrescentar na frase acima as palavras **e** e **mas**: Ex:Os dias passam e as prestações chegam, mas a vida continua. Notamos o seguinte: retiramos a vírgula e substituímos por palavras, e ao fazê-lo ligamos uma oração à outra, criamos um vínculo, uma união. A palavra e está ligando as orações 1 e 2 e a palavra mas está ligando as orações 2 e 3. Portanto, as palavras e e mas que unem as frases são exemplos de conjunção."
      )}
      {parseAndRenderMath(
        "Agora, vejamos esse outro exemplo: Amor e carinho são sentimentos que estão em falta no nosso dia-a-dia. Observamos que as palavras amor, carinho têm a mesma função na frase, a de juntas exercerem papel de sujeito da oração. O e está ligando essas duas palavras equivalentes, ou seja, de mesma função na oração. A ação de unir simultaneamente as partes (amor, carinho) de um todo (sujeito) foi feita a partir da palavra e, a qual é, portanto, uma conjunção."
      )}
      {parseAndRenderMath(
        "Podemos agora definir conjunção de uma segunda maneira, a usada pela maioria dos gramáticos, por ser definição do dicionário: **Conjunção é a palavra invariável que relaciona duas orações ou dois termos que exercem a mesma função sintática.**"
      )}
      <Text style={styles.titulo3}>Conjunção coordenada e subordinada</Text>
      {parseAndRenderMath(
        "As conjunções podem ser classificadas em coordenativas e subordinativas, o que dependerá da relação que estabelecem entre as orações. Vejamos essas duas frases: Maria caiu e torceu o tornozelo. Gostaria que você fosse sincera."
      )}
      {parseAndRenderMath(
        "No primeiro caso temos duas orações independentes, já que separadamente elas têm sentido completo: Maria caiu e Maria torceu o tornozelo. O período é composto por coordenação, pois as ações são sintaticamente completas em significado."
      )}
      {parseAndRenderMath(
        "No segundo caso, uma oração depende sintaticamente da outra. O verbo “gostaria” fica sem sentido se não há complemento, o que causa o questionamento seguinte: “gostaria de quê?”. Assim, a oração “que você fosse sincera” é complemento e, portanto, subordinada à primeira oração “Gostaria”. A palavra que, então, é a conjunção subordinativa que une as duas orações."
      )}
      <Text style={styles.titulo3}>Locução conjuntiva</Text>
      {parseAndRenderMath(
        "Há ainda a locução conjuntiva, que acontece quando duas ou mais palavras exercem a função de conjunção. Alguns exemplos são: desde que, assim que, uma vez que, antes que, logo que, ainda que."
      )}
      {parseAndRenderMath(
        "Vejamos um exemplo: **Ele irá te ajudar, desde que você faça a sua parte.**"
      )}
      {parseAndRenderMath(
        "Temos duas orações: “Ele irá te ajudar” e “você faça a sua parte”, ligadas pela locução conjuntiva desde que."
      )}
      {parseAndRenderMath(
        ""
      )}
      {parseAndRenderMath(
        ""
      )}
      {parseAndRenderMath(
        ""
      )}
      {parseAndRenderMath(
        ""
      )}
      {parseAndRenderMath(
        ""
      )}
      {parseAndRenderMath(
        ""
      )}
      {parseAndRenderMath(
        ""
      )}
      {parseAndRenderMath(
        ""
      )}
    </View>,

    //PAGINA 2
    <View key="Tipos Textuais/Discursivos">
      <Text style={styles.titulo2}>2 Tipos Textuais/Discursivos</Text>
      <Text style={styles.titulo3}>2.1 Tipo Narrativo</Text>
      {parseAndRenderMath(
        "Tipos de narrador:"
      )}
      {parseAndRenderMath(
        "**1)** Narrador em 1ª pessoa: é aquele que participa da ação, ou seja, que se inclui na narrativa. Tra-ta-se do narrador-personagem."
      )}
      {parseAndRenderMath(
        "**2)**Narrador em 3ª pessoa: é aquele que não participa da ação, ou seja, não se inclui na narrativa. Temos então o narrador-observador"
      )}
      {parseAndRenderMath(
        "Todo o texto narrativo conta um FATO que se passa em determinado TEMPO e LUGAR. A narração só existe na medida em que há ação; esta ação é praticada pelos PERSONAGENS.")}
      {parseAndRenderMath(
        "Um fato, em geral, acontece por uma determinada CAUSA e desenrola-se envolvendo certas circunstâncias que o caracterizam. É necessário, portanto, mencionar, o MODO como tudo aconteceu detalhadamente, isto é, de que maneira o fato ocorreu. Um acontecimento pode provocar CONSEQUÊNCIAS, as quais devem ser observadas."
      )}
      {parseAndRenderMath(
        "Assim, os elementos básicos do texto narrativo são:"
      )}
      {parseAndRenderMath(
        "1) FATO (o que se vai narrar)"
      )}
      {parseAndRenderMath(
        "2) TEMPO (quando o fato ocorreu)"
      )}
      {parseAndRenderMath(
        "3) LUGAR (onde o fato se deu)"
      )}
      {parseAndRenderMath(
        "4) PERSONAGENS (quem participou do ocorrido ou o observou)"
      )}
      {parseAndRenderMath(
        "5) CAUSA (motivo que determinou a ocorrência)"
      )}
      {parseAndRenderMath(
        "6) MODO (como se deu o fato)"
      )}
      {parseAndRenderMath(
        "7) CONSEQUÊNCIAS"
      )}

      <View style={styles.imageView}>
        <Image
          source={require("@/app/(linguagens)/imagens/fig1.1.png")}
          style={styles.image}
        ></Image>
      </View>

      <Text style={styles.titulo3}>A narração objetiva</Text>
      {parseAndRenderMath(
        "Observe agora um exemplo de narração sobre um incêndio, criado com o auxílio do esquema estudado. Lembre-se de que, antes de começar a escrever, é preciso escolher o tipo de narrador. Optamos pelo narrador em 3ª pessoa."
      )}
      <Text style={styles.titulo3}>O incêndio</Text>
      {parseAndRenderMath(
        "Ocorreu um pequeno incêndio na noite de ontem, em um apartamento de propriedade do sr. Marcos da Fonseca. No local habitavam o proprietário, sua esposa e seus dois filhos. Todos eles, na hora em que o fogo começou, tinham saído de casa e estavam jantando em um restaurante situado em frente ao edifício. A causa do incêndio foi um curto - circuito ocorrido no precário sistema elétrico do velho apartamento. O fogo desapontou em um dos quartos que, por sorte, ficava na frente do prédio. O porteiro do restaurante, conhecido da família, avistou-o e imediatamente foi chamar o sr. Marcos. Ele, mais que depressa, ligou para o Corpo de Bombeiros. Embora não tivessem demorado a chegar, os bombeiros não conseguiram impedir que o quarto e a sala ao lado fossem inteiramente destruídos pelas chamas. Não obstante o prejuízo, a família consolou-se com o fato de aquele incidente não ter tomado proporções, atingindo os apartamentos vizinhos."
      )}

      <Text style={styles.titulo3}>A narração subjetiva</Text>
      {parseAndRenderMath(
        "Nela os fatos são apresentados levando-se em conta as emoções, os sentimentos envolvidos na história. Nota-se claramente a posição sensível e emocional do narrador ao relatar os acontecimentos. O fato não é narrado de modo frio e impessoal; ao contrário, são ressaltados os efeitos psicológicos que os acontecimentos desencadeiam nos personagens. Observe o exemplo de uma narração subjetiva em 1ª pessoa."
      )}
      <Text style={styles.titulo3}>Com a fúria de um vendaval</Text>
      {parseAndRenderMath(
        "Em uma certa manhã acordei entediada. Estava em minhas férias escolares do mês de julho. Não pudera viajar. Fui ao portão e avistei, três quarteirões ao longe, a movimentação de uma feira livre. Não tinha nada a fazer, e isso estava me matando de aborrecimento. Embora soubesse que uma feira livre não constitui exatamente o melhor divertimento do qual um ser humano pode dispor, fui andando, a passos lentos, em direção àquelas barracas. Não esperava ver nada de original, ou mesmo interessante. Como é triste o tédio! Logo que me aproximei, vi uma senhora alta, extremamente gorda, discutindo com um feirante. O homem, dono da barraca de tomates, tentava em vão acalmar a nervosa senhora. Não sei por que brigavam, mas sei o que vi: a mulher, imensamente gorda, mais do que gorda (monstruosa), erguia seus enormes braços e, com os punhos cerrados, gritava contra o feirante. Comecei a me assustar, com medo de que ela destruísse a barraca ( e talvez o próprio homem) devido à sua fúria incontrolável. Ela ia gritando e se empolgando com sua raiva crescente e ficando cada vez mais vermelha, assim como os tomates, ou até mais. De repente, no auge de sua ira, avançou contra o homem já atemorizado e, tropeçando em alguns tomates podres que estavam no chão, caiu, tombou, mergulhou, esborrachou-se no asfalto, para o divertimento do pequeno público que, assim como eu, assistiu àquela cena incomum."
      )}

      <Text style={styles.titulo3}>2.2 Tipo Descritivo</Text>
      <Text style={styles.titulo3}>Esquema de descrição de pessoas</Text>
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(linguagens)/imagens/fig1.2.png")}
          style={styles.image}
        ></Image>
      </View>
      {parseAndRenderMath(
        "Exemplo:"
      )}
      <Text style={styles.titulo3}>Tancredo: o político da esperança</Text>
      {parseAndRenderMath(
        "Qualquer pessoa que o visse, quer pessoalmente ou através dos meios de comunicação, era logo levada a sentir que dele emanava uma serenidade e autoconfiança próprias daqueles que vivem com sabedoria e dignidade. De baixa estatura, magro, calvo, tinha a idade de um pai que cada pessoa gostaria de ter e de quem a nação tanto precisava naquele momento de desamparo. Seus olhos oblíquos e castanhos transmitiam confiança. O nariz levemente arrebitado e os lábios finos, em meio ao rosto arredondado, traçavam o perfil de alguém que sentíamos ter conhecido durante a vida inteira. Sua voz era doce e ao mesmo tempo dura. Falava e vestia-se como o estadista. Era um estadista. Sua característica mais marcante foi, sem dúvida, a ponderação na análise dos problemas políticos e socioeconômicos. Respeitado em todo mundo pela condição de líder preocupado com o destino das futuras gerações, de conhecedor profundo das questões deste país, colocava sempre o espírito comunitário acima dos interesses individuais. Seu grande sonho foi provavelmente o de pôr toda a sua capacidade a serviço da nação brasileira, tão ameaçada pelas adversidades econômicas e tão abandonada, como sempre, fora, por aqueles que se diziam seus representantes. Verdadeiro exemplo de homem público, ficará para sempre na memória dos seus contemporâneos e no registro histórico dos grandes vultos nacionais."
      )}
      {parseAndRenderMath(
        "Obs: Note que, embora o esquema utilizado nesta descrição separe os aspectos físicos e psicológicos em parágrafos diferentes, nada impede que você faça algumas poucas referências psicológicas no segundo parágrafo, que trata das características físicas."
      )}
      <Text style={styles.titulo3}>Descrição de objetos</Text>
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(linguagens)/imagens/fig1.3.png")}
          style={styles.image}
        ></Image>
      </View>
      {parseAndRenderMath(
        "Exemplo:"
      )}
      <Text style={styles.titulo3}>Um clipe, dois clipes</Text>
      {parseAndRenderMath(
        "Este pequeno objeto que agora descrevemos encontra-se sobre uma mesa de escritório e sua  função  é  a de prender folhas de papel. Tem o formato semelhante ao de uma torre de igreja. É constituído por um único fio metálico que, dando duas voltas sobre si mesmo, assume a configuração de dois desenhos (um dentro do outro), cada um deles apresentando uma forma específica. Essa forma é composta por duas figuras geométricas: um retângulo cujo lado maior apresenta aproximadamente três centímetros e um lado menor de cerca de um centímetro e meio; um de seus lados menores é, ao mesmo tempo, a base de um triângulo equilátero, o que acaba por torná-lo um objeto ligeiramente pontiagudo. O material de que é feito confere-lhe um peso insignificante. Por ser niquelado, apresenta um brilho suave. Prendemos as folhas de papel fazendo com que elas se encaixem no meio dele. Está presente em todos os escritórios ou locais onde seja necessário separar folhas em blocos diferenciados. Embora aparentemente insignificante, dadas as suas reduzidas dimensões, é muito útil na organização de papéis."
      )}

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
    <LinearGradient style={styles.container} colors={[Colors.gradientStart, Colors.gradientStart, Colors.gradientEnd]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/(linguagens)/telaUnidadesLing")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>MATERIAL TEÓRICO</Text>
          <Text style={styles.headerSubtitle}>Linguagens</Text>
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
