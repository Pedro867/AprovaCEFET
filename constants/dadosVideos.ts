
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
    //{ id: 'videoseries?list=PLTPg64KdGgYhYpD4Yp4g2F0g8wef4A08L&index=3', title: 'Problemas com Diagramas', duration: '25 Min 12 Seg'  },
    // { id: 'videoseries?list=PLTPg64KdGgYhYpD4Yp4g2F0g8wef4A08L&index=4', title: 'Exercícios Resolvidos', duration: '30 Min 02 Seg'  },
  ],
};