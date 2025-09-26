import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() { 
  const colorScheme = useColorScheme();

  return (

    <Stack>
        <Stack.Screen name="quizConjuntos" options={{ headerShown: false }} />
        <Stack.Screen name="conjuntos" options={{ headerShown: false }} />
        <Stack.Screen name="questoesConjuntos" options={{ headerShown: false }} />
        <Stack.Screen name="q4" options={{ headerShown: false }} />
        <Stack.Screen name="teoriaConjuntos" options={{ headerShown: false }} />
        <Stack.Screen name="videoAulasConjuntos" options={{ headerShown: false }} /> 
    </Stack>
  );
}