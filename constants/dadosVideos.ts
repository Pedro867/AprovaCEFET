
export interface Video {
  id: string; // ID do vídeo no YouTube
  title: string;
  duration: string;
}

export interface Playlist {
  //id: string;
  title: string;
  creator: string;
  totalDuration: string;
  videos: Video[];
}

//por enquanto só de conjuntos para testes
export const playlistConjuntos: Playlist = { 
  //id: "PLTPg64KdGgYgTXWPsURDnPBd7GUwPVBLx", TALVEZ  sera necessário se for usar uma APi p carregar os videos automaticamente
  title: "Conjuntos (Curso Completo)",
  creator: "Professor Ferreto",
  totalDuration: "~3 Horas",
  videos: [
    { id: '0aUEDxYjZg8', title: 'Introdução (Aula 1 de 4)', duration: '20 Min 9 Seg' },
    { id: 'Wxm3ugnq9Sw', title: 'Conjuntos: Subconjuntos e Conjunto das Partes (Aula 2 de 4)', duration: '20 Min 19 Seg' },
    { id: 'c5a99sX-Sq8', title: 'Conjuntos: União e Intersecção (Aula 3 de 4)', duration: '28 Min 39 Seg'  },
    { id: 'eZfFpnvudR0', title: 'Conjuntos: Diferença e Complementar (Aula 4 de 4)', duration: '15 Min 25 Seg'  },
    { id: 'wVZYyOuz9GI', title: 'Questões Comentadas: Conjuntos - Nível Básico', duration: '24 Min 16 Seg'  },
    { id: 'id8fXOFnoio', title: 'Questões Comentadas: Conjuntos - Nível Intermediário', duration: '31 Min 12 Seg'  },
    { id: '6ZZfEs-ccAY', title: 'Questões Comentadas: Conjuntos - Nível Avançado', duration: '21 Min 03 Seg'  },
  ],
};

export const playlistPotencia_Radiciacao: Playlist = { 
  title: "",
  creator: "GIS COM GIZ",
  totalDuration: "~30 Minutos",
  videos: [
    { id: 'uqZuvrV7cEs', title: 'POTENCIAÇÃO E RADICIAÇÃO COM RADICAIS - Prof. Gis', duration: '29 Min 13 Seg' },
    
  ],
};

export const playlistFatSis: Playlist = { 
  title: "",
  creator: "Dicasdemat Sandro Curió",
  totalDuration: "~12 Minutos",
  videos: [
    { id: 'BoJaNfpV4Tk', title: 'FATORAÇÃO ALGÉBRICA | RÁPIDO E FÁCIL', duration: '11 Min 23 Seg' },
    
  ],
};

export const playlistEquacoes: Playlist = { 
 
  title: "Equação do 2º Grau - Uma abordagem completa",
  creator: "Equaciona Com Paulo Pereira",
  totalDuration: "~2 Horas",
  videos: [
    { id: 'nD6Xu20ADGs', title: '📊 Definição de Equação do 2° Grau e Resolução de Equações Incompletas 🔷 Com vários exemplos! #01', duration: '28 Min 55 Seg' },
    { id: 'IHyeqc5SeXM', title: '📊 Aprenda Bhaskara de vez! 🔷 Resolução de Equação completa do 2° grau e Discriminante #02', duration: '20 Min 26 Seg' },
    { id: '1oq3nriB7fU', title: '📊 Relação entre Raízes e Coeficientes 🔷 Completo e com vários exemplos #03', duration: '28 Min 02 Seg'  },
    { id: '5i0Lq6TZW6k', title: '📊 Equação de 2° Grau como você nunca viu! 🔷 Método Po-Shen Lo. #04', duration: '12 Min 37 Seg'  },
    { id: '2v3HKYlFlhM', title: '📊 Equação de 2° Grau FÁCIL 🔷 Com material concreto. #05', duration: '10 Min 52 Seg'  },

  ],
};

export const playlistFuncoes: Playlist = { 

  title: "Funções - Conceitos Iniciais e Fundamentais",
  creator: "Professor Ferreto",
  totalDuration: "~4 Horas",
  videos: [
    { id: 'SPZqQ5qn3P0', title: 'Funções: Noções Básicas (Aula 1 de 15)', duration: '27 Min 42 Seg' },
    { id: 'G3zjNRYbDv8', title: 'Funções: Domínio, Contradomínio e Conjunto Imagem (Aula 2 de 15)', duration: '32 Min 10 Seg' },
    { id: 'Y1urlgE0lBU', title: 'Funções: Estudo do Domínio das Funções Reais (Aula 3 de 15)', duration: '19 Min 09 Seg'  },
    { id: 'iC4q1AGeN5A', title: 'Funções: Noções Básicas de Plano Cartesiano (Aula 4 de 15)', duration: '10 Min 55 Seg'  },
    { id: 'K7wtLRXGLJw', title: 'Funções: Construção de Gráficos (Aula 5 de 15)', duration: '11 Min 56 Seg'  },
    { id: 'w13aeOGO3ZI', title: 'Funções: Domínio e Imagem Através do Gráfico (Aula 6 de 15)', duration: '13 Min 50 Seg'  },
    { id: 'xsIMsYRl46M', title: 'Funções: Reconhecendo uma Função (Aula 7 de 15)', duration: '9 Min 26 Seg'  },
    { id: '5aLsdGSxCM4', title: 'Funções: Analisando o Gráfico de Funções (Aula 8 de 15)', duration: '18 Min 48 Seg' },
    { id: '8sXnloWAU8s', title: 'Questões Comentadas: Análise de Gráficos (Aula 9 de 15)', duration: '34 Min 19 Seg' },
    { id: 'HYvlmUiRpGc', title: 'Funções: Função Par e Função Ímpar (Aula 10 de 15)', duration: '21 Min 12 Seg'  },
    { id: 'OMvGmAB96do', title: 'Funções: Função Injetora (Função Injetiva) (Aula 11 de 15)', duration: '16 Min 11 Seg'  },
    { id: '057CkKna7kM', title: 'Funções: Função Sobrejetora (Função Sobrejetiva) (Aula 12 de 15)', duration: '13 Min 48 Seg'  },
    { id: 'B8TtvV_vKQc', title: 'Funções: Função Bijetora (Função Bijetiva) (Aula 13 de 15)', duration: '23 Min 19 Seg'  },
    { id: 'V9yhPL87lGs', title: 'Funções: Função Composta (Composição de Funções) (Aula 14 de 15)', duration: '24 Min 10 Seg'  },
    { id: 'k-BPycvaZLA', title: 'Funções: Função Inversa (Aula 15 de 15)', duration: '18 Min 28 Seg'  },
  ],
};

export const playlistGrandezas: Playlist = { 
  title: "",
  creator: "GIS COM GIZ",
  totalDuration: "~20 Minutos",
  videos: [
    { id: 'H5It7WL5WMA', title: 'REGRA DE TRÊS SIMPLES - GRANDEZAS DIRETA E INVERSAMENTE PROPORCIONAIS', duration: '16 Min 54 Seg' },
    
  ],
};

export const playlistGeometria: Playlist = { 
  title: "",
  creator: "Dicasdemat Sandro Curió",
  totalDuration: "~22 Minutos",
  videos: [
    { id: 'th5k6bzSDTA', title: 'ÁREA DAS PRINCIPAIS FIGURAS PLANAS | GEOMETRIA PLANA', duration: '21 Min 12 Seg' },
    
  ],
};