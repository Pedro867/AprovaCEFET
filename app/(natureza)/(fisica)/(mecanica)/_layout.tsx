import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() { 
  const colorScheme = useColorScheme();

  return (

    <Stack>
        <Stack.Screen name="mecanica" options={{ headerShown: false }} /> 
        <Stack.Screen name="(movimento)" options={{ headerShown: false }} />  
        <Stack.Screen name="(velocidade)" options={{ headerShown: false }} />  
        <Stack.Screen name="(aceleracao)" options={{ headerShown: false }} />  
        <Stack.Screen name="(newton)" options={{ headerShown: false }} />  
        <Stack.Screen name="(peso)" options={{ headerShown: false }} />  
        <Stack.Screen name="(maquinas)" options={{ headerShown: false }} />  
        <Stack.Screen name="(pressao)" options={{ headerShown: false }} />  
    </Stack>
  );  
}