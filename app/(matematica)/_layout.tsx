import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack> 
        <Stack.Screen name="matematica" options={{ headerShown: false }} />
        <Stack.Screen name="testeQuiz" options={{ headerShown: false }} />
        <Stack.Screen name="unidade" options={{ headerShown: false }} />
    </Stack>
  );
}