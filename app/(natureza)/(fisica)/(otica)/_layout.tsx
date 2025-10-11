import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() { 
  const colorScheme = useColorScheme();

  return (

    <Stack>
        <Stack.Screen name="otica" options={{ headerShown: false }} /> 
        <Stack.Screen name="(luz)" options={{ headerShown: false }} />  
        <Stack.Screen name="(sombras)" options={{ headerShown: false }} />  
        <Stack.Screen name="(fenomenos)" options={{ headerShown: false }} />  
        <Stack.Screen name="(espelhos)" options={{ headerShown: false }} />  
    </Stack>
  );  
}