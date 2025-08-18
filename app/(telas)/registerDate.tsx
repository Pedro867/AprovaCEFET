import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from 'expo-router';

import { BotaoCustomizado } from "@/components/ui/ButtomCustom";
import { Spacing, Colors } from "@/constants/Colors";
import { CalendarioCustomizado } from "@/components/ui/CalendarCustom";


export default function TelaRegistroData() {
  const [selectedDate, setSelectedDate] = useState(""); // guarda a data selecionada no formato 'YYYY-MM-DD'
  const router = useRouter();

  const handleConfirm = () => {
    if (!selectedDate) {
      Alert.alert("Atenção", "Por favor, selecione uma data para a sua prova.");
      return;
    }
    router.replace('/(tabs)/secao');
    // Torres--> colocar a logica de salvar no bd a data no perfil do usuario (vai precisar pra colocar na home page)
  };

  return (
   <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Selecione a data da sua prova:</Text>

        <CalendarioCustomizado onDateSelect={setSelectedDate} />

        <BotaoCustomizado title='CONFIRMAR' onPress={handleConfirm}/>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: Spacing.large,
    paddingVertical: 80
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
    marginBottom: Spacing.large,
  },
});
