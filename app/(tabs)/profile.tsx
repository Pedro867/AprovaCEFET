import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@expo/vector-icons/Feather";
import { Card } from "@/components/ui/Card";
import { ThemedText } from "@/components/ThemedText";
import { Personagem } from "@/components/ui/Personagem";
import { Colors, Fonts, Spacing } from "@/constants/Colors";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const router = useRouter();

    const [nomeUsuario, setNomeUsuario] = useState(null);
    const [streakUsuario, setStreakUsuario] = useState(0);
    const [coinsUsuario, setCoinsUsuario] = useState(0);
  
    useEffect(() => {
      const carregarNomeUsuario = async () => {
        //EU SEI QUE TUDO PODE SER FEITO EM 1 TRY CATCH MAS SE 1 DER ERRADO O CONSOLE.ERROR DIZ QUAL EH
        try {
          const nome = await AsyncStorage.getItem("userNome");
          setNomeUsuario(nome);
        } catch (error) {
          console.error("Erro ao carregar o nome do usuário", error);
        }
        try {
          const coins = await AsyncStorage.getItem("userPontuacao");
          setCoinsUsuario(coins);
        } catch (error) {
          console.error("Erro ao carregar as coins do usuário", error);
        }
      };
  
      carregarNomeUsuario();
    }, []); //o array vazio significa que essa função será chamada apenas uma vez

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

  // Array para os ícones de dias da semana (exemplo)
  const diasDaSemana = ["S", "T", "Q", "Q", "S"];

  return (
    <LinearGradient
      style={styles.container}
      colors={[Colors.gradientEnd,Colors.gradientStart]}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color={Colors.text} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>PERFIL</ThemedText>
        </View>

        {/* INFORMAÇÕES DO USUÁRIO, PERSONAGEM E BOTÃO */}
        <View style={styles.profileSection}>
          <Personagem size={150} customizations={customizacoesPersonagem} />
          <ThemedText style={styles.profileName}>{nomeUsuario}</ThemedText>

          <TouchableOpacity style={styles.editButton} onPress={() => {}}>
            <Feather name="edit-2" size={20} color={Colors.white} />
            <Text style={styles.editButtonText}>Editar perfil</Text>
          </TouchableOpacity>
        </View>

        {/* CARD DE ESTATÍSTICAS */}
        <ThemedText style={styles.cardTitle}>Meu progresso</ThemedText>
        <Card style={styles.statsCard}>
          <View style={styles.statItem}>
            <Image
              source={require("@/assets/images/foguin--ativado-.png")}
              style={styles.statsIcon}
            />
            <ThemedText style={styles.statValue}>
              {streakUsuario}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Melhor streak</ThemedText>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.statItem}>
            <Image
              source={require("@/assets/images/pontos.png")}
              style={styles.statsIcon}
            />
            <ThemedText style={styles.statValue}>{coinsUsuario}</ThemedText>
            <ThemedText style={styles.statLabel}>CefetCoins</ThemedText>
          </View>
        </Card>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
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
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    flex: 1,
    marginBottom: 20,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: Spacing.giga,
  },
  profileName: {
    fontSize: Fonts.size.title,
    fontWeight: "bold",
    color: Colors.text,
    marginTop: Spacing.xxlarge,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.medium,
    borderRadius: 8,
    marginTop: Spacing.large,
    width: 180,
    gap: Spacing.small,
  },
  editButtonText: {
    color: Colors.white,
    fontSize: Fonts.size.medium,
    fontWeight: "bold",
  },
  cardTitle: {
    fontSize: Fonts.size.large,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: Spacing.medium,
    textAlign: "center",
  },
  statsCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: Spacing.large,
    marginBottom: Spacing.medium,
    backgroundColor: Colors.white,
    borderRadius: 12,
  },
  statItem: {
    alignItems: "center",
    gap: Spacing.small,
    flex: 1,
  },
  statsIcon: {
    width: 40,
    height: 40,
  },
  statValue: {
    fontSize: Fonts.size.small,
    fontWeight: "bold",
    color: Colors.text,
  },
  statLabel: {
    fontSize: Fonts.size.small,
    color: Colors.text,
    textAlign: "center",
  },
  verticalDivider: {
    width: 1,
    height: "100%",
    backgroundColor: Colors.black,
  },
});
