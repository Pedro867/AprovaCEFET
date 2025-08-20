import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { useFonts, Lexend_400Regular, Lexend_700Bold } from '@expo-google-fonts/lexend'; //fontes dos numeros do calendario
import * as SplashScreen from 'expo-splash-screen';
import { LocaleConfig } from 'react-native-calendars'; 

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  today: "Hoje"
};
LocaleConfig.defaultLocale = "pt-br";


SplashScreen.preventAutoHideAsync(); // impede que a tela seja carregada antes das fontes serem baixadas

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ //useFonts faz download das fontes e retorna true qnd acaba
    Lexend_400Regular,
    Lexend_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // mostra a tela de splash enquanto as fontes carregam
  }

  return (
    //pilha de telas
    <Stack> 
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="sign" options={{ headerShown: false }} />
        <Stack.Screen name="registerDate" options={{ headerShown: false }} />
    </Stack>
  );
}