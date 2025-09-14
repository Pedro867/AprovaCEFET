import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() { 
  const colorScheme = useColorScheme();

  return (

    <Stack>
        {/* <Stack.Screen name="quizFuncoes" options={{ headerShown: false }} /> */}
        <Stack.Screen name="funcoes" options={{ headerShown: false }} />
        {/* <Stack.Screen name="questoesFuncoes" options={{ headerShown: false }} /> */}
        <Stack.Screen name="teoriaFuncoes" options={{ headerShown: false }} />
    </Stack>
  );
}