// app/telas/_layout.tsx
import { Stack, Tabs } from 'expo-router';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';

export default function TelasLayout() {
  const colorScheme = useColorScheme();
  return (
    <Stack>
    {/* Aqui você define as telas dentro da pasta 'telas' */}
    {/* O 'index' é a tela padrão para este grupo se você navegar para 'telas' */}
    
    <Stack.Screen name="index" options={{ headerShown: false, title: "Início" }} />
    <Stack.Screen name="login" options={{ headerShown: false, title: "Login" }} />
    <Stack.Screen name="sign" options={{ headerShown: false, title: "Registro" }} />

    </Stack>
  );
}