//ROSTOS
import rosto1 from '@/assets/images/Personagem/rosto/1.svg';
import rosto2 from '@/assets/images/Personagem/rosto/2.svg';
import rosto3 from '@/assets/images/Personagem/rosto/3.svg';
import rosto4 from '@/assets/images/Personagem/rosto/4.svg';
import rosto5 from '@/assets/images/Personagem/rosto/5.svg';
import rosto6 from '@/assets/images/Personagem/rosto/6.svg';
import rosto7 from '@/assets/images/Personagem/rosto/7.svg';
import rosto8 from '@/assets/images/Personagem/rosto/8.svg';
import rosto9 from '@/assets/images/Personagem/rosto/9.svg';
import rosto10 from '@/assets/images/Personagem/rosto/10.svg';

//CABELOS

import Cabelo1 from '@/assets/images/Personagem/cabelo/1.svg';
//import Cabelo2 from '@/assets/images/Personagem/cabelo/2.svg';

//BOCAS
import Boca1 from '@/assets/images/Personagem/boca/1.svg';
//import Boca2 from '@/assets/images/Personagem/boca/2.svg';

//OLHOS
//NARIZ
//FRANJA
//FUNDO
//BOCHECHAS



export const LOJA_CATEGORIAS = [
  { id: 'face', nome: 'Rosto', icone: rosto1 },
  { id: 'hair', nome: 'Cabelo', icone: Cabelo1 },
  { id: 'mouth', nome: 'Boca', icone: Boca1 },
];

export const LOJA_ITENS = {
  face: [
    { id: 'rosto1', thumbnail: rosto1, preco: 0 },
    { id: 'rosto2', thumbnail: rosto2, preco: 50 },
    { id: 'rosto3', thumbnail: rosto3, preco: 50 },
    { id: 'rosto4', thumbnail: rosto4, preco: 50 },
    { id: 'rosto5', thumbnail: rosto5, preco: 50 },
    { id: 'rosto6', thumbnail: rosto6, preco: 50 },
    { id: 'rosto7', thumbnail: rosto7, preco: 50 },
    { id: 'rosto8', thumbnail: rosto8, preco: 50 },
    { id: 'rosto9', thumbnail: rosto9, preco: 50 },
    { id: 'rosto10', thumbnail: rosto10, preco: 50 },
  ],
  hair: [
    { id: 'cabelo1', thumbnail: Cabelo1, preco: 0 },
    //{ id: 'cabelo2', thumbnail: Cabelo2, preco: 100 },
  ],
  mouth: [
    { id: 'boca1', thumbnail: Boca1, preco: 0 },
    //{ id: 'boca2', thumbnail: Boca2, preco: 50 },
  ],
};