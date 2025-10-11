import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() { 
  const colorScheme = useColorScheme();

  return (

    <Stack>
        <Stack.Screen name="eletricidade" options={{ headerShown: false }} /> 
        <Stack.Screen name="(carga)" options={{ headerShown: false }} />  
        <Stack.Screen name="(eletrizacao)" options={{ headerShown: false }} />  
        <Stack.Screen name="(corrente)" options={{ headerShown: false }} />  
        <Stack.Screen name="(resistencia)" options={{ headerShown: false }} />  
        <Stack.Screen name="(geradores)" options={{ headerShown: false }} />  
        <Stack.Screen name="(resistores)" options={{ headerShown: false }} /> 
        <Stack.Screen name="(potencia)" options={{ headerShown: false }} />   
        <Stack.Screen name="(consumo)" options={{ headerShown: false }} />  
    </Stack>
  );  
}