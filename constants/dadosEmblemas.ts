
import EmblemaMatematica from '@/assets/images/emblemas/Basico.svg';
import EmblemaHumanas from '@/assets/images/emblemas/Avançado.svg'; 
import EmblemaLinguagens from '@/assets/images/emblemas/Pro.svg'; 
import EmblemaNatureza from '@/assets/images/emblemas/Premium.svg'; 

import iconEmblemaMatematica from '@/assets/images/emblemas/Emblema-basico.svg';
import iconEmblemaHumanas from '@/assets/images/emblemas/Avançado.svg'; //mudar dps
import iconEmblemaLinguagens from '@/assets/images/emblemas/Pro.svg'; 
import iconEmblemaNatureza from '@/assets/images/emblemas/Premium.svg'; 

export const EMBLEMAS = {
  matematica: {
    id: 'matematica',
    nome: 'Mestre da Matemática',
    Icon: iconEmblemaMatematica, // usado nos cards da tela de perfil
    EmblemaPersonagem: EmblemaMatematica, // usado em volta do personagem
  },
  humanas: {
    id: 'humanas',
    nome: 'Explorador das Humanas',
    Icon: iconEmblemaHumanas,
    EmblemaPersonagem: EmblemaHumanas,
  },
  linguagens: {
    id: 'linguagens',
    nome: 'Poeta das Palavras',
    Icon: iconEmblemaLinguagens,
    EmblemaPersonagem: EmblemaLinguagens,
  },
  natureza: {
    id: 'natureza',
    nome: 'Cientista da Natureza',
    Icon: iconEmblemaNatureza,
    EmblemaPersonagem: EmblemaNatureza,
  },
};

export const SECOES_PARA_EMBLEMAS = {


  matematica: [401, 402, 403, 404, 405, 406, 407], // IDs dos quizzes de matemática
  
};