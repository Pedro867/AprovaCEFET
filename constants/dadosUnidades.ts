// importacao dos icons em svg (maior qualidade)
//matematica
import IconConjuntos from "@/assets/images/matematica/vector.svg";
import IconPotencia from "@/assets/images/matematica/math-formula.svg";
import IconFatoracao from "@/assets/images/matematica/group.svg";
import IconEquacao from "@/assets/images/matematica/graphic-designing.svg";
import IconFuncoes from "@/assets/images/matematica/graphic-designing.svg";
import IconRegraDeTres from "@/assets/images/matematica/graphic-designing.svg";
import IconGeometria from "@/assets/images/matematica/graphic-designing.svg";

export const unidadesMatematica = [
  {
    title: "Conjuntos",
    description:
      "Conceitos básicos, tipos de conjuntos numéricos (naturais, inteiros, racionais, etc.) e operações como MMC e MDC.",
    Icon: IconConjuntos,
    route: "/(matematica)/(conjuntos)/conjuntos", 
  },
  {
    title: "Potenciação e Radiciação",
    description:
      "Propriedades e regras das operações, notação científica e racionalização de denominadores.",
    Icon: IconPotencia,
    route: "/(matematica)/(potencia_radiciacao)/pot_rad",
  },
  {
    title: "Fatoração e Sistemas Lineares",
    description:
      "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(matematica)/(fatoracao_sistemas)/fat_sis",
  },
  {
    title: "Equação do 2º Grau",
    description:
      "Resolução por fatoração e Bhaskara, relação de soma e produto entre as raízes e equações biquadradas.",
    Icon: IconEquacao,
    route: "/(matematica)/(equacoes)/equacoes",
  },
  {
    title: "Funções",
    description:
      "Características, propriedades e gráficos das funções de 1º e 2º grau. Análise de raízes e vértices.",
    Icon: IconFuncoes,
    route: "/(matematica)/(funcoes)/funcoes",
  },
  {
    title: "Grandezas Proporcionais e Regra de três",
    description:
      "Esta unidade explora as relações entre grandezas direta e inversamente proporcionais. Em seguida, aplica esses conceitos para resolver problemas práticos através da regra de três simples e composta.",
    Icon: IconRegraDeTres,
    route: "/(matematica)/(grandezas)/grandezas",
  },
  {
    title: "Geometria",
    description:
      "Geometria plana, Teorema de Tales, semelhança de triângulos, Teorema de Pitágoras e cálculo de áreas.",
    Icon: IconGeometria,
    route: "/(matematica)/(geometria)/geometria",
  },
];

export const unidadesLinguagens = [
  {
    title: "Linguagem, Língua e Variedade Regional",
    // description:
    //   "Conceitos básicos, tipos de conjuntos numéricos (naturais, inteiros, racionais, etc.) e operações como MMC e MDC.",
    Icon: IconConjuntos,
    route: "/(linguagens)/(linguagem)/linguagem", 
  },
  {
    title: "Tipos Textuais/Discursivos",
    // description:
    //   "Propriedades e regras das operações, notação científica e racionalização de denominadores.",
    Icon: IconPotencia,
    route: "/(linguagens)/(tipos)/tipos",
  },
  {
    title: "Gêneros Textuais",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(linguagens)/(genText)/genText",
  },
  {
    title: "Pontuação",
    // description:
    //   "Resolução por fatoração e Bhaskara, relação de soma e produto entre as raízes e equações biquadradas.",
    Icon: IconEquacao,
    route: "/(linguagens)/(pontuacao)/pontuacao",
  },
  {
    title: "Classes Gramaticais",
    // description:
    //   "Características, propriedades e gráficos das funções de 1º e 2º grau. Análise de raízes e vértices.",
    Icon: IconFuncoes,
    route: "/(linguagens)/(classes)/classes",
  },
  {
    title: "A Linguagem Literária",
    // description:
    //   "Esta unidade explora as relações entre grandezas direta e inversamente proporcionais. Em seguida, aplica esses conceitos para resolver problemas práticos através da regra de três simples e composta.",
    Icon: IconRegraDeTres,
    route: "/(linguagens)/(literaria)/literaria",
  },
  {
    title: "Gêneros Literários",
    // description:
    //   "Geometria plana, Teorema de Tales, semelhança de triângulos, Teorema de Pitágoras e cálculo de áreas.",
    Icon: IconGeometria,
    route: "/(linguagens)/(genLit)/genLit",
  },
  {
    title: "Intertextualidade",
    // description:
    //   "Geometria plana, Teorema de Tales, semelhança de triângulos, Teorema de Pitágoras e cálculo de áreas.",
    Icon: IconGeometria,
    route: "/(linguagens)/(inter)/inter",
  },
  {
    title: "Metalinguagem",
    // description:
    //   "Geometria plana, Teorema de Tales, semelhança de triângulos, Teorema de Pitágoras e cálculo de áreas.",
    Icon: IconGeometria,
    route: "/(linguagens)/(meta)/meta",
  },
];

export const unidadesQuimica = [
  {
    title: "Introdução ao Estudo da Química",
    // description:
    //   "Conceitos básicos, tipos de conjuntos numéricos (naturais, inteiros, racionais, etc.) e operações como MMC e MDC.",
    Icon: IconConjuntos,
    route: "/(quimica)/(introducao)/introducao", 
  },
  {
    title: "Substâncias e Misturas",
    // description:
    //   "Propriedades e regras das operações, notação científica e racionalização de denominadores.",
    Icon: IconPotencia,
    route: "/(quimica)/(misturas)/misturas",
  },
  {
    title: "Transformação dos Materiais",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(quimica)/(transformacao)/transformacao",
  },
  {
    title: "Estrutura Atômica dos Materiais",
    // description:
    //   "Resolução por fatoração e Bhaskara, relação de soma e produto entre as raízes e equações biquadradas.",
    Icon: IconEquacao,
    route: "/(quimica)/(estrutura)/estrutura",
  },
  {
    title: "Substâncias Químicas",
    // description:
    //   "Características, propriedades e gráficos das funções de 1º e 2º grau. Análise de raízes e vértices.",
    Icon: IconFuncoes,
    route: "/(quimica)/(substancias)/substancias",
  },
];

export const unidadesBiologia = [
  {
    title: "Origem dos Seres Vivos",
    // description:
    //   "Conceitos básicos, tipos de conjuntos numéricos (naturais, inteiros, racionais, etc.) e operações como MMC e MDC.",
    Icon: IconConjuntos,
    route: "/(biologia)/(origem)/origem", 
  },
  {
    title: "Evolução",
    // description:
    //   "Propriedades e regras das operações, notação científica e racionalização de denominadores.",
    Icon: IconPotencia,
    route: "/(biologia)/(evolução)/evolução",
  },
  {
    title: "Nomeclatura",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(biologia)/(nomeclatura)/nomeclatura",
  },
  {
    title: "Os Cinco Reinos",
    // description:
    //   "Resolução por fatoração e Bhaskara, relação de soma e produto entre as raízes e equações biquadradas.",
    Icon: IconEquacao,
    route: "/(biologia)/(reinos)/reinos",
  },
  {
    title: "Reino Animalia",
    // description:
    //   "Características, propriedades e gráficos das funções de 1º e 2º grau. Análise de raízes e vértices.",
    Icon: IconFuncoes,
    route: "/(biologia)/(animalia)/animalia",
  },
  {
    title: "Plantas",
    // description:
    //   "Esta unidade explora as relações entre grandezas direta e inversamente proporcionais. Em seguida, aplica esses conceitos para resolver problemas práticos através da regra de três simples e composta.",
    Icon: IconRegraDeTres,
    route: "/(biologia)/(plantas)/plantas",
  },
  {
    title: "Células",
    // description:
    //   "Geometria plana, Teorema de Tales, semelhança de triângulos, Teorema de Pitágoras e cálculo de áreas.",
    Icon: IconGeometria,
    route: "/(biologia)/(celulas)/celulas",
  },
  {
    title: "O Corpo Humano",
    // description:
    //   "Geometria plana, Teorema de Tales, semelhança de triângulos, Teorema de Pitágoras e cálculo de áreas.",
    Icon: IconGeometria,
    route: "/(biologia)/(corpo)/corpo",
  },
  {
    title: "Noções de Ecologia",
    // description:
    //   "Geometria plana, Teorema de Tales, semelhança de triângulos, Teorema de Pitágoras e cálculo de áreas.",
    Icon: IconGeometria,
    route: "/(biologia)/(ecologia)/ecologia",
  },
];

export const unidadesFisica = [
  {
    title: "Mecânica",
    // description:
    //   "Conceitos básicos, tipos de conjuntos numéricos (naturais, inteiros, racionais, etc.) e operações como MMC e MDC.",
    Icon: IconConjuntos,
    route: "/(fisica)/(mecanica)/mecanica", 
  },
  {
    title: "Termologia",
    // description:
    //   "Propriedades e regras das operações, notação científica e racionalização de denominadores.",
    Icon: IconPotencia,
    route: "/(fisica)/(termologia)/termologia",
  },
  {
    title: "Ótica",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(fisica)/(otica)/otica",
  },
  {
    title: "Eletricidade",
    // description:
    //   "Resolução por fatoração e Bhaskara, relação de soma e produto entre as raízes e equações biquadradas.",
    Icon: IconEquacao,
    route: "/(fisica)/(eletricidade)/eletricidade",
  },
];

export const unidadesMecanica = [
  {
    title: "Movimento",
    // description:
    //   "Conceitos básicos, tipos de conjuntos numéricos (naturais, inteiros, racionais, etc.) e operações como MMC e MDC.",
    Icon: IconConjuntos,
    route: "/(mecanica)/(movimento)/movimento", 
  },
  {
    title: "Velocidade Média",
    // description:
    //   "Propriedades e regras das operações, notação científica e racionalização de denominadores.",
    Icon: IconPotencia,
    route: "/(mecanica)/(velocidade)/velocidade",
  },
  {
    title: "Aceleração Média",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(mecanica)/(aceleracao)/aceleracao",
  },
  {
    title: "As Leis de Newton do Movimento",
    // description:
    //   "Resolução por fatoração e Bhaskara, relação de soma e produto entre as raízes e equações biquadradas.",
    Icon: IconEquacao,
    route: "/(mecanica)/(newton)/newton",
  },
  {
    title: "Peso, Massa e Densidade",
    // description:
    //   "Características, propriedades e gráficos das funções de 1º e 2º grau. Análise de raízes e vértices.",
    Icon: IconFuncoes,
    route: "/(mecanica)/(peso)/peso",
  },
  {
    title: "Máquinas Simples, Alavancas e Roldanas",
    // description:
    //   "Esta unidade explora as relações entre grandezas direta e inversamente proporcionais. Em seguida, aplica esses conceitos para resolver problemas práticos através da regra de três simples e composta.",
    Icon: IconRegraDeTres,
    route: "/(mecanica)/(maquinas)/maquinas",
  },
  {
    title: "Pressão e Pressão Atmosférica",
    // description:
    //   "Geometria plana, Teorema de Tales, semelhança de triângulos, Teorema de Pitágoras e cálculo de áreas.",
    Icon: IconGeometria,
    route: "/(mecanica)/(pressao)/pressao",
  },
];

export const unidadesTermologia = [
  {
    title: "Calor e Temperatura",
    // description:
    //   "Conceitos básicos, tipos de conjuntos numéricos (naturais, inteiros, racionais, etc.) e operações como MMC e MDC.",
    Icon: IconConjuntos,
    route: "/(termologia)/(temperatura)/temperatura", 
  },
  {
    title: "Equilíbrio Térmico",
    // description:
    //   "Propriedades e regras das operações, notação científica e racionalização de denominadores.",
    Icon: IconPotencia,
    route: "/(termologia)/(equilibrio)/equilibrio",
  },
  {
    title: "Calor X Temperatura",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(termologia)/(calor)/calor",
  },
];

export const unidadesOtica = [
  {
    title: "O que é a Luz?",
    // description:
    //   "Conceitos básicos, tipos de conjuntos numéricos (naturais, inteiros, racionais, etc.) e operações como MMC e MDC.",
    Icon: IconConjuntos,
    route: "/(otica)/(luz)/luz", 
  },
  {
    title: "Formação de Sombras e Penumbras",
    // description:
    //   "Propriedades e regras das operações, notação científica e racionalização de denominadores.",
    Icon: IconPotencia,
    route: "/(otica)/(sombras)/sombras",
  },
  {
    title: "Fenômenos Luminosos",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(otica)/(fenomenos)/fenomenos",
  },
  {
    title: "Formação de Imagens em Espelhos Planos",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(otica)/(espelhos)/espelhos",
  },
];

export const unidadesEletricidade = [
  {
    title: "Carga Elétrica",
    // description:
    //   "Conceitos básicos, tipos de conjuntos numéricos (naturais, inteiros, racionais, etc.) e operações como MMC e MDC.",
    Icon: IconConjuntos,
    route: "/(eletricidade)/(carga)/carga", 
  },
  {
    title: "Processos de Eletrização",
    // description:
    //   "Propriedades e regras das operações, notação científica e racionalização de denominadores.",
    Icon: IconPotencia,
    route: "/(eletricidade)/(eletrizacao)/eletrizacao",
  },
  {
    title: "Corrente Elétrica",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(eletricidade)/(corrente)/corrente",
  },
  {
    title: "Resistência Elétrica",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(eletricidade)/(resistencia)/resistencia",
  },
  {
    title: "Geradores de Corrente Elétrica",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(eletricidade)/(geradores)/geradores",
  },
  {
    title: "Resistores",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(eletricidade)/(resistores)/resistores",
  },
  {
    title: "Potência Elétrica e Efeito Joule",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(eletricidade)/(potencia)/potencia",
  },
  {
    title: "Consumo de Energia Elétrica",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(eletricidade)/(consumo)/consumo",
  },
];

export const unidadesGeografia = [
  {
    title: "Limites e Fronteiras / Cartografia",
    // description:
    //   "Conceitos básicos, tipos de conjuntos numéricos (naturais, inteiros, racionais, etc.) e operações como MMC e MDC.",
    Icon: IconConjuntos,
    route: "/(geografia)/(cartografia)/cartografia", 
  },
  {
    title: "Os Mapas",
    // description:
    //   "Propriedades e regras das operações, notação científica e racionalização de denominadores.",
    Icon: IconPotencia,
    route: "/(geografia)/(mapas)/mapas",
  },
  {
    title: "Globalização e Ordem Mundial",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(geografia)/(globalizacao)/globalizacao",
  },
  {
    title: "O Relevo Terrestre",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(geografia)/(relevo)/relevo",
  },
  {
    title: "Climas do Brasil e do Mundo",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(geografia)/(climas)/climas",
  },
  {
    title: "Biomas do Brasil e do Mundo / Hidrografia",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(geografia)/(biomas)/biomas",
  },
  {
    title: "A Dinâmica Demográfica no Brasil e no Mundo",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(geografia)/(demografia)/demografia",
  },
  {
    title: "A Urbanização no Brasil e no Mundo",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(geografia)/(urbanizacao)/urbanizacao",
  },
  {
    title: "As Atividades Agropecuárias no Brasil e no Mundo",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(geografia)/(agro)/agro",
  },
  {
    title: "O Uso da Energia no Brasil e no Mundo",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(geografia)/(energia)/energia",
  },
  {
    title: "A Regionalização do Brasil",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(geografia)/(regionalizacao)/regionalizacao",
  },
];

export const unidadesHistoria = [
  {
    title: "Carga Elétrica",
    // description:
    //   "Conceitos básicos, tipos de conjuntos numéricos (naturais, inteiros, racionais, etc.) e operações como MMC e MDC.",
    Icon: IconConjuntos,
    route: "/(eletricidade)/(carga)/carga", 
  },
  {
    title: "Processos de Eletrização",
    // description:
    //   "Propriedades e regras das operações, notação científica e racionalização de denominadores.",
    Icon: IconPotencia,
    route: "/(eletricidade)/(eletrizacao)/eletrizacao",
  },
  {
    title: "Corrente Elétrica",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(eletricidade)/(corrente)/corrente",
  },
  {
    title: "Resistência Elétrica",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(eletricidade)/(resistencia)/resistencia",
  },
  {
    title: "Geradores de Corrente Elétrica",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(eletricidade)/(geradores)/geradores",
  },
  {
    title: "Resistores",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(eletricidade)/(resistores)/resistores",
  },
  {
    title: "Potência Elétrica e Efeito Joule",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(eletricidade)/(potencia)/potencia",
  },
  {
    title: "Consumo de Energia Elétrica",
    // description:
    //   "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(eletricidade)/(consumo)/consumo",
  },
];