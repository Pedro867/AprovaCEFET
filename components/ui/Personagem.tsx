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
  layer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
    backgroundLayer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    transform: [{ scale: 1.25 }], 
  },
   hairLayer: {
    position: 'absolute',
    marginBottom: 100,
    width: '100%',
    height: '100%',
    transform: [{ scale: 1.2 }], 
  },
  faceLayer: {
    position: 'absolute',
    marginTop: 70,
    width: '100%',
    height: '100%',
    transform: [{ scale: 0.9 }], 
  },
  mouthLayer: {
    position: 'absolute',
    marginTop: 180,
    width: '100%',
    height: '100%',
    transform: [{ scale: 0.16 }], 
  },
    earRightLayer: {
    position: 'absolute',
    marginTop: 110,
    marginLeft: 270,
    width: '100%',
    height: '100%',
    transform: [{ scale: 0.5 }], 
  },
  earLeftLayer: {
    position: 'absolute',
    marginTop: 110,
    marginRight: 270,
    width: '100%',
    height: '100%',
    transform: [{ scale: 0.5 }, {scaleX: -1 }], 
  },
   eyesLayer: {
    position: 'absolute',
    marginTop: 15,
    width: '100%',
    height: '100%',
    transform: [{ scale: 0.6 }], 
  },
    cheekLayer: {
    position: 'absolute',
    marginTop: 100,
    width: '100%',
    height: '100%',
    transform: [{ scale: 0.6 }], 
  },
    noseLayer: {
    position: 'absolute',
    marginTop: 80,
    width: '100%',
    height: '100%',
    transform: [{ scale: 0.15 }], 
  },
   frontHairLayer: {
    position: 'absolute',
    marginBottom: 120,
    width: '100%',
    height: '100%',
    transform: [{ scale: 0.70 }], 
  },
});