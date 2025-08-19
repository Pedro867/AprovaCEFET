import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() { 
  const colorScheme = useColorScheme();

  return (
    <Stack>
        <Stack.Screen name="telaUnidades" options={{ headerShown: false }} /> 
        <Stack.Screen name="testeQuiz" options={{ headerShown: false }} />
    </Stack>
  );
}