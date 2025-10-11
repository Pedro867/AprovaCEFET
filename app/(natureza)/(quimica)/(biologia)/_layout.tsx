import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() { 
  const colorScheme = useColorScheme();

  return (

    <Stack>
        <Stack.Screen name="telaUnidadesQui" options={{ headerShown: false }} /> 
        <Stack.Screen name="(introducao)" options={{ headerShown: false }} />  
        <Stack.Screen name="(misturas)" options={{ headerShown: false }} />  
        <Stack.Screen name="(transformacao)" options={{ headerShown: false }} />  
        <Stack.Screen name="(estrutura)" options={{ headerShown: false }} />  
        <Stack.Screen name="(substancias)" options={{ headerShown: false }} />  
    </Stack>
  );  
}