import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() { 
  const colorScheme = useColorScheme();

  return (

    <Stack>
        {/* <Stack.Screen name="quizFat_sis" options={{ headerShown: false }} /> */}
        <Stack.Screen name="fat_sis" options={{ headerShown: false }} />
        {/* <Stack.Screen name="questoesFat_sis" options={{ headerShown: false }} /> */}
        <Stack.Screen name="teoriaFat_sis" options={{ headerShown: false }} />
    </Stack>
  );
}