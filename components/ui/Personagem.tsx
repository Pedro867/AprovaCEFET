import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import background1 from '@/assets/images/Personagem/background/1.svg';
import orelha1 from '@/assets/images/Personagem/orelhas/1.svg';
import bochecha1 from '@/assets/images/Personagem/bochechas/1.svg';

//-- OLHOS -- 
import olhos1 from '@/assets/images/Personagem/olhos/1.svg';
import olhos2 from '@/assets/images/Personagem/olhos/2.svg';
import olhos3 from '@/assets/images/Personagem/olhos/3.svg';
import olhos4 from '@/assets/images/Personagem/olhos/4.svg';
import olhos5 from '@/assets/images/Personagem/olhos/5.svg';
import olhos6 from '@/assets/images/Personagem/olhos/6.svg';
import olhos7 from '@/assets/images/Personagem/olhos/7.svg';
import olhos8 from '@/assets/images/Personagem/olhos/8.svg';
import olhos9 from '@/assets/images/Personagem/olhos/9.svg';
import olhos10 from '@/assets/images/Personagem/olhos/10.svg';
import olhos11 from '@/assets/images/Personagem/olhos/11.svg';
import olhos12 from '@/assets/images/Personagem/olhos/12.svg';
import olhos13 from '@/assets/images/Personagem/olhos/13.svg';
import olhos14 from '@/assets/images/Personagem/olhos/14.svg';
import olhos15 from '@/assets/images/Personagem/olhos/15.svg';
import olhos16 from '@/assets/images/Personagem/olhos/16.svg';
import olhos17 from '@/assets/images/Personagem/olhos/17.svg';
import olhos18 from '@/assets/images/Personagem/olhos/18.svg';
import olhos19 from '@/assets/images/Personagem/olhos/19.svg';
import olhos20 from '@/assets/images/Personagem/olhos/20.svg';
import olhos21 from '@/assets/images/Personagem/olhos/21.svg';
import olhos22 from '@/assets/images/Personagem/olhos/22.svg';
import olhos23 from '@/assets/images/Personagem/olhos/23.svg';
import olhos24 from '@/assets/images/Personagem/olhos/24.svg';
import olhos25 from '@/assets/images/Personagem/olhos/25.svg';
import olhos26 from '@/assets/images/Personagem/olhos/26.svg';
import olhos27 from '@/assets/images/Personagem/olhos/27.svg';
import olhos28 from '@/assets/images/Personagem/olhos/28.svg';
import olhos29 from '@/assets/images/Personagem/olhos/29.svg';
import olhos30 from '@/assets/images/Personagem/olhos/30.svg';
import olhos31 from '@/assets/images/Personagem/olhos/31.svg';
import olhos32 from '@/assets/images/Personagem/olhos/32.svg';

import boca1 from '@/assets/images/Personagem/boca/2.svg';
import franja1 from '@/assets/images/Personagem/franja/1.svg';
// -- CABELOS --- 
import cabelo1 from '@/assets/images/Personagem/cabelo/1.svg';
import cabelo2 from '@/assets/images/Personagem/cabelo/2.svg';
import cabelo3 from '@/assets/images/Personagem/cabelo/3.svg';
import cabelo4 from '@/assets/images/Personagem/cabelo/4.svg';
import cabelo5 from '@/assets/images/Personagem/cabelo/5.svg';
import cabelo6 from '@/assets/images/Personagem/cabelo/6.svg';
import cabelo7 from '@/assets/images/Personagem/cabelo/7.svg';
import cabelo8 from '@/assets/images/Personagem/cabelo/8.svg';
import cabelo9 from '@/assets/images/Personagem/cabelo/9.svg';
import cabelo10 from '@/assets/images/Personagem/cabelo/10.svg';
import cabelo11 from '@/assets/images/Personagem/cabelo/11.svg';
import cabelo12 from '@/assets/images/Personagem/cabelo/12.svg';
import cabelo13 from '@/assets/images/Personagem/cabelo/13.svg';
import cabelo14 from '@/assets/images/Personagem/cabelo/14.svg';
import cabelo15 from '@/assets/images/Personagem/cabelo/15.svg';
import cabelo16 from '@/assets/images/Personagem/cabelo/16.svg';
import cabelo17 from '@/assets/images/Personagem/cabelo/17.svg';
import cabelo18 from '@/assets/images/Personagem/cabelo/18.svg';
import cabelo19 from '@/assets/images/Personagem/cabelo/19.svg';
import cabelo20 from '@/assets/images/Personagem/cabelo/20.svg';
import cabelo21 from '@/assets/images/Personagem/cabelo/21.svg';
import cabelo22 from '@/assets/images/Personagem/cabelo/22.svg';
import cabelo23 from '@/assets/images/Personagem/cabelo/23.svg';
import cabelo24 from '@/assets/images/Personagem/cabelo/24.svg';
import cabelo25 from '@/assets/images/Personagem/cabelo/25.svg';
import cabelo26 from '@/assets/images/Personagem/cabelo/26.svg';
import cabelo27 from '@/assets/images/Personagem/cabelo/27.svg';
import cabelo28 from '@/assets/images/Personagem/cabelo/28.svg';
import cabelo29 from '@/assets/images/Personagem/cabelo/29.svg';
import cabelo30 from '@/assets/images/Personagem/cabelo/30.svg';
import cabelo31 from '@/assets/images/Personagem/cabelo/31.svg';
import cabelo32 from '@/assets/images/Personagem/cabelo/32.svg';
import cabelo33 from '@/assets/images/Personagem/cabelo/33.svg';
import cabelo34 from '@/assets/images/Personagem/cabelo/34.svg';
import cabelo35 from '@/assets/images/Personagem/cabelo/35.svg';
import cabelo36 from '@/assets/images/Personagem/cabelo/36.svg';
import cabelo37 from '@/assets/images/Personagem/cabelo/37.svg';
import cabelo38 from '@/assets/images/Personagem/cabelo/38.svg';
import cabelo39 from '@/assets/images/Personagem/cabelo/39.svg';
import cabelo40 from '@/assets/images/Personagem/cabelo/40.svg';

import nariz1 from '@/assets/images/Personagem/nariz/1.svg';

// --- ROSTOS ---
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

const partesPersonagem = {
  background: {
    'cor1': background1,
  },
  orelha: {
    'orelha1': orelha1,
  },
  bochecha: {
    'bochecha1': bochecha1,
  },
  rosto: {
    'rosto1': rosto1,
    'rosto2': rosto2,
    'rosto3': rosto3,
    'rosto4': rosto4,
    'rosto5': rosto5,
    'rosto6': rosto6,
    'rosto7': rosto7,
    'rosto8': rosto8,
    'rosto9': rosto9,
    'rosto10': rosto10,
  },
  olhos: {
    'olhos1': olhos1,
    'olhos2': olhos2,
    'olhos3': olhos3,
    'olhos4': olhos4,
    'olhos5': olhos5,
    'olhos6': olhos6,
    'olhos7': olhos7,
    'olhos8': olhos8,
    'olhos9': olhos9,
    'olhos10': olhos10,
    'olhos11': olhos11,
    'olhos12': olhos12,
    'olhos13': olhos13,
    'olhos14': olhos14,
    'olhos15': olhos15,
    'olhos16': olhos16,
    'olhos17': olhos17,
    'olhos18': olhos18,
    'olhos19': olhos19,
    'olhos20': olhos20,
    'olhos21': olhos21,
    'olhos22': olhos22,
    'olhos23': olhos23,
    'olhos24': olhos24,
    'olhos25': olhos25,
    'olhos26': olhos26,
    'olhos27': olhos27,
    'olhos28': olhos28,
    'olhos29': olhos29,
    'olhos30': olhos30,
    'olhos31': olhos31,
    'olhos32': olhos32,
  },
  boca: {
    'boca1': boca1,
  },
  franja: {
    'franja1': franja1,
  },
  cabelo: {
    'cabelo1': cabelo1,
    'cabelo2': cabelo2,
    'cabelo3': cabelo3,
    'cabelo4': cabelo4,
    'cabelo5': cabelo5,
    'cabelo6': cabelo6,
    'cabelo7': cabelo7,
    'cabelo8': cabelo8,
    'cabelo9': cabelo9,
    'cabelo10': cabelo10,
    'cabelo11': cabelo11,
    'cabelo12': cabelo12,
    'cabelo13': cabelo13,
    'cabelo14': cabelo14,
    'cabelo15': cabelo15,
    'cabelo16': cabelo16,
    'cabelo17': cabelo17,
    'cabelo18': cabelo18,
    'cabelo19': cabelo19,
    'cabelo20': cabelo20,
    'cabelo21': cabelo21,
    'cabelo22': cabelo22,
    'cabelo23': cabelo23,
    'cabelo24': cabelo24,
    'cabelo25': cabelo25,
    'cabelo26': cabelo26,
    'cabelo27': cabelo27,
    'cabelo28': cabelo28,
    'cabelo29': cabelo29,
    'cabelo30': cabelo30,
    'cabelo31': cabelo31,
    'cabelo32': cabelo32,
    'cabelo33': cabelo33,
    'cabelo34': cabelo34,
    'cabelo35': cabelo35,
    'cabelo36': cabelo36,
    'cabelo37': cabelo37,
    'cabelo38': cabelo38,
    'cabelo39': cabelo39,
    'cabelo40': cabelo40,
  },
   nariz: {
    'nariz1': nariz1,
  },
};

interface CharacterProps {
  size: number;
  customizations: {
    background: keyof typeof partesPersonagem.background;
    ears: keyof typeof partesPersonagem.orelha;
    cheeks: keyof typeof partesPersonagem.bochecha;
    face: keyof typeof partesPersonagem.rosto;
    eyes: keyof typeof partesPersonagem.olhos;
    mouth: keyof typeof partesPersonagem.boca;
    bangs: keyof typeof partesPersonagem.franja;
    hair: keyof typeof partesPersonagem.cabelo;
    nose: keyof typeof partesPersonagem.nariz;
  };
}

export function Personagem({ size, customizations }: CharacterProps) {
  const { background, ears, cheeks, face, eyes, mouth, bangs, hair, nose } = customizations;

  // componentes SVG 
  const BackgroundComponent = partesPersonagem.background[background];
  const EarsComponent = partesPersonagem.orelha[ears];
  const CheeksComponent = partesPersonagem.bochecha[cheeks];
  const FaceComponent = partesPersonagem.rosto[face];
  const EyesComponent = partesPersonagem.olhos[eyes];
  const MouthComponent = partesPersonagem.boca[mouth];
  const BangsComponent = partesPersonagem.franja[bangs];
  const HairComponent = partesPersonagem.cabelo[hair];
  const NoseComponent = partesPersonagem.nariz[nose];

  return (
    <View style={[styles.avatarContainer, { width: size, height: size }]}>
        <View style={[styles. backgroundLayer, { zIndex: 1 }]}><BackgroundComponent width="100%" height="100%" /></View>
        <View style={[styles.earRightLayer, { zIndex: 5 }]}><EarsComponent width="50%" height="50%" /></View>
        <View style={[styles.earLeftLayer, { zIndex: 5 }]}><EarsComponent width="50%" height="50%" /></View>
        <View style={[styles.cheekLayer, { zIndex: 7 }]}><CheeksComponent width="100%" height="100%" /></View>
        <View style={[styles.noseLayer, { zIndex: 4 }]}><NoseComponent width="100%" height="100%" /></View> 
        <View style={[styles.faceLayer, { zIndex: 3 }]}><FaceComponent width="100%" height="100%" /></View>
        <View style={[styles.eyesLayer, { zIndex: 6 }]}><EyesComponent width="100%" height="100%" /></View>
        <View style={[styles.mouthLayer, { zIndex: 4 }]}><MouthComponent width="100%" height="100%" /></View> 
        <View style={[styles.frontHairLayer, { zIndex: 8 }]}><BangsComponent width="100%" height="100%" /></View> 
        <View style={[styles.hairLayer, { zIndex: 2 }]}><HairComponent width="100%" height="100%" /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
    backgroundLayer: {
    ...StyleSheet.absoluteFillObject, //atalho pra camada ocupar todo o espaço do conteiner
    transform: [{ scale: 1.3 }], 
  },
   hairLayer: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ translateY: '-20%' }, { scale: 1.2 }],
  },
  faceLayer: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ translateY: '12%' }, { scale: 0.9 }],
  },
  mouthLayer: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ translateY: '30%' }, { scale: 0.16 }],
  },
    earRightLayer: {
    ...StyleSheet.absoluteFillObject,
    top: '18%',
    left: '45%',
    transform: [{ scale: 0.5 }],
    width: '100%',
    height: '100%',
  },
  earLeftLayer: {
     ...StyleSheet.absoluteFillObject,
    top: '18%',
    left: '-45%',
    width: '100%',
    height: '100%',
    transform: [{ scale: 0.5 }, {scaleX: -1 }], 
  },
   eyesLayer: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ translateY: '2.5%' }, { scale: 0.6 }],
  },
    cheekLayer: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ translateY: '17%' }, { scale: 0.6 }],
  },
    noseLayer: {
   ...StyleSheet.absoluteFillObject,
    transform: [{ translateY: '13%' }, { scale: 0.15 }],
  },
   frontHairLayer: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ translateY: '-20%' }, { scale: 0.70 }],
  },
});