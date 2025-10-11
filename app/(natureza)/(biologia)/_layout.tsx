import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() { 
  const colorScheme = useColorScheme();

  return (

    <Stack>
        <Stack.Screen name="telaUnidadesBio" options={{ headerShown: false }} /> 
        <Stack.Screen name="(origem)" options={{ headerShown: false }} />  
        <Stack.Screen name="(evolucao)" options={{ headerShown: false }} />  
        <Stack.Screen name="(nomeclatura)" options={{ headerShown: false }} />  
        <Stack.Screen name="(reinos)" options={{ headerShown: false }} />  
        <Stack.Screen name="(animalia)" options={{ headerShown: false }} />  
        <Stack.Screen name="(plantas)" options={{ headerShown: false }} />  
        <Stack.Screen name="(celula)" options={{ headerShown: false }} />  
        <Stack.Screen name="(corpo)" options={{ headerShown: false }} />  
        <Stack.Screen name="(ecologia)" options={{ headerShown: false }} />  
    </Stack>
  );  
}