import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, type TouchableOpacityProps } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/Colors'; //importando constants

// Botão customizado : utilizado nas telas de index, login, register, registerDate e outros...

interface Props extends TouchableOpacityProps {
  title: string;
}


export function BotaoCustomizado({ title, style, ...rest }: Props) {
  return (
    
    <TouchableOpacity style={[styles.buttonWrapper, style]} {...rest}>
      {/* sombra do botão */}
      <View style={styles.buttonShadow} />
      {/* Corpo principal do botão */}
      <View style={styles.buttonBody}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: { 
    width: 232,
    height: 64,
  },

  buttonBody: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primary, //cor do colors.ts
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // posição absoluta para ficar sobre a sombra
  },
  
  buttonShadow: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primaryShadow, 
    borderRadius: 7,
    position: 'absolute',
    top: 4, //deslocamento
  },
  
  buttonText: {
    color: Colors.textLight,
    fontSize: Fonts.size.large,
    fontWeight: Fonts.weight.bold as 'bold',
    textAlign: "center",
  },
});