import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, type TextInputProps } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Colors, Fonts, Spacing } from '@/constants/Colors'; 


interface Props extends TextInputProps {
  label: string;
  isPassword?: boolean; // Prop para identificar se é um campo de senha, se true ele renderiza o icone de olho
}

export function InputCustomizado({ label, isPassword = false, style, ...rest }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, isPassword ? styles.inputWithIcon : null, style]}
          placeholderTextColor={Colors.placeholder}
          secureTextEntry={isPassword && !showPassword} // apenas se for senha
          {...rest} // passa o resto das props 
        />
        {isPassword && ( // renderiza o ícone apenas se isPassword for true
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            style={styles.eyeIcon}
          >
            <Feather name={showPassword ? 'eye-off' : 'eye'} size={24} color={Colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    width: '100%',
    gap: Spacing.xsmall,
  },
  label: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.medium as '500',
    color: Colors.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    flex: 1, // input oculpa todo o espaço disponivel
    height: 44,
    borderRadius: 5,
    paddingHorizontal: Spacing.medium,
    backgroundColor: Colors.white,
    fontSize: Fonts.size.small,
    borderWidth: 1,
    borderColor: Colors.primaryShadow,
    color: Colors.text,
  },
  inputWithIcon: {
    paddingRight: 45, // padding no input de senha pro icone não sobrepor o texto
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
    padding: Spacing.small,
  },
});