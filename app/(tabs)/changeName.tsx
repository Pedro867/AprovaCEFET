import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Fonts, Spacing } from "@/constants/Colors";
import { BotaoCustomizado } from "@/components/ui/ButtomCustom";
import { InputCustomizado } from "@/components/ui/InputCustom";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChangeNameScreen() {
  const router = useRouter();
  const [novoNome, setNovoNome] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");

  const handleSalvarNome = async () => {
    //TORRES --> colocar a logica do bd aq

    if (!novoNome || !senhaAtual) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const senhaSalva = await AsyncStorage.getItem("userSenha"); //pega senha atual

      if (senhaAtual === senhaSalva) {
        // se a senha estiver correta, salva o novo nome (local)
        await AsyncStorage.setItem("userNome", novoNome);
        await AsyncStorage.setItem("userPrimeiroNome", novoNome.split(" ")[0]);
        Alert.alert("Sucesso!", "Seu nome foi atualizado.");
        router.back(); 
      } else {
        Alert.alert("Erro", "A senha atual está incorreta.");
      }
    } catch (error) {
      console.error("Erro ao salvar o nome:", error);
      Alert.alert("Erro", "Não foi possível salvar as alterações.");
    }
  };

  return (
    <LinearGradient
      style={styles.backgroundContainer}
      colors={[Colors.gradientEnd, Colors.gradientStart]}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.replace('/editProfile')} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color={Colors.text} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Alterar Nome</ThemedText>
        </View>

        <View style={styles.formContainer}>
          <InputCustomizado
            label="Novo Nome"
            value={novoNome}
            onChangeText={setNovoNome}
            placeholder="Digite seu novo nome"
            keyboardType="default"
            autoCapitalize="words"
          />
          <InputCustomizado
            label="Senha Atual"
            value={senhaAtual}
            onChangeText={setSenhaAtual}
            placeholder="Digite sua senha atual para confirmar"
            isPassword
          />
        </View>
        <View style={styles.buttonContainer}>
          <BotaoCustomizado title="SALVAR" onPress={handleSalvarNome} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: { flex: 1 },
  container: { flex: 1, padding: Spacing.large, paddingTop: 60 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 100,
  },
  backButton: { position: "absolute", left: 10, zIndex: 1 },
  headerTitle: {
    fontFamily: Fonts.family.kumbhSans,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    color: "black",
  },
  formContainer: { width: "100%", gap: 50 },
  buttonContainer: { marginTop: 100, alignItems: "center" },
});