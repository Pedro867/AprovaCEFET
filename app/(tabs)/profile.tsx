import React, { useState, useCallback } from "react";
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
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EMBLEMAS } from "@/constants/dadosEmblemas";
import { SafeAreaView } from 'react-native-safe-area-context';

// estado inicial do personagem
const personagemInicial = {
  background: "background1",
  ears: "orelha1",
  cheeks: "bochecha1",
  face: "rosto1",
  eyes: "olhos1",
  mouth: "boca39",
  bangs: "franja1",
  hair: "cabelo1",
  nose: "nariz1",
  faceColor: "#F8B788",
  faceShadowColor: "#D1A37E",
};

export default function ProfileScreen() {
  const router = useRouter();

  const [nomeUsuario, setNomeUsuario] = useState(null);
  const [bestStreak, setBestStreak] = useState(0);
  const [coinsUsuario, setCoinsUsuario] = useState(0);
  const [customizacoes, setCustomizacoes] = useState(personagemInicial);
  const [unlockedEmblems, setUnlockedEmblems] = useState<string[]>([]);
  const [selectedEmblem, setSelectedEmblem] = useState<string | null>(null);

  useFocusEffect(
    //recarrega os dads sempre que a tela for forcada (caso o usuario altere o nome ou personagem)
    useCallback(() => {
      const carregarDadosUsuario = async () => {
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
        try {
          const melhorStreak = await AsyncStorage.getItem("bestStreak");
          setBestStreak(melhorStreak);
        } catch (error) {
          console.error("Erro ao carregar a melhor streak do usuário", error);
        }
        //carrega personagem atual
        try {
          const savedCustomizations = await AsyncStorage.getItem(
            "userCharacter"
          );
          if (savedCustomizations) {
            setCustomizacoes(JSON.parse(savedCustomizations));
          }
        } catch (error) {
          console.error("Erro ao carregar o personagem do usuário", error);
        }

        try {

          // carrega os emblemas que o usuario já desbloqueou
          const unlocked = await AsyncStorage.getItem("unlockedEmblems");
          setUnlockedEmblems(unlocked ? JSON.parse(unlocked) : []);

          // carrega o emblema que o usuário selecionou por ultimo
          const selected = await AsyncStorage.getItem("selectedEmblem");
          setSelectedEmblem(selected);
        } catch (error) {
          console.error("Erro ao carregar dados dos emblemas", error);
        }
      };

      carregarDadosUsuario();
    }, [])
  );

  const handleSelectEmblem = async (emblemId: string) => {
    const newSelectedEmblem = selectedEmblem === emblemId ? null : emblemId;
    setSelectedEmblem(newSelectedEmblem);
    if (newSelectedEmblem) {
      await AsyncStorage.setItem('selectedEmblem', newSelectedEmblem);
    } else {
      await AsyncStorage.removeItem('selectedEmblem');
    }
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[Colors.gradientEnd, Colors.gradientStart]}
    >
      <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.replace("/(tabs)/secao")}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color={Colors.text} />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>PERFIL</ThemedText>
        </View>

        {/* INFORMAÇÕES DO USUÁRIO, PERSONAGEM E BOTÃO */}
        <View style={styles.profileSection}>
          <Personagem size={140} customizations={customizacoes} emblemId={selectedEmblem}/>
          <ThemedText style={styles.profileName}>{nomeUsuario}</ThemedText>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push("/(tabs)/editProfile")}
          >
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
            <ThemedText style={styles.statValue}>{bestStreak}</ThemedText>
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
        <ThemedText style={styles.cardTitle}>Meus Emblemas</ThemedText>
        <Card style={styles.emblemsContainer}>
          {Object.values(EMBLEMAS).map((emblema) => {
            const isUnlocked = unlockedEmblems.includes(emblema.id);
            const isSelected = selectedEmblem === emblema.id;
            const Icon = emblema.Icon;

            return (
              <TouchableOpacity
                key={emblema.id}
                style={[
                  styles.emblemItem,
                  !isUnlocked && styles.emblemLocked,
                  isSelected && styles.emblemSelected,
                ]}
                onPress={() => isUnlocked && handleSelectEmblem(emblema.id)}
                disabled={!isUnlocked}
              >
                <Icon width={120} height={120} />
                <Text style={styles.emblemLabel}>{isUnlocked ? emblema.nome : "Bloqueado"}</Text>
              </TouchableOpacity>
            );
          })}
        </Card>

      </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: Spacing.large,
    paddingTop: 65,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
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
  profileSection: {
    alignItems: "center",
    marginBottom: Spacing.giga,
  },
  profileName: {
    fontFamily: Fonts.family.kumbhSans,
    fontSize: Fonts.size.title,
    fontWeight: "800",
    color: Colors.text,
    marginTop: 60,
    
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
    fontFamily: Fonts.family.kumbhSans,
    color: Colors.white,
    fontSize: Fonts.size.medium,
    fontWeight: "400",
  },
  cardTitle: {
    fontFamily: Fonts.family.kumbhSans,
    fontSize: Fonts.size.large,
    fontWeight: "600",
    color: Colors.text,
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
    fontFamily: "DM Sans",
    fontSize: Fonts.size.small,
    fontWeight: "bold",
    color: Colors.text,
  },
  statLabel: {
    fontFamily: Fonts.family.kumbhSans,
    fontSize: Fonts.size.small,
    color: Colors.text,
    textAlign: "center",
  },
  verticalDivider: {
    width: 1,
    height: "100%",
    backgroundColor: Colors.black,
  },

  emblemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 10,
    paddingVertical: 20,
  },
  emblemItem: {
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    borderRadius: 12,
    width: '45%',
  },
  emblemLocked: {
    opacity: 0.3,
  },
  emblemSelected: {
    backgroundColor: 'rgba(137, 161, 212, 0.2)',
    borderColor: Colors.primary,
    borderWidth: 1.5,
  },
  emblemLabel: {
    fontFamily: Fonts.family.kumbhSans,
    fontSize: 14,
    color: Colors.text,
    textAlign: "center",
    marginTop: 5,
    fontWeight: '600',
  },
});
