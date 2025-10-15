import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() { 
  const colorScheme = useColorScheme();

  return (

     <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="telaUnidadesHist" options={{ headerShown: false }} /> 
        {/* <Stack.Screen name="(cartografia)" options={{ headerShown: false }} />   */}
    </Stack>
  );  
}