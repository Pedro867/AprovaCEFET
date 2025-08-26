import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Personagem } from '@/components/ui/Personagem'
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';

export default function ProfileScreen() {
  const customizacoes = {
    background: 'cor1', 
    ears: 'orelha1',
    cheeks: 'bochecha1',
    face: 'rosto1',
    eyes: 'olhos1',
    mouth: 'boca1',
    bangs: 'franja1',
    hair: 'cabelo1',
    nose: 'nariz1',
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ThemedText style={styles.title}>Teste do Personagem</ThemedText>
        <Personagem size={250} customizations={customizacoes} /> 
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
});