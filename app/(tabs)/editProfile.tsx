import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { Personagem } from "@/components/ui/Personagem";
import { Colors, Fonts, Spacing } from "@/constants/Colors";
import { BotaoCustomizado } from "@/components/ui/ButtomCustom";
import { InputCustomizado } from "@/components/ui/InputCustom";
import AsyncStorage from "@react-native-async-storage/async-storage";

// personagem (ainda fixo, sem interação com nada do banco)
const customizacoesPersonagem = {
  background: "cor1",
  ears: "orelha1",
  cheeks: "bochecha1",
  face: "rosto1",
  eyes: "olhos1",
  mouth: "boca1",
  bangs: "franja1",
  hair: "cabelo1",
  nose: "nariz1",
};

export default function EditProfileScreen() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [nomeOriginal, setNomeOriginal] = useState("Carregando...");

  useEffect(() => {
    const carregarNomeUsuario = async () => {
      try {
        const nomeSalvo = await AsyncStorage.getItem("userNome");
        if (nomeSalvo !== null) {
          setNome(nomeSalvo);
          setNomeOriginal(nomeSalvo); // nome original para o placeholder
        }
      } catch (error) {
        console.error("Erro ao carregar o nome do usuário", error);
      }
    };

    carregarNomeUsuario();
  }, []);

  //para salvar as alterações
  const handleSalvar = async () => {
    if (novaSenha !== "" && novaSenha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }
    try {
      // salva o novo nome
      await AsyncStorage.setItem("userNome", nome);

      // salva a nova senha apenas se ela foi alterada
      if (novaSenha !== "") {
        await AsyncStorage.setItem("userSenha", novaSenha); 
      }

      Alert.alert("Sucesso!", "Seu perfil foi atualizado.");
      router.back(); 
    } catch (error) {
      console.error("Erro ao salvar os dados", error);
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
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color={Colors.text} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>PERFIL</ThemedText>
        </View>
        <View style={styles.profilePicture}>
          <Personagem size={120} customizations={customizacoesPersonagem} />
        </View>
        <View style={styles.formContainer}>
        <ThemedText style={styles.sectionTitle}>Alterar Nome</ThemedText>
          <InputCustomizado
            label="Nome Completo"
            value={nome}
            onChangeText={setNome}
            placeholder={nomeOriginal}
            keyboardType="default"
            autoCapitalize="words"
          />
            <ThemedText style={styles.sectionTitle}>Alterar Senha</ThemedText>
        <InputCustomizado
                    label="Nova Senha"
                    value={novaSenha}
                    onChangeText={setNovaSenha}
                    placeholder='Digite a nova senha'
                    isPassword
                  />
                     <InputCustomizado
                    label="Confirmar Nova Senha"
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    placeholder='Repita a nova senha senha'
                    isPassword
                  />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <BotaoCustomizado title="SALVAR" onPress={handleSalvar}/>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
  },
  container: {
    padding: Spacing.large,
    paddingTop: 60,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.large,
  },
  backButton: {
    position: "absolute",
    left: 10,
    zIndex: 1,
  },
  headerTitle: {
    fontFamily: Fonts.family.kumbhSans,
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    flex: 1,
    marginBottom: 20,
  },
  profilePicture: {
    alignItems: "center",
    marginBottom: Spacing.giga,
  },
  formContainer: {
    width: "100%",
    gap: Spacing.medium,
  },
  sectionTitle: {
    marginTop: Spacing.large,
    fontSize: Fonts.size.large,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  buttonContainer: {
    marginTop: Spacing.giga,
    alignItems: "center",
  },
});
