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
          source={require("@/app/(linguagens)/imagens/fig2.1.png")}
          style={styles.image}
        ></Image>
      </View>

      <Text style={styles.titulo3}>A narração objetiva</Text>
      {parseAndRenderMath(
        "Observe agora um exemplo de narração sobre um incêndio, criado com o auxílio do esquema estudado. Lembre-se de que, antes de começar a escrever, é preciso escolher o tipo de narrador. Optamos pelo narrador em 3ª pessoa."
      )}
      <Text style={styles.titulo3}>O incêndio</Text>
      {parseAndRenderMath(
        "Ocorreu um pequeno incêndio na noite de ontem, em um apartamento de propriedade do sr. Marcos da Fonseca."
      )}
      {parseAndRenderMath(
        "No local habitavam o proprietário, sua esposa e seus dois filhos. Todos eles, na hora em que o fogo começou, tinham saído de casa e estavam jantando em um restaurante situado em frente ao edifício. A causa do incêndio foi um curto - circuito ocorrido no precário sistema elétrico do velho apartamento. O fogo desapontou em um dos quartos que, por sorte, ficava na frente do prédio. O porteiro do restaurante, conhecido da família, avistou-o e imediatamente foi chamar o sr. Marcos. Ele, mais que depressa, ligou para o Corpo de Bombeiros."
      )}
      {parseAndRenderMath(
        "Embora não tivessem demorado a chegar, os bombeiros não conseguiram impedir que o quarto e a sala ao lado fossem inteiramente destruídos pelas chamas. Não obstante o prejuízo, a família consolou-se com o fato de aquele incidente não ter tomado proporções, atingindo os apartamentos vizinhos."
      )}

      <Text style={styles.titulo3}>A narração subjetiva</Text>
      {parseAndRenderMath(
        "Nela os fatos são apresentados levando-se em conta as emoções, os sentimentos envolvidos na história. Nota-se claramente a posição sensível e emocional do narrador ao relatar os acontecimentos. O fato não é narrado de modo frio e impessoal; ao contrário, são ressaltados os efeitos psicológicos que os acontecimentos desencadeiam nos personagens. Observe o exemplo de uma narração subjetiva em 1ª pessoa."
      )}
      <Text style={styles.titulo3}>Com a fúria de um vendaval</Text>
      {parseAndRenderMath(
        "Em uma certa manhã acordei entediada. Estava em minhas férias escolares do mês de julho. Não pudera viajar. Fui ao portão e avistei, três quarteirões ao longe, a movimentação de uma feira livre."
      )}
      {parseAndRenderMath(
        "Não tinha nada a fazer, e isso estava me matando de aborrecimento. Embora soubesse que uma feira livre não constitui exatamente o melhor divertimento do qual um ser humano pode dispor, fui andando, a passos lentos, em direção àquelas barracas. Não esperava ver nada de original, ou mesmo interessante. Como é triste o tédio! Logo que me aproximei, vi uma senhora alta, extremamente gorda, discutindo com um feirante."
      )}
      {parseAndRenderMath(
        "O homem, dono da barraca de tomates, tentava em vão acalmar a nervosa senhora. Não sei por que brigavam, mas sei o que vi: a mulher, imensamente gorda, mais do que gorda (monstruosa), erguia seus enormes braços e, com os punhos cerrados, gritava contra o feirante. Comecei a me assustar, com medo de que ela destruísse a barraca ( e talvez o próprio homem) devido à sua fúria incontrolável. Ela ia gritando e se empolgando com sua raiva crescente e ficando cada vez mais vermelha, assim como os tomates, ou até mais."
      )}
      {parseAndRenderMath(
        "De repente, no auge de sua ira, avançou contra o homem já atemorizado e, tropeçando em alguns tomates podres que estavam no chão, caiu, tombou, mergulhou, esborrachou-se no asfalto, para o divertimento do pequeno público que, assim como eu, assistiu àquela cena incomum."
      )}

      <Text style={styles.titulo3}>2.2 Tipo Descritivo</Text>
      <Text style={styles.titulo3}>Esquema de descrição de pessoas</Text>
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(linguagens)/imagens/fig2.2.png")}
          style={styles.image}
        ></Image>
      </View>
      {parseAndRenderMath(
        "Exemplo:"
      )}
      <Text style={styles.titulo3}>Tancredo: o político da esperança</Text>
      {parseAndRenderMath(
        "Qualquer pessoa que o visse, quer pessoalmente ou através dos meios de comunicação, era logo levada a sentir que dele emanava uma serenidade e autoconfiança próprias daqueles que vivem com sabedoria e dignidade."
      )}
      {parseAndRenderMath(
        "De baixa estatura, magro, calvo, tinha a idade de um pai que cada pessoa gostaria de ter e de quem a nação tanto precisava naquele momento de desamparo. Seus olhos oblíquos e castanhos transmitiam confiança. O nariz levemente arrebitado e os lábios finos, em meio ao rosto arredondado, traçavam o perfil de alguém que sentíamos ter conhecido durante a vida inteira. Sua voz era doce e ao mesmo tempo dura. Falava e vestia-se como o estadista. Era um estadista."
      )}
      {parseAndRenderMath(
        "Sua característica mais marcante foi, sem dúvida, a ponderação na análise dos problemas políticos e socioeconômicos. Respeitado em todo mundo pela condição de líder preocupado com o destino das futuras gerações, de conhecedor profundo das questões deste país, colocava sempre o espírito comunitário acima dos interesses individuais. Seu grande sonho foi provavelmente o de pôr toda a sua capacidade a serviço da nação brasileira, tão ameaçada pelas adversidades econômicas e tão abandonada, como sempre, fora, por aqueles que se diziam seus representantes."
      )}
      {parseAndRenderMath(
        "Verdadeiro exemplo de homem público, ficará para sempre na memória dos seus contemporâneos e no registro histórico dos grandes vultos nacionais."
      )}

      {parseAndRenderMath(
        "Obs: Note que, embora o esquema utilizado nesta descrição separe os aspectos físicos e psicológicos em parágrafos diferentes, nada impede que você faça algumas poucas referências psicológicas no segundo parágrafo, que trata das características físicas."
      )}
      <Text style={styles.titulo3}>Descrição de objetos</Text>
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(linguagens)/imagens/fig2.3.png")}
          style={styles.image}
        ></Image>
      </View>
      {parseAndRenderMath(
        "Exemplo:"
      )}
      <Text style={styles.titulo3}>Um clipe, dois clipes</Text>
      {parseAndRenderMath(
        "Este pequeno objeto que agora descrevemos encontra-se sobre uma mesa de escritório e sua função é a de prender folhas de papel."
      )}
      {parseAndRenderMath(
        "Tem o formato semelhante ao de uma torre de igreja. É constituído por um único fio metálico que, dando duas voltas sobre si mesmo, assume a configuração de dois desenhos (um dentro do outro), cada um deles apresentando uma forma específica. Essa forma é composta por duas figuras geométricas: um retângulo cujo lado maior apresenta aproximadamente três centímetros e um lado menor de cerca de um centímetro e meio; um de seus lados menores é, ao mesmo tempo, a base de um triângulo equilátero, o que acaba por torná-lo um objeto ligeiramente pontiagudo."
      )}
      {parseAndRenderMath(
        "O material de que é feito confere-lhe um peso insignificante. Por ser niquelado, apresenta um brilho suave. Prendemos as folhas de papel fazendo com que elas se encaixem no meio dele."
      )}
      {parseAndRenderMath(
        "Está presente em todos os escritórios ou locais onde seja necessário separar folhas em blocos diferenciados. Embora aparentemente insignificante, dadas as suas reduzidas dimensões, é muito útil na organização de papéis. "
      )}

      <Text style={styles.titulo3}>Descrição de ambientes e paisagens</Text>
      {parseAndRenderMath(
        "Toda vez que nós quisermos descrever um lugar, devemos primeiramente apontar se esse local é fechado ou aberto. Caso seja um local fechado, nós denominaremos ambiente; se entretanto, for um lugar a céu aberto, chamaremos paisagem. A paisagem por sua vez, pode ser rural (campestre) ou urbana (vista que se tem de uma cidade). Cumpre, dessa forma, elaborar dois esquemas básicos: o da descrição de ambientes e o da descrição de paisagens. "
      )}
      {parseAndRenderMath(
        "Esquema de descrição de ambientes."
      )}
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(linguagens)/imagens/fig2.4.png")}
          style={styles.image}
        ></Image>
      </View>

      <Text style={styles.titulo3}>O lugar e o tempo</Text>
      {parseAndRenderMath(
        "Ao entrar na sala daquele casarão antigo, tem-se, de início, uma desagradável sensação de abandono e de uma certa tristeza."
      )}
      {parseAndRenderMath(
        "As paredes, já quase sem cor devido à ação do tempo, as duas janelas fechadas, com suas venezianas carcomidas, situadas na parede oposta à porta, também velha, davam a quem lá chegava a impressão de estar adentrando um museu abandonado. O chão já sem brilho e o teto no qual havia um lustre luxuoso, mas empoeirado e com poucas lâmpadas em funcionamento, confirmavam a impressão inicial. Sentia-se também no ar o odor dos tapetes embolorados."
      )}
      {parseAndRenderMath(
        "Da porta, avistavam-se logo à frente alguns móveis em estilo colonial, muito antigos, mas belíssimos - verdadeiras raridades. No centro da sala, uma mesa de cor marrom sobre um tapete persa de rara beleza. Mais perto da porta, uma poltrona revestida por um tecido amarelo florido e, como os outros móveis, empoeirada. Nas paredes, quadros de paisagens e retratos daqueles que um dia habitaram o que deveria ter sido uma casa esplendorosa."
      )}
      {parseAndRenderMath(
        "Em toda a sala pairava uma atmosfera de desolação, de decadência, de envelhecimento, que causavam em quem a contemplava uma sensação de nostalgia."
      )}

      {parseAndRenderMath(
        "A descrição de paisagens, por sua vez, propicia a elaboração de um outro esquema. Tanto a paisagem urbana quanto a rural podem ser descritas através do esquema que mostraremos agora:"
      )}
      <Text style={styles.titulo3}>Esquema de descrição de ambientes</Text>
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(linguagens)/imagens/fig2.5.png")}
          style={styles.image}
        ></Image>
      </View>

      {parseAndRenderMath(
        "Exemplo:"
      )}
      <Text style={styles.titulo3}>Sítio Alvorada: um recanto especial</Text>
      {parseAndRenderMath(
        "Nas proximidades da cidade de Campo Limpo existe um pequeno sítio. Situa-se em um terreno inclinado e arborizado quase que em sua totalidade."
      )}
      {parseAndRenderMath(
        "Olhando-se da sala construída bem no centro do sítio, veem-se, até onde a vista alcança, outro pequenos sítios com as mesmas características e, bem ao fundo, algumas colinas cujo verde cintila pela ação dos poderosos raios de sol."
      )}
      {parseAndRenderMath(
        "Em sua parte mais baixa, existe um milharal que se estende até a casa de paredes brancas e janelas enormes. Em frente à varanda há um jardim com flores variadas, que exalam perfumes agradáveis e suaves. Já ao lado da casa existe um poço e, subindo um pouco mais, avista-se um pomar repleto de árvores frutíferas, em especial mangueiras, além da horta, onde predominam certos tipos de vegetal. Em sua parte mais alta, não cultivada, há um pequeno gramado, onde as crianças costumam brincar e, de lá de cima, contemplar toda a região."
      )}
      {parseAndRenderMath(
        "Estar ali, em meio ao pomar ou ao jardim, respirando aquele ar puro, com o leve aroma dos eucaliptos que circulam a região, traz a qualquer um que frequente o local uma profunda sensação de paz. Lá reinam o silêncio e a harmonia entre o homem e a natureza."
      )}

      <Text style={styles.titulo3}>2.3 Tipo Dissertativo</Text>
      {parseAndRenderMath(
        "O **Texto Dissertativo-Argumentativo** é um dos tipos de gêneros textuais. Outros tipos são: texto narrativo, texto descritivo, texto expositivo e texto injuntivo"
      )}
      {parseAndRenderMath(
        "Este tipo de texto consiste na defesa de uma ideia por meio de argumentos e explicações, à medida que é dissertativo; bem como seu objetivo central reside na formação de opinião do leitor, ou seja, caracteriza-se por tentar convencer ou persuadir o interlocutor da mensagem, sendo nesse sentido argumentativo."
      )}
      {parseAndRenderMath(
        "No Exame Nacional do Ensino Médio (Enem) esse é o tipo de texto solicitado aos alunos, cujo tema ronda questões de ordem social, científica, cultural ou política."
      )}

      <Text style={styles.titulo3}>2.3.1 Planejamento</Text>
      {parseAndRenderMath(
        "A produção textual requer planejamento. Assim, antes de começar a escrever, convém elaborar um plano daquilo que será abordado e de que forma (estratégia). Essa planificação servirá de ponte para o sucesso do texto, muito embora o mais importante para se alcançar esse resultado seja observar atentamente os fatores de coesão e coerência."
      )}
      {parseAndRenderMath(
        "Saiba mais sobre esse tema em: Para melhor exemplificar, as etapas necessárias para produzir um texto dissertativo-argumentativo são:"
      )}
      {parseAndRenderMath(
        "**Problema:** No momento inicial busca-se o problema, ou seja, os fatos sobre o tema pretendido e, ademais a tese (ideia central do texto)."
      )}
      {parseAndRenderMath(
        "**Opinião:** A opinião pessoal sobre o tema reforçará a argumentação, por isso é importante buscar uma verdade pessoal ou juízo de valor sobre o assunto abordado"
      )}
      {parseAndRenderMath(
        "**Argumentos:** O mais importante de um texto dissertativo-argumentativo é a organização, clareza e exposição dos argumentos. Para tanto, é importante selecionar exemplos, fatos e provas a fim de assegurar a validade de sua opinião, sem deixar de justificar"
      )}
      {parseAndRenderMath(
        "**Conclusão:** Nesse momento busca-se a solução para o problema exposto. Assim, é interessante apresentar a síntese da discussão, a retomada da tese (ideia principal) e além disso, a proposta de solução do tema com as observações finais."
      )}
      <Text style={styles.titulo3}>2.3.2 Estrutura</Text>
      {parseAndRenderMath(
        "O texto dissertativo-argumentativo segue o padrão dos modelos de redação, ou seja, introdução, desenvolvimento e conclusão."
      )}
      <Text style={styles.titulo3}>2.3.2.1 Introdução</Text>
      {parseAndRenderMath(
        "Na introdução devem ser mencionados os temas que são abordados no texto - ou o problema - de modo a situar o interlocutor."
      )}
      {parseAndRenderMath(
        "Esta parte deve compreender cerca de 25% da dimensão global do texto."
      )}
      <Text style={styles.titulo3}>2.3.2.2 Desenvolvimento</Text>
      {parseAndRenderMath(
        "Todas as ideias mencionadas na introdução devem ser desenvolvidas de forma opinativa e argumentativa nessa parte do texto, cuja dimensão deve compreender cerca de 50% do mesmo."
      )}
      <Text style={styles.titulo3}>2.3.2.3 Conclusão</Text>
      {parseAndRenderMath(
        "A conclusão deve ser uma síntese do problema abordado mas com considerações que expressam o resultado do que foi pensado ao longo do texto."
      )}
      {parseAndRenderMath(
        "A sua dimensão contempla cerca de 25% do texto."
      )}
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(linguagens)/imagens/fig2.6.png")}
          style={styles.image}
        ></Image>
      </View>

      {parseAndRenderMath(
        "Exemplo:"
      )}
      <Text style={styles.titulo3}>A qualidade de vida na cidade e no campo</Text>
      {parseAndRenderMath(
        "É de conhecimento geral que a qualidade de vida nas regiões rurais é, em alguns aspectos, superior à da zona urbana, porque no campo inexiste a agitação das grandes metrópoles, há maiores possibilidades de se obterem alimentos adequados e, além do mais, as pessoas dispõem de maior tempo para estabelecer relações humanas mais profundas e duradouras."
      )}
      {parseAndRenderMath(
        "Ninguém desconhece que o ritmo de trabalho de uma metrópole é intenso. O espírito de concorrência, a busca de se obter uma melhor colocação profissional, enfim, a conquista de novos espaços lança o habitante urbano em meio a um turbilhão de constantes solicitações. Esse ritmo excessivamente intenso torna a vida bastante agitada, ao contrário do que se poderia dizer sobre a vida dos moradores da zona rural."
      )}
      {parseAndRenderMath(
        "Além disso, nas áreas campestres há maior quantidade de alimentos saudáveis. Em contrapartida, o homem da cidade costuma receber gêneros alimentícios colhidos antes do tempo de maduração, para garantir maior durabilidade durante o período de transporte e comercialização."
      )}
      {parseAndRenderMath(
        "Ainda convém lembrar a maneira como as pessoas se relacionam nas zonas rurais. Ela difere da convivência habitual estabelecida pelos habitantes metropolitanos. Os moradores das grandes cidades, pelos fatores já expostos, de pouco tempo dispõem para alimentar relações humanas mais profundas."
      )}
      {parseAndRenderMath(
        "Por isso tudo, entendemos que a zona rural propicia a seus habitantes maiores possibilidades de viver com tranquilidade. Só nos resta esperar que as dificuldades que afligem os habitantes metropolitanos não venham a se agravar com o passar do tempo."
      )}

      <Text style={styles.titulo3}>2.4 Tipo Expositivo</Text>
      {parseAndRenderMath(
        "O **texto expositivo** é um tipo de texto que visa a apresentação de um conceito ou de uma ideia. Muito comum esse tipo de texto ser abordado no contexto escolar e acadêmico, uma vez que inclui formas de apresentação, desde seminários, artigos acadêmicos, congressos, conferências, palestras, colóquios, entrevistas, dentre outros."
      )}
      <Text style={styles.titulo3}>2.4.1 Recursos Linguísticos</Text>
      {parseAndRenderMath(
        "No texto expositivo, o objetivo central do locutor (emissor) é explanar sobre determinado assunto, a partir de recursos como a conceituação, a definição, a descrição, a comparação, a informação e enumeração."
      )}
      <Text style={styles.titulo3}>2.4.2 Classificação dos Textos Expositivos</Text>
      {parseAndRenderMath(
        "De acordo com seu objetivo central, os textos expositivos são classificados em dois tipos:"
      )}
      <Text style={styles.titulo3}>2.4.2.1 Texto Expositivo-argumentativo</Text>
      {parseAndRenderMath(
        "- Nesse caso, além de apresentar o tema, o emissor foca nos argumentos necessários para a explanação de suas ideias. Dessa forma, recorre aos diversos autores e teorias para comparar, conceituar e defender sua opinião."
      )}
      <Text style={styles.titulo3}>2.4.2.2 Texto Expositivo-informativo</Text>
      {parseAndRenderMath(
        "- Nesta ocasião, o objetivo central do emissor é simplesmente transmitir as informações sobre determinado tema, sem grandes apreciações e, por isso, com o máximo de neutralidade."
      )}
      {parseAndRenderMath(
        "Podemos pensar numa apresentação sobre os índices de violência no país, de modo que o conjunto de informações, gráficos e dados sobre o tema, apresentam tão somente informações sobre o problema, sem defesa de opinião."
      )}

      <Text style={styles.titulo3}>Exemplo: observe a seguir alguns exemplos de textos expositivos:</Text>
      {parseAndRenderMath(
        "**Verbete de dicionário**"
      )}
      {parseAndRenderMath(
        "“Significado de Nostalgia (s.f). Tristeza causada pela saudade de sua terra ou de sua pátria; melancolia. Saudade do passado, de um lugar etc. Disfunções comportamentais causadas pela separação ou isolamento (físico) do país natal, pela ausência da família e pela vontade exacerbada de regressar à pátria. Saudade de alguma coisa, de uma circunstância já passada ou de uma condição que (uma pessoa) deixou de possuir. Condição melancólica causada pelo anseio de ter os sonhos realizados. Condição daquele que é triste sem motivos explícitos. (Etm. do francês: nostalgie)” Fonte: (Dicionário Online de Português- Dicio.com)"
      )}
      {parseAndRenderMath(
        "**Encliclopédia**"
      )}
      {parseAndRenderMath(
        "“Cervo-do-pantanal (nome científico: Blastocerus dichotomus), também chamado suaçuetê, suaçupu, suaçuapara, guaçupuçu ou simplesmente cervo, é um mamífero ruminante da família dos cervídeos e único representante do gênero Blastocerus. Ocorria em grande parte das várzeas e margens de rios do centro da América do Sul, desde o sul do rio Amazonas até o norte da Argentina, mas atualmente, a espécie só é comum no Pantanal, na bacia do rio Guaporé, na ilha do Bananal e em Esteros del Iberá.” Fonte: (Wikipédia)"
      )}
      {parseAndRenderMath(
        "**Entrevista**"
      )}
      {parseAndRenderMath(
        "**“Clarice Lispector, de onde veio esse Lispector?**"
      )}
      {parseAndRenderMath(
        "É um nome latino, não é? Eu perguntei a meu pai desde quando havia Lispector na Ucrânia. Ele disse que há gerações e gerações anteriores. Eu suponho que o nome foi rolando, rolando, rolando, perdendo algumas sílabas e foi formando outra coisa que parece “Lis” e “peito”, em latim. É um nome que quando escrevi meu primeiro livro, Sérgio Milliet (eu era completamente desconhecida, é claro) diz assim: “Essa escritora de nome desagradável, certamente um pseudônimo…”. Não era, era meu nome mesmo."
      )}
      {parseAndRenderMath(
        "**Você chegou a conhecer o Sérgio Milliet pessoalmente?**"
      )}
      {parseAndRenderMath(
        "Nunca. Porque eu publiquei o meu livro e fui embora do Brasil, porque eu me casei com um diplomata brasileiro, de modo que não conheci as pessoas que escreveram sobre mim."
      )}
      {parseAndRenderMath(
        "**Clarice, seu pai fazia o que profissionalmente?**"
      )}
      {parseAndRenderMath(
        "Representações de firmas, coisas assim. Quando ele, na verdade, dava era para coisas do espírito."
      )}
      {parseAndRenderMath(
        "**Há alguém na família Lispector que chegou a escrever alguma coisa?**"
      )}
      {parseAndRenderMath(
        "Eu soube ultimamente, para minha enorme surpresa, que minha mãe escrevia. Não publicava, mas escrevia. Eu tenho uma irmã, Elisa Lispector, que escreve romances. E tenho outra irmã, chamada Tânia Kaufman, que escreve livros técnicos."
      )}
      {parseAndRenderMath(
        "**Você chegou a ler as coisas que sua mãe escreveu?**"
      )}
      {parseAndRenderMath(
        "Não, eu soube há poucos meses. Soube através de uma tia: “Sabe que sua mãe fazia um diário e escrevia po esias?” Eu fiquei boba…"
      )}
      {parseAndRenderMath(
        "**Nas raras entrevistas que você tem concedido surge, quase que necessariamente, a pergunta de como você começou a escrever e quando?**"
      )}
      {parseAndRenderMath(
        "Antes de sete anos eu já fabulava, já inventava histórias, por exemplo, inventei uma história que não acabava nunca. Quando comecei a ler comecei a escrever também. Pequenas histórias.”"
      )}
      {parseAndRenderMath(
        "(Trecho da última entrevista com a escritora Clarice Lispector, concedida em 1977, ao repórter Júlio Lerner, da TV Cultura)."
      )}

    </View>,

    //PAGINA 3
    <View key="Gêneros Textuais">
      <Text style={styles.titulo2}>3 Gêneros Textuais</Text>
      <Text style={styles.titulo3}>3.1 Notícia</Text>
      {parseAndRenderMath(
        "Como se sabe, cada gênero possui um objetivo ao estabelecer a comunicação entre os interlocutores (pessoas envolvidas na fala ou na escrita), e o referente a esta modalidade é a informação sobre acontecimentos ligados à sociedade em geral. Um detalhe de extrema importância que devemos estar atentos é sobre o tipo de linguagem estabelecida, ou seja, identificarmos se ela é formal ou informal, se há a participação do emissor (a pessoa que escreve ou fala) no sentido de emitir algum tipo de opinião, entre outros aspectos. A notícia, de forma específica, possui uma linguagem clara, precisa e objetiva, uma vez que se trata de uma informação e, por isso, tudo que é relatado precisa estar claro, de modo a fazer com que a mensagem seja transmitida de forma adequada. Que tal conhecermos agora um pouco mais sobre as partes que constituem este gênero? Sendo assim, vejamos:"
      )}
      {parseAndRenderMath(
        "**A manchete ou título principal** -> Costuma ser composto de frases pequenas e atrativas, e revela o assunto principal que será retratado em seguida;"
      )}
      {parseAndRenderMath(
        "**O título auxiliar** -> Sua função é complementar o título principal, acrescentando-lhe apenas algumas informações a mais."
      )}
      {parseAndRenderMath(
        "**O lide (este termo deriva de uma palavra inglesa - lead)** -> Nesta parte precisamos encontrar todas as informações necessárias para responder às seguintes perguntas: Onde aconteceu o fato? Com quem? O que aconteceu? Quando? Como? Por quê? Qual foi o assunto?"
      )}
      {parseAndRenderMath(
        "**Corpo da notícia** -> Nela, há um detalhamento maior dos fatos, de modo a destacar os detalhes mais importantes, fundamentais à compreensão do interlocutor."
      )}

      <Text style={styles.titulo3}>3.2 Editorial</Text>
      {parseAndRenderMath(
        "O **texto editorial** é um tipo de **texto jornalístico** e comumente aparecem no início das colunas. Diferente dos outros textos que compõem um jornal, ou seja, textos de caráter informativo, os editoriais são textos opinativos."
      )}
      {parseAndRenderMath(
        "Assim, embora sejam textos de caráter subjetivo, eles podem apresentar certa objetividade uma vez que apresentará os artigos que o leitor irá se deparar. Os jornais apresentam diversos editoriais, ou seja dentro de cada seção (seja Política, Economia, Cultura, Esporte, Turismo, País, Cidade, Classificados, etc) jornalística são apresentados os assuntos que serão abordados."
      )}
      {parseAndRenderMath(
        "Note que nos jornais e também nas revistas, podemos encontrar os editoriais intitulados “Carta ao Leitor” ou “Carta do Editor”."
      )}
      {parseAndRenderMath(
        "No geral, tratam-se de textos dissertativo-argumentativos os quais apresenta os diversos temas que serão  abordados na imprensa. De tal maneira, são textos organizados pelos editorialistas que expressam as opiniões da equipe e, por isso, não recebem a assinatura do autor. Ou seja, no geral eles apresentam a opinião do meio de comunicação (revista, jornal, rádio, etc.)."
      )}
      {parseAndRenderMath(
        "**Características** -> As principais características dos editoriais jornalísticos são:"
      )}
      {parseAndRenderMath(
        "-> Caráter objetivo e subjetivo; Linguagem simples e clara; Textos dissertativos-argumentativos; Temas da atualidade; Textos relativamente curtos."
      )}
      {parseAndRenderMath(
        "Exemplo"
      )}
      {parseAndRenderMath(
        "**Texto editorial da Revista Feminina** - Neste mês de natal, celebramos o nascimento do menino Jesus. Nada melhor que reunir a família e curtir esse momento tão especial de encontro, amor, compreensão e tolerância. Por conta disso, a Revista Feminina nesse mês apresenta um artigo sobre a “Origem e História do Natal”, além de oferecer dicas de presentes natalinos para toda a família."
      )}
      {parseAndRenderMath(
        "Ademais, você não deve perder as novidades sobre a moda nesse verão e ainda, ficar alerta no artigo sobre os “Melhores Concelhos para Economizar”. Para além disso, apresentamos diversas dicas de viagem para esse final de ano em todas as regiões do Brasil e muitas receitas natalinas práticas, rápidas e fáceis de preparar."
      )}
      {parseAndRenderMath(
        "Aproveite o final do ano para se divertir com toda a família e amigos e não se esqueça que o espírito de natal deverá ser aproveitado para nos tornar pessoas cada vez melhores. Encha seu coração de tudo que há de melhor: amor, alegria, compreensão, harmonia e tolerância. Desejamos-lhes boa leitura e um feliz natal! - Equipe Revista Feminina"
      )}

      <Text style={styles.titulo3}>3.3 Artigo de Opinião</Text>
      {parseAndRenderMath(
        "É um tipo de texto dissertativo-argumentativo. Nele, o autor tem a finalidade de apresentar determinado tema e seu ponto de vista, e por isso, recebe esse nome. Possui as características de um texto jornalístico e tem como principal objetivo informar e persuadir o leitor sobre um assunto. Note que esse tipo de texto é muito pedido nos vestibulares e concursos públicos."
      )}
      {parseAndRenderMath(
        "A Argumentação é o principal recurso retórico utilizado nos artigos de opinião, que surgem sobretudo, nos textos disseminados pelos meios de comunicação, sejam na televisão, rádio, jornais ou revistas. Por esse motivo, esse tipo de texto geralmente aborda temas da atualidade."
      )}
      {parseAndRenderMath(
        "**Principais Características** -> As principais características dos artigos de opinião são:"
      )}
      {parseAndRenderMath(
        "Uso da argumentação e persuasão; Textos em primeira e terceira pessoa; Textos assinados pelo autor; Textos veiculados nos meios de comunicação; Linguagem simples, objetiva e subjetiva; Temas da atualidade; Títulos polêmicos e provocativos; Verbos no presente e no imperativo."
      )}
      {parseAndRenderMath(
        "**Exemplos de Artigos de Opinião** -> Para entender melhor esse tipo de texto argumentativo, seguem alguns exemplos de artigos de opinião:"
      )}
      {parseAndRenderMath(
        "**Trecho de um artigo de opinião sobre 'Educação' :**"
      )}
      {parseAndRenderMath(
        "A educação no Brasil tem sido discutida cada vez mais, uma vez que ela é o principal aspecto de desenvolvimento de uma nação."
      )}
      {parseAndRenderMath(
        "Enquanto nosso governo investe na expansão econômica e financeira do país, a educação regride, apresentando muitos problemas estruturais. Principalmente nas pequenas cidades, o investimento para a educação é mal aplicado e, muitas vezes, as verbas são desviadas."
      )}
      {parseAndRenderMath(
        "Por esse motivo, o nosso país está longe de ser um país desenvolvido até que descaso com a educação persista."
      )}
      {parseAndRenderMath(
        "Acima de tudo, os governantes do nosso país precisam ter a consciência de que enquanto a educação estiver à margem, problemas como violência e pobreza persistirão. O lema da nossa bandeira será sempre uma ironia."
      )}
      {parseAndRenderMath(
        "“Ordem e progresso” ou “Desordem e Regresso”? Nosso grande educador Paulo Freire já dizia: “Se a educação sozinha não transforma a sociedade, sem ela tampouco a sociedade muda”."
      )}

      <Text style={styles.titulo3}>3.4 Gêneros Mistos</Text>
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(linguagens)/imagens/fig3.1.png")}
          style={styles.image}
        ></Image>
      </View>
      {parseAndRenderMath(
        "Há alguns gêneros textuais que são considerados mistos, por mesclarem em seu conteúdo imagens e palavras. O texto em quadrinhos tem algumas características específicas do gênero. Os “balões” que indicam a fala ou pensamento, a forma de se escrever, a riqueza de interjeições, onomatopeias, utilização de letras maiúsculas para indicar aumento no tom de voz, repetição de vogais indicando prolongamento do som emitido pelo personagem, etc. Além de tudo isto, a imagem dos personagens aparecem com expressões faciais e corporais, que completam a sua fala expressa pela escrita. É, talvez, o gênero de escrita que mais emprega representações dos componentes da linguagem oral, isto é, representa imagens dos movimentos do corpo de quem fala durante a emissão da mensagem. "
      )}

      <Text style={styles.titulo3}>3.4.1 Histórias em Quadrinhos</Text>
      {parseAndRenderMath(
        "As histórias em quadrinhos são histórias escritas que se assemelham ao cinema porque os diálogos são oralizados a partir de um roteiro. Essas histórias que podem ser definidas como histórias em linguagem escrita com características da linguagem oral, possuem também características específicas como é o caso da representação escrita do pensamento do personagem: no cinema isto é possível através do som da voz do personagem, relatando as suas impressões enquanto ele se apresenta absorto, ou com a alternância de imagens atuais com imagens que representam fatos passados ou da imaginação de uma situação futura."
      )}
      {parseAndRenderMath(
        "Esse gênero de literatura deveria sair dos domínios comerciais para ocupar lugar de destaque como instrumento de leitura, utilizado para fins didáticos nas séries iniciais ou até mesmo nas intermediárias. Poder-se-ia utilizar conteúdos diferentes dos caricatos que comumente se vê, priorizando assuntos mais enriquecedores, como a reprodução de fábulas, contos, crônicas e outros textos que possam levar os jovens a se habituarem à leitura e a repensarem o mundo que os cerca. Obviamente, o investimento nessa área iria de encontro aos interesses de quem atualmente explora o mercado das revistas em quadrinhos com os personagens já consagrados pelo público, mas, sem dúvida, poderia ser uma alternativa valiosa para se criar o hábito de leitura nos jovens. "
      )}
      <Text style={styles.titulo3}>3.4.2 Charge ou Cartum</Text>
      {parseAndRenderMath(
        "Charge e Cartum podem ser conjuntamente consideradas como “piadas gráficas”, muitas vezes são mal empregados na imprensa que tende a confundir os termos como sinônimos. Eles não são sinônimos, estes termos servem justamente para definir os tipos de cada piada gráfica. O Cartum é uma piada gráfica para temas universais, que não precisa se prender a uma época ou lugar, sendo mais facilmente compreendido por pessoas de diferentes épocas e lugares. A charge é normalmente um produto jornalístico, referindo-se a um acontecimento real, atrelada a uma notícia e publicada na mesa época desta. Para que se possa entender uma charge antiga é necessário saber o que estava se passando naquele momento histórico, quais os personagens importantes da época e etc. A Charge pode ser entendida como todo Cartum que se torna incompreensível sem o conhecimento prévio do contexto de sua publicação original."
      )}
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(linguagens)/imagens/fig3.2.png")}
          style={styles.image}
        ></Image>
      </View>
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(linguagens)/imagens/fig3.3.png")}
          style={styles.image}
        ></Image>
      </View>
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(linguagens)/imagens/fig3.4.png")}
          style={styles.image}
        ></Image>
      </View>

    </View>,

    //PAGINA 4
    <View key="Um Pouco sobre Pontução">
      <Text style={styles.titulo2}>4 Um Pouco sobre Pontuação</Text>
      {parseAndRenderMath(
        "Para que servem os **sinais de pontuação**? No geral, para representar pausas na fala, nos casos do ponto, vírgula e ponto e vírgula; ou entonações, nos casos do ponto de exclamação e de interrogação, por exemplo. Além de pausa na fala e entonação da voz, os sinais de pontuação reproduzem, na escrita, nossas emoções, intenções e anseios. Vejamos aqui alguns empregos:"
      )}
      <Text style={styles.titulo3}>4.1 Vírgula (,)</Text>
      {parseAndRenderMath(
        "É usada para:"
      )}
      {parseAndRenderMath(
        "a) separar termos que possuem mesma função sintática na oração: O menino berrou, chorou, esperneou e, enfim, dormiu. Nessa oração, a vírgula separa os verbos."
      )}
      {parseAndRenderMath(
        "b) isolar o vocativo: Então, minha cara, não há mais o que se dizer!"
      )}
      {parseAndRenderMath(
        "c) isolar o aposto: O João, ex-integrante da comissão, veio assistir à reunião."
      )}
      {parseAndRenderMath(
        "d) isolar termos antecipados, como complemento ou adjunto:"
      )}
      {parseAndRenderMath(
        "1. Uma vontade indescritível de beber água, eu senti quando olhei para aquele copo suado! (antecipação de complemento verbal)"
      )}
      {parseAndRenderMath(
        "2. Nada se fez, naquele momento, para que pudéssemos sair! (antecipação de adjunto adverbial)"
      )}
      {parseAndRenderMath(
        "e) separar expressões explicativas, conjunções e conectivos: isto é, ou seja, por exemplo, além disso, pois, porém, mas, no entanto, assim, etc."
      )}
      {parseAndRenderMath(
        "f) separar os nomes dos locais de datas: Brasília, 30 de janeiro de 2009."
      )}
      {parseAndRenderMath(
        "g) isolar orações adjetivas explicativas: O filme, que você indicou para mim, é muito mais do que esperava."
      )}

      <Text style={styles.titulo3}>4.2 Pontos</Text>
      <Text style={styles.titulo3}>4.2.1 Ponto-final (.)</Text>
      {parseAndRenderMath(
        "É usado ao final de frases para indicar uma pausa total:"
      )}
      {parseAndRenderMath(
        "a) Não quero dizer nada."
      )}
      {parseAndRenderMath(
        "b) Eu amo minha família."
      )}
      {parseAndRenderMath(
        "E em abreviaturas: Sr., a. C., Ltda., vv., num., adj., obs."
      )}
      <Text style={styles.titulo3}>4.2.2 Ponto de interrogação (?)</Text>
      {parseAndRenderMath(
        "O ponto de interrogação é usado para:"
      )}
      {parseAndRenderMath(
        "a) Formular perguntas diretas:"
      )}
      {parseAndRenderMath(
        "Você quer ir conosco ao cinema? Desejam participar da festa de confraternização?"
      )}
      {parseAndRenderMath(
        "b) Para indicar surpresa, expressar indignação ou atitude de expectativa diante de uma determinada situação:"
      )}
      {parseAndRenderMath(
        "O quê? não acredito que você tenha feito isso! (atitude de indignação)"
      )}
      {parseAndRenderMath(
        "Não esperava que fosse receber tantos elogios! Será que mereço tudo isso? (surpresa)"
      )}
      {parseAndRenderMath(
        "Qual será a minha colocação no resultado do concurso? Será a mesma que imagino? (expectativa)"
      )}
      <Text style={styles.titulo3}>4.2.3 Ponto de Exclamação (!)</Text>
      {parseAndRenderMath(
        "Esse sinal de pontuação é utilizado nas seguintes circunstâncias:"
      )}
      {parseAndRenderMath(
        "a) Depois de frases que expressem sentimentos distintos, tais como: entusiasmo, surpresa, súplica, ordem, horror, espanto:"
      )}
      {parseAndRenderMath(
        "Iremos viajar! (entusiasmo); Foi ele o vencedor! (surpresa); Por favor, não me deixe aqui! (súplica); Que horror! Não esperava tal atitude. (espanto); Seja rápido! (ordem)."
      )}
      {parseAndRenderMath(
        "b) Depois de vocativos e algumas interjeições:"
      )}
      {parseAndRenderMath(
        "Ui! que susto você me deu. (interjeição); Foi você mesmo, garoto! (vocativo)."
      )}
      {parseAndRenderMath(
        "c) Nas frases que exprimem desejo: Oh, Deus, ajude-me!"
      )}
      {parseAndRenderMath(
        "Observações dignas de nota:"
      )}
      {parseAndRenderMath(
        "-> Quando a intenção comunicativa expressar, ao mesmo tempo, questionamento e admiração, o uso dos pontos de interrogação e exclamação é permitido."
      )}
      {parseAndRenderMath(
        "**Observe:** Que que eu posso fazer agora?!"
      )}
      {parseAndRenderMath(
        "-> Quando se deseja intensificar ainda mais a admiração ou qualquer outro sentimento, não há problema algum em repetir o ponto de exclamação ou interrogação. "
      )}
      {parseAndRenderMath(
        "**Note:** Não!!! - gritou a mãe desesperada ao ver o filho em perigo."
      )}

      <Text style={styles.titulo3}>4.2.4 Ponto e vírgula (;)</Text>
      {parseAndRenderMath(
        "É usado para:"
      )}
      {parseAndRenderMath(
        "a) separar itens enumerados:"
      )}
      {parseAndRenderMath(
        "A Matemática se divide em: geometria; trigonometria; álgebra; financeira."
      )}
      {parseAndRenderMath(
        "b) separar um período que já se encontra dividido por vírgulas: Ele não disse nada, apenas olhou ao longe, sentou por cima da grama; queria ficar sozinho com seu cão."
      )}
      <Text style={styles.titulo3}>4.3 Dois-pontos (:)</Text>
      {parseAndRenderMath(
        "É usado quando:"
      )}
      {parseAndRenderMath(
        "a) se vai fazer uma citação ou introduzir uma fala: Ele respondeu: não, muito obrigado!"
      )}
      {parseAndRenderMath(
        "b) se quer indicar uma enumeração: Quero lhe dizer algumas coisas: não converse com pessoas estranhas, não brigue com seus colegas e não responda à professora."
      )}
      <Text style={styles.titulo3}>4.4 Aspas ("")</Text>
      {parseAndRenderMath(
        "São usadas para indicar:"
      )}
      {parseAndRenderMath(
        "a) citação de alguém: “A ordem para fechar a prisão de Guantánamo mostra um início firme. Ainda na edição, os 25 anos do MST e o bloqueio de 2 bilhões de dólares do Oportunity no exterior” (Carta Capital on-line, 30/01/09)"
      )}
      {parseAndRenderMath(
        "b) expressões estrangeiras, neologismos, gírias: Nada pode com a propaganda de “outdoor”."
      )}
      <Text style={styles.titulo3}>4.5 Reticências (...)</Text>
      {parseAndRenderMath(
        "São usadas para indicar supressão de um trecho, interrupção ou dar ideia de continuidade ao que se estava falando:"
      )}
      {parseAndRenderMath(
        "a) (...) Onde está ela, Amor, a nossa casa,"
      )}
      {parseAndRenderMath(
        "O bem que neste mundo mais invejo?"
      )}
      {parseAndRenderMath(
        "O brando ninho aonde o nosso beijo"
      )}
      {parseAndRenderMath(
        "Será mais puro e doce que uma asa? (...)"
      )}
      {parseAndRenderMath(
        "b) E então, veio um sentimento de alegria, paz, felicidade..."
      )}
      {parseAndRenderMath(
        "c) Eu gostei da nova casa, mas do quintal..."
      )}
      <Text style={styles.titulo3}>4.6 Parêntesis ()</Text>
      {parseAndRenderMath(
        "São usados quando se quer explicar melhor algo que foi dito ou para fazer simples indicações."
      )}
      {parseAndRenderMath(
        "Ele comeu, e almoçou, e dormiu, e depois saiu. (o e aparece repetido e, por isso, há o predomínio de vírgulas)."
      )}
      <Text style={styles.titulo3}>4.7 Travessão (-)</Text>
      {parseAndRenderMath(
        "O travessão é indicado para:"
      )}
      {parseAndRenderMath(
        "a) Indicar a mudança de interlocutor em um diálogo:"
      )}
      {parseAndRenderMath(
        "- Quais ideias você tem para revelar?"
      )}
      {parseAndRenderMath(
        "- Não sei se serão bem-vindas."
      )}
      {parseAndRenderMath(
        "- Não importa, o fato é que assim você estará contribuindo para a elaboração deste projeto."
      )}
      {parseAndRenderMath(
        "b) Separar orações intercaladas, desempenhando as funções da vírgula e dos parênteses: "
      )}
      {parseAndRenderMath(
        "Precisamos acreditar sempre - disse o aluno confiante - que tudo irá dar certo"
      )}
      {parseAndRenderMath(
        "Não aja dessa forma - falou a mãe irritada - pois pode ser arriscado."
      )}
      {parseAndRenderMath(
        "c) Colocar em evidência uma frase, expressão ou palavra:"
      )}
      {parseAndRenderMath(
        "O prêmio foi destinado ao melhor aluno da classe - uma pessoa bastante esforçada."
      )}
      {parseAndRenderMath(
        "Gostaria de parabenizar a pessoa que está discursando - meu melhor amigo."
      )}

    </View>,

    //PAGINA 5
    <View key="Classes Gramaticais">
      <Text style={styles.titulo2}>5 Classes Gramaticais</Text>
      {parseAndRenderMath(
        "Na língua portuguesa há dez classes de palavras ou **classes gramaticais**. De maneira geral, a morfologia estuda a origem, as derivações e as flexões das palavras, expressas, na língua portuguesa, por **dez classes morfológicas** ou gramaticais de acordo com a função de cada, das quais seis delas são classificadas como **palavras variáveis** (substantivo, adjetivo, pronome, numeral, artigo e verbo), uma vez que podem variar em gênero (masculino e feminino), número (singular e plural) e grau (aumentativo e diminutivo) e as **palavras invariáveis** (preposição, conjunção, interjeição e advérbio):"
      )}
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(linguagens)/imagens/fig5.1.png")}
          style={styles.image}
        ></Image>
      </View>

      <Text style={styles.titulo3}>5.1 Substantivo</Text>
      {parseAndRenderMath(
        "É toda a palavra que denomina um ser; é usada para nomear pessoas, coisas, animais, lugares e sentimentos. Normalmente vem precedida de artigo. Exemplo: O cachorro tomou banho. (Cachorro é um substantivo) Os substantivos classificam-se em:"
      )}
      {parseAndRenderMath(
        "Comum/ Próprio, Concreto/Abstrato, Primitivo/Derivado, Simples/Composto, Coletivo"
      )}
      <Text style={styles.titulo3}>5.2 Artigo</Text>
      {parseAndRenderMath(
        "É a palavra que se coloca antes do substantivo para determiná-lo ou indeterminálo. Os artigos classificam-se em:"
      )}
      {parseAndRenderMath(
        "Definidos: o / a / os / as"
      )}
      {parseAndRenderMath(
        "Indefinidos: um / uns / uma / umas"
      )}
      <Text style={styles.titulo3}>5.3 Adjetivo</Text>
      {parseAndRenderMath(
        "É a palavra que caracteriza o substantivo."
      )}
      {parseAndRenderMath(
        "Exemplo: Aquela moça é muito bonita. (Bonita é um adjetivo)"
      )}
      <Text style={styles.titulo3}>5.4 Numeral</Text>
      {parseAndRenderMath(
        "É uma palavra que exprime número, ordem numérica, múltiplo ou fração."
      )}
      <Text style={styles.titulo3}>5.5 Pronome</Text>
      {parseAndRenderMath(
        "É a palavra que substitui ou acompanha o substantivo"
      )}
      <Text style={styles.titulo3}>5.6 Verbo</Text>
      {parseAndRenderMath(
        "É a palavra que exprime ação, estado ou fenômeno da natureza."
      )}
      <Text style={styles.titulo3}>5.7 Advérbio</Text>
      {parseAndRenderMath(
        "É a palavra invariável que modifica o sentido de um verbo, de um adjetivo ou de outro advérbio. Os principais advérbios indicam circunstâncias de:"
      )}
      {parseAndRenderMath(
        "Tempo: ontem, hoje, amanhã, já, cedo, tarde, antigamente..."
      )}
      {parseAndRenderMath(
        "Lugar: aqui, ali, acolá, aí, lá, perto, longe, acima, abaixo, dentro, fora..."
      )}
      {parseAndRenderMath(
        "Modo: depressa, devagar, bem, mal, calmamente, alegremente..."
      )}
      {parseAndRenderMath(
        "Intensidade: muito, menos, pouco, mais, bastante..."
      )}
      {parseAndRenderMath(
        "Negação: não, absolutamente..."
      )}
      {parseAndRenderMath(
        "Dúvida: talvez, provavelmente, possivelmente..."
      )}
      {parseAndRenderMath(
        "Afirmação: sim, certamente, realmente..."
      )}
      <Text style={styles.titulo3}>5.8 Preposição</Text>
      {parseAndRenderMath(
        "É uma palavra invariável que liga um termo dependente a um termo principal, estabelecendo uma relação entre eles. As preposições essenciais são:"
      )}
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(linguagens)/imagens/fig5.2.png")}
          style={styles.image}
        ></Image>
      </View>

      <Text style={styles.titulo3}>5.9 Conjunção</Text>
      {parseAndRenderMath(
        "É a palavra invariável que liga: duas palavras com o mesmo valor, numa oração ou duas orações entre si."
      )}
      <Text style={styles.titulo3}>5.10 Interjeição</Text>
      {parseAndRenderMath(
        "São palavras invariáveis que expressam uma emoção, um sentimento. As interjeições mais comuns são:"
      )}
      {parseAndRenderMath(
        "De alegria: ah! oh! oba!"
      )}
      {parseAndRenderMath(
        "De aplauso: viva! bis! bravo!"
      )}
      {parseAndRenderMath(
        "De chamamento: oi!olá! alô!"
      )}
      {parseAndRenderMath(
        "De dor: ui! ai!"
      )}
      {parseAndRenderMath(
        "De silêncio: silêncio! psiu!"
      )}
      {parseAndRenderMath(
        "De surpresa: oh! ah!"
      )}
      {parseAndRenderMath(
        "De advertência: cuidado! atenção!"
      )}
      {parseAndRenderMath(
        "De alívio: ufa! arre!"
      )}
      {parseAndRenderMath(
        "De admiração: ah!oh! puxa! nossa!"
      )}
      {parseAndRenderMath(
        "De desejo: oxalá, tomara!"
      )}
      {parseAndRenderMath(
        "De saudação: salve! viva! olá!"
      )}
      {parseAndRenderMath(
        "De terror: ui! credo! Cruzes!"
      )}

    </View>,

    //PAGINA 6
    <View key="A Linguagem Literária">
      <Text style={styles.titulo2}>Estudos Literários</Text>
      <Text style={styles.titulo2}>1 A Linguagem Literária</Text>
      <Text style={styles.titulo3}>O que é Literatura?</Text>
      {parseAndRenderMath(
        "**Um caso de poesia...**"
      )}
      {parseAndRenderMath(
        "Paulo tinha fama de mentiroso."
      )}
      {parseAndRenderMath(
        "Um dia chegou em casa dizendo que vira no campo dois dragões da independência cuspindo fogo e lendo fotonovelas."
      )}
      {parseAndRenderMath(
        "A mãe botou-o de castigo, mas na semana seguinte ele veio contando que ca íra no pátio da escola um pedaço de lua, todo cheio de buraquinhos, feito queijo, e ele provou e tinha gosto a queijo. Desta vez Paulo não só ficou sem sobremesa como foi proibido de jogar futebol durante quinze dias."
      )}
      {parseAndRenderMath(
        "Quando o menino voltou falando que todas as borboletas da Terra passaram pela chácara de Siá Elpídia e queriam formar um tapete voador para transportá-lo ao sétimo céu, a mãe decidiu levá-lo ao médico."
      )}
      {parseAndRenderMath(
        "Após o exame, o Dr. Epaminondas abanou a cabeça:"
      )}
      {parseAndRenderMath(
        "- Nada a fazer, Dona Coló. Este menino é mesmo um caso de poesia. - Carlos Drummond de Andrade"
      )}

      {parseAndRenderMath(
        "Embora a palavra “Literatura” nos seja bastante familiar, quando precisamos dar uma definição a ela, nem sempre conseguimos fazê-lo com clareza ou não conseguimos definir e reconhecer o que torna um texto literário. Algumas vezes, chegamos até a generalizar as produções escritas como literatura. No entanto, é importante saber que os textos literários possuem suas particularidades e a forma como eles são elaborados marcam sua diferença em relação a outros gêneros textuais."
      )}
      {parseAndRenderMath(
        "Em primeiro lugar, é importante saber que a **Literatura é uma arte** e, como toda arte, ela possui sua matéria-prima, ou seja, o elemento com o qual ela trabalha para compor uma obra. Assim, esse elemento primordial da literatura é a palavra, no entanto a Literatura não deixa de fazer uso de outros tipos de recursos."
      )}
      {parseAndRenderMath(
        "Isso significa dizer que o texto literário trabalhará de forma diferenciada com a linguagem, estabelecendo novos sentidos para as palavras e, por meio delas, criando mundos ficcionais. É o que nos mostra o texto acima, de Drummond, através da personagem Paulo. O menino, de forma inventiva, transforma os elementos da realidade: assim, os “dragões da independência”, que originalmente é um regimento de cavalaria do exército, desloca-se para o ser fabuloso cuspidor de fogo, os quais, inusitadamente, estão lendo fotonovelas. Tão inusitado quanto um pedaço de lua cair no pátio da escola. Assim, é a partir dessa transformação da realidade, da transgressão ao comum, que a Literatura se situa."
      )}
      {parseAndRenderMath(
        "Para compreendermos melhor o mundo literário, iremos estudar alguns conceitos que são fundamentais para entendermos o texto literário: a **denotação**, a **conotação** e a **polissemia**."
      )}

      <Text style={styles.titulo3}>1.1 Denotação e Conotação</Text>
      {parseAndRenderMath(
        "Leia os textos abaixo:"
      )}
      {parseAndRenderMath(
        "**Texto I**"
      )}
      {parseAndRenderMath(
        "A orientação realizada através da observação das estrelas tem seu uso difundido entre pessoas do campo, pescadores e navegadores, essas geralmente conhecem as características gerais do céu durante a **noite**."
      )}
      {parseAndRenderMath(
        "**Texto II**"
      )}
      {parseAndRenderMath(
        "Quando você foi embora fez-se **noite** em meu viver"
      )}
      {parseAndRenderMath(
        "Forte eu sou, mas não tem jeito"
      )}
      {parseAndRenderMath(
        "Hoje eu tenho que chorar - Milton Nascimento"
      )}

      {parseAndRenderMath(
        "Observe que, em ambos os textos, há a palavra **noite**. No entanto, elas não são usadas no mesmo sentido, ganhando uma significação diferente em cada um deles. Podemos dizer que, no Texto I, **noite** está no sentido DENOTATIVO e, no II, no sentido CONOTATIVO."
      )}
      {parseAndRenderMath(
        "Então, inferimos que a **denotação** ocorre quando usamos a palavra no seu sentido primitivo, original. Se pesquisarmos no dicionário, encontraremos:"
      )}
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(linguagens)/imagens/fig6.1.png")}
          style={styles.image}
        ></Image>
      </View>
      {parseAndRenderMath(
        "Essa definição é compatível com o uso da palavra no Texto I, já que ele fala exatamente de um período de tempo. Já no Texto II, esse sentido não se confirma, pois a voz da canção diz que “fez-se noite em meu viver”, ou seja, a palavra está no sentido figurado e podemos pensar que noite, aqui, remete à ideia de melancolia, solidão, abandono. Quando há essa mudança de significado nas palavras, estamos no campo da **CONOTAÇÃO**."
      )}
      {parseAndRenderMath(
        "Outro exemplo: "
      )}
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(linguagens)/imagens/fig6.2.png")}
          style={styles.image}
        ></Image>
      </View>
      {parseAndRenderMath(
        "Embora a conotação não seja exclusiva da Literatura, os textos literários - poemas,contos, crônicas, romances, etc. - apresentarão, predominantemente, as palavras nosentido conotativo, figurado."
      )}

      <Text style={styles.titulo3}>1.2 Polissemia</Text>
      {parseAndRenderMath(
        "Outro tipo de recurso que encontramos nos textos literários é a POLISSEMIA, que consiste em a mesma palavra ou locução apresentar mais de um significado no texto."
      )}
      {parseAndRenderMath(
        "O quadrinho de Luis Fernando Verissimo ilustra esse fenômeno:"
      )}
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(linguagens)/imagens/fig6.3.png")}
          style={styles.image}
        ></Image>
      </View>
      {parseAndRenderMath(
        "Perceba que a palavra “chato(a)” aparece em dois sentidos: no segundo quadrinho, chato se relaciona a uma superfície plana, sem relevo; no terceiro, em que a palavra é retomada por elipse “E [chata] nos domingos sem futebol”, seu significado refere-se a entediante, maçante, sem graça. Assim, como uma mesma palavra adquire mais de um sentido, estamos diante da POLISSEMIA. É o que vemos, também, no poema de Mário Quintana:"
      )}

      {parseAndRenderMath(
        "**POEMINHA DO CONTRA**"
      )}
      {parseAndRenderMath(
        "Todos esses que aí estão"
      )}
      {parseAndRenderMath(
        "Atravancando meu caminho,"
      )}
      {parseAndRenderMath(
        "Eles passarão..."
      )}
      {parseAndRenderMath(
        "Eu passarinho!"
      )}

      {parseAndRenderMath(
        "O poeta faz uma brincadeira entre passarão - que pode ser entendido como a 3ª pessoa do plural do verbo “passar”, no futuro do presente -, ou o aumentativo de “pássaro”, marcando contraposição a “passarinho”, com o qual o eu lírico se identifica."
      )}

      <Text style={styles.titulo3}>1.3 Figuras de Linguagem</Text>
      {parseAndRenderMath(
        "As figuras de linguagem ou de estilo são empregadas para valorizar o texto, tornando a linguagem mais expressiva. É um recurso linguístico para expressar de formas diferentes experiências comuns, conferindo originalidade, emotividade ou poeticidade ao discurso. São várias as figuras de linguagem, conheceremos algumas delas, bastante utilizadas no discurso literário."
      )}
      <Text style={styles.titulo3}>1.3.1 Comparação e Metáfora</Text>
      {parseAndRenderMath(
        "Algumas vezes, estabelecemos similaridades entre dois elementos de natureza distinta, pois percebemos ou queremos criar uma identificação entre esses elementos. É nesse sentido que operam a comparação e a metáfora. Observe:"
      )}

      {parseAndRenderMath(
        "**Exemplo 1:**"
      )}
      {parseAndRenderMath(
        "Quero ficar no teu corpo"
      )}
      {parseAndRenderMath(
        "**Feito tatuagem**"
      )}
      {parseAndRenderMath(
        "Que é pra te dar coragem"
      )}
      {parseAndRenderMath(
        "Pra seguir viagem"
      )}
      {parseAndRenderMath(
        "Quando a noite vem (Chico Buarque)"
      )}

      {parseAndRenderMath(
        "**Exemplo 2:**"
      )}
      {parseAndRenderMath(
        "Meu coração tombou na vida"
      )}
      {parseAndRenderMath(
        "**tal qual uma estrela ferida**"
      )}
      {parseAndRenderMath(
        "pela flecha de um caçador. (Cecília Meireles)"
      )}

      {parseAndRenderMath(
        "Os textos acima usam da COMPARAÇÃO para causar um efeito poético no que expressam. No primeiro, por exemplo, para demonstrar a força e intensidade do desejo de ficar junto, escolheu-se a tatuagem como representação, por seu caráter de permanência e durabilidade. "
      )}
      {parseAndRenderMath(
        "Assim, definimos a **COMPARAÇÃO como a aproximação entre dois elementos que se identificam, ligados por conectivos comparativos explícitos - feito, assim como, tal, como, tal qual, tal como, qual, que nem - e alguns verbos - parecer, assemelhar-se e outros**."
      )}
      {parseAndRenderMath(
        "Já na METÁFORA, substitui-se um termo por outro, tendo em vista uma relação de semelhança entre eles. A metáfora é uma comparação abreviada, em que o conectivo comparativo não está expresso."
      )}

      {parseAndRenderMath(
        "**Exemplo**"
      )}
      {parseAndRenderMath(
        "Encostei-me a ti, sabendo que eras somente **onda**."
      )}
      {parseAndRenderMath(
        "Sabendo bem que **eras nuvem**, depus a minha vida em ti,"
      )}
      {parseAndRenderMath(
        "Como sabia bem tudo isso, e dei-me ao teu destino, frágil, "
      )}
      {parseAndRenderMath(
        "Fiquei sem poder chorar quando caí. (Cecília Meireles)"
      )}
      {parseAndRenderMath(
        "Nesse poema, para falar da inconstância e instabilidade de uma relação, o eu lírico usa as imagens da onda e da nuvem, que são elementos sem forma estável, que rapidamente se desfazem, dando a ideia de algo passageiro, breve, transitório."
      )}

      <Text style={styles.titulo3}>1.3.2 Metonímia</Text>
      {parseAndRenderMath(
        "Metonímia é a substituição de uma palavra por outra, devido a uma ligação objetiva de sentido entre elas. Diferente da metáfora, não é por semelhança que usamos a metonímia, mas por ela proporcionar um reconhecimento imediato daquilo a que se refere. As relações metonímicas podem ser:"
      )}
      {parseAndRenderMath(
        "-> da marca pelo produto: “Hoje, no café da manhã, tomei dois copos de **Nescau**.” (=achocolatado em pó)"
      )}
      {parseAndRenderMath(
        "-> da causa pelo efeito e vice-versa: “Sou alérgico **à cigarro**.” (= à fumaça)"
      )}
      {parseAndRenderMath(
        "-> do continente pelo conteúdo e vice-versa: “Antes de sair, tomamos **um cálice de licor**.”"
      )}
      {parseAndRenderMath(
        "-> do autor pela obra: “Comprei um **Portinari**.” (=quadro)"
      )}
      {parseAndRenderMath(
        "-> da parte pelo todo e vice-versa: “**A cidade inteira** viu assombrada, de queixo caído, o pistoleiro sumir de ladrão, fugindo nos **cascos** de seu cavalo.”"
      )}

      <Text style={styles.titulo3}>1.3.3 Metonímia</Text>
      {parseAndRenderMath(
        "A hipérbole consiste no exagero de uma ideia, a fim de proporcionar uma imagem emocionante e de impacto."
      )}
      {parseAndRenderMath(
        "Eu **nunca mais vou respirar**"
      )}
      {parseAndRenderMath(
        "Se você não me notar"
      )}
      {parseAndRenderMath(
        "**Eu posso até morrer de fome**"
      )}
      {parseAndRenderMath(
        "Se você não me amar (Cazuza)"
      )}

      <Text style={styles.titulo3}>1.3.4 Eufemismo</Text>
      {parseAndRenderMath(
        "Consiste no emprego de expressões polidas e suaves que abrandam palavras desagradáveis ou grosseiras. Veja como Manuel Bandeira designa a morte na estrofe abaixo:"
      )}
      {parseAndRenderMath(
        "**Quando a Indesejada das gentes chegar**"
      )}
      {parseAndRenderMath(
        "(Não sei se dura ou caroável)"
      )}
      {parseAndRenderMath(
        "Talvez eu tenha medo"
      )}
      {parseAndRenderMath(
        "Talvez sorria, ou diga:"
      )}
      {parseAndRenderMath(
        "- Alô, iniludível!"
      )}

      <Text style={styles.titulo3}>1.4 Figuras de Som</Text>
      {parseAndRenderMath(
        "Dentre as figuras de linguagem, há as chamadas **figuras de som ou harmonia**, que recebem este nome por trabalhem a sonoridade no texto. Veremos três delas."
      )}
      <Text style={styles.titulo3}>1.4.1 Aliteração: repetição de consoantes ou sons consonantais</Text>
      {parseAndRenderMath(
        "**Exemplo 1:**"
      )}
      {parseAndRenderMath(
        "**Ch**ove **ch**uva **ch**overando"
      )}
      {parseAndRenderMath(
        "que a cidade de meu bem"
      )}
      {parseAndRenderMath(
        "está-se toda se lavando (Oswald de Andrade)"
      )}
      {parseAndRenderMath(
        "**Exemplo 2:**"
      )}
      {parseAndRenderMath(
        "Toda **g**ente homena**g**eia"
      )}
      {parseAndRenderMath(
        "**J**anuária na **j**anela"
      )}
      {parseAndRenderMath(
        "Até o mar faz maré cheia"
      )}
      {parseAndRenderMath(
        "Pra chegar mais perto dela (Chico Buarque)"
      )}

      <Text style={styles.titulo3}>1.4.2 Assonância: repetição de som vocálico</Text>
      {parseAndRenderMath(
        "Minha foz do Iguaç**u**"
      )}
      {parseAndRenderMath(
        "Pólo s**u**l, meu az**u**l"
      )}
      {parseAndRenderMath(
        "L**u**z do sentimento n**u** (Djavan)"
      )}

      <Text style={styles.titulo3}>1.4.3 Onomatopeia: palavras que representam sons e/ou ruídos.</Text>
      {parseAndRenderMath(
        "Troc...troc...troc....troc..."
      )}
      {parseAndRenderMath(
        "ligeirinhos, ligeirinhos,"
      )}
      {parseAndRenderMath(
        "troc...troc...troc....troc..."
      )}
      {parseAndRenderMath(
        "vão cantando os tamanquinhos. (Cecília Meireles)"
      )}

    </View>,

    <View key="Gêneros Literários">
      <Text style={styles.titulo2}>2 Gêneros Literários</Text>


      {/* <Text style={styles.titulo3}>O que é Literatura?</Text>
      {parseAndRenderMath(
        ""
      )}
      <View style={styles.imageView}>
        <Image
          source={require("@/app/(linguagens)/imagens/fig5.2.png")}
          style={styles.image}
        ></Image>
      </View> */}

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
