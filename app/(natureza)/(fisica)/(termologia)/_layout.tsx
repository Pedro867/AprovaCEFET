import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() { 
  const colorScheme = useColorScheme();

  return (

    <Stack>
        <Stack.Screen name="termologia" options={{ headerShown: false }} /> 
        <Stack.Screen name="(temperatura)" options={{ headerShown: false }} />  
        <Stack.Screen name="(equilibrio)" options={{ headerShown: false }} />  
        <Stack.Screen name="(calor)" options={{ headerShown: false }} />  
    </Stack>
  );  
}