import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    // a barra de navegação agora só aparece para as telas DENTRO de (tabs)
    <Tabs
      // a tela inicial, depois do login, será a 'home'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarPosition:'bottom',
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
      }}>
      <Tabs.Screen
        name="linguagens"
        options={{
          title: 'Linguagens',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          href: null, 
        }}
      />
    </Tabs>
  );
}