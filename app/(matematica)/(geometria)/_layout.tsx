import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() { 
  const colorScheme = useColorScheme();

  return (

    <Stack>
        <Stack.Screen name="quizGeometria" options={{ headerShown: false }} />
        <Stack.Screen name="geometria" options={{ headerShown: false }} />
        {/* <Stack.Screen name="questoesGeometria" options={{ headerShown: false }} /> */}
        <Stack.Screen name="teoriaGeometria" options={{ headerShown: false }} />
    </Stack>
  );
}