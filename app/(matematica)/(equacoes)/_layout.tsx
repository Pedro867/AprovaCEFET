import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() { 
  const colorScheme = useColorScheme();

  return (

    <Stack>
        <Stack.Screen name="quizEquacoes" options={{ headerShown: false }} />
        <Stack.Screen name="equacoes" options={{ headerShown: false }} />
        {/* <Stack.Screen name="questoesEquacoes" options={{ headerShown: false }} /> */}
        <Stack.Screen name="teoriaEquacoes" options={{ headerShown: false }} />
    </Stack>
  );
}