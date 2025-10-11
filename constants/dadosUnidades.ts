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