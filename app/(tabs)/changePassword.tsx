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

export default function ChangePasswordScreen() {
  const router = useRouter();
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleSalvarSenha = async () => {
    //TORRES --> colocar a logica do bd aq
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      Alert.alert("Erro", "As novas senhas não coincidem.");
      return;
    }

    try {
        const senhaSalva = await AsyncStorage.getItem("userSenha");
        if (senhaAtual !== senhaSalva) {
            Alert.alert("Erro", "A senha atual está incorreta.");
            return;
        }

        
        await AsyncStorage.setItem("userSenha", novaSenha);
        Alert.alert("Sucesso!", "Sua senha foi atualizada.");
        router.back();

    } catch (error) {
        console.error("Erro ao salvar a senha:", error);
        Alert.alert("Erro", "Não foi possível salvar a nova senha.");
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
          <ThemedText style={styles.headerTitle}>Alterar Senha</ThemedText>
        </View>

        <View style={styles.formContainer}>
          <InputCustomizado
            label="Senha Atual"
            value={senhaAtual}
            onChangeText={setSenhaAtual}
            placeholder="Digite sua senha atual"
            isPassword
          />
          <InputCustomizado
            label="Nova Senha"
            value={novaSenha}
            onChangeText={setNovaSenha}
            placeholder="Digite a nova senha"
            isPassword
          />
          <InputCustomizado
            label="Confirmar Nova Senha"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            placeholder="Repita a nova senha"
            isPassword
          />
        </View>
        <View style={styles.buttonContainer}>
          <BotaoCustomizado title="SALVAR" onPress={handleSalvarSenha} />
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