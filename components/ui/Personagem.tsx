import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import background1 from '@/assets/images/Personagem/background/1.svg';
import orelha1 from '@/assets/images/Personagem/orelhas/1.svg';
import bochecha1 from '@/assets/images/Personagem/bochechas/1.svg';
import rosto1 from '@/assets/images/Personagem/rosto/1.svg';
import olhos1 from '@/assets/images/Personagem/olhos/1.svg';
import boca1 from '@/assets/images/Personagem/boca/2.svg';
import franja1 from '@/assets/images/Personagem/franja/1.svg';
import cabelo1 from '@/assets/images/Personagem/cabelo/2.svg';
import nariz1 from '@/assets/images/Personagem/nariz/1.svg';


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
  },
  olhos: {
    'olhos1': olhos1,
  },
  boca: {
    'boca1': boca1,
  },
  franja: {
    'franja1': franja1,
  },
  cabelo: {
    'cabelo1': cabelo1,
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