import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() { 
  const colorScheme = useColorScheme();

  return (

     <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="telaUnidadesGeo" options={{ headerShown: false }} /> 
        <Stack.Screen name="(cartografia)" options={{ headerShown: false }} />  
        <Stack.Screen name="(mapas)" options={{ headerShown: false }} />  
        <Stack.Screen name="(globalizacao)" options={{ headerShown: false }} />  
        <Stack.Screen name="(relevo)" options={{ headerShown: false }} />  
        <Stack.Screen name="(climas)" options={{ headerShown: false }} />  
        <Stack.Screen name="(biomas)" options={{ headerShown: false }} />  
        <Stack.Screen name="(demografia)" options={{ headerShown: false }} />  
        <Stack.Screen name="(urbanizacao)" options={{ headerShown: false }} />  
        <Stack.Screen name="(agro)" options={{ headerShown: false }} />  
        <Stack.Screen name="(energia)" options={{ headerShown: false }} />  
        <Stack.Screen name="(regionalizacao)" options={{ headerShown: false }} />  
    </Stack>
  );  
}