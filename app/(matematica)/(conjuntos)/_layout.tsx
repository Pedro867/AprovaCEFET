import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() { 
  const colorScheme = useColorScheme();

  return (

    <Stack>
        <Stack.Screen name="testeQuiz" options={{ headerShown: false }} />
        <Stack.Screen name="conjuntos" options={{ headerShown: false }} />
    </Stack>
  );
}