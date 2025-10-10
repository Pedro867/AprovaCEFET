import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() { 
  const colorScheme = useColorScheme();

  return (

    <Stack>
        <Stack.Screen name="quizPot_rad" options={{ headerShown: false }} />
        <Stack.Screen name="pot_rad" options={{ headerShown: false }} />
        <Stack.Screen name="questoesPot_rad" options={{ headerShown: false }} />
        <Stack.Screen name="teoriaPot_rad" options={{ headerShown: false }} />
        <Stack.Screen name="videoAulasPotRad" options={{ headerShown: false }} /> 
    </Stack>
  );
}