import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() { 
  const colorScheme = useColorScheme();

  return (

    <Stack>
        <Stack.Screen name="quizGrandezas" options={{ headerShown: false }} />
        <Stack.Screen name="grandezas" options={{ headerShown: false }} />
        {/* <Stack.Screen name="questoesGrandezas" options={{ headerShown: false }} /> */}
        <Stack.Screen name="teoriaGrandezas" options={{ headerShown: false }} />
    </Stack>
  );
}