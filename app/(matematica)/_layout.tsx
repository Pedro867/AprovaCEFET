import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() { 
  const colorScheme = useColorScheme();

  return (

    <Stack>
        <Stack.Screen name="telaUnidades" options={{ headerShown: false }} /> 
        <Stack.Screen name="(conjuntos)" options={{ headerShown: false }} />  
        <Stack.Screen name="(potencia_radiciacao)" options={{ headerShown: false }} />  
        <Stack.Screen name="(fatoracao_sistemas)" options={{ headerShown: false }} />  
        <Stack.Screen name="(equacoes)" options={{ headerShown: false }} />  
        <Stack.Screen name="(funcoes)" options={{ headerShown: false }} />  
        <Stack.Screen name="(grandezas)" options={{ headerShown: false }} />  
        <Stack.Screen name="(geometria)" options={{ headerShown: false }} />  
    </Stack>
  );  
}