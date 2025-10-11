import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() { 
  const colorScheme = useColorScheme();

  return (

    <Stack>
        <Stack.Screen name="telaUnidadesFis" options={{ headerShown: false }} /> 
        <Stack.Screen name="(mecanica)" options={{ headerShown: false }} />  
        <Stack.Screen name="(termologia)" options={{ headerShown: false }} />  
        <Stack.Screen name="(otica)" options={{ headerShown: false }} />  
        <Stack.Screen name="(eletricidade)" options={{ headerShown: false }} />  
    </Stack>
  );  
}