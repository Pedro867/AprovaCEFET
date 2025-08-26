import { Tabs } from "expo-router";
import React from "react";
import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Octicons from '@expo/vector-icons/Octicons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    // a barra de navegação agora só aparece para as telas DENTRO de (tabs)
    <Tabs
      // a tela inicial, depois do login, será a 'secao'
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#8e8e93ff',
        headerShown: false,
        tabBarPosition: "bottom",
        tabBarButton: HapticTab,
        tabBarStyle: {
          position: "absolute", 
          backgroundColor: "#ffffffea", 
          borderTopWidth: 0, // remove a linha superior
          elevation: 0, // tira sombra android
        },
      }}
    >
      <Tabs.Screen
        name="secao"
        options={{
          title: "Tela Inicial",
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.text,
          tabBarIcon: ({ color }) => (
           <Octicons name="home" size={26} color= {color} />
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: "Loja",
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.text,
          tabBarIcon: ({ color }) => (
            <Octicons name="gift" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.text,
          tabBarIcon: ({ color }) => (
            <Octicons name="person" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
