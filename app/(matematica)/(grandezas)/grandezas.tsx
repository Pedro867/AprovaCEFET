import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const opcoesDaUnidade = [
  {
    title: "Material Teórico",
    route: "/(matematica)/(grandezas)/teoriaGrandezas",
    locked: false,
  },
  {
    title: "Sugestão de Vídeoaulas",
    route: "/(matematica)/(grandezas)/videoAulasGrandezas",
    locked: false,
  },
  {
    title: "Exercícios",
    route: "/(matematica)/(grandezas)/quizGrandezas",
    locked: false,
  },
  {
    title: "Simulados",
    route: "", // nao sei se sera adicionado ou não
    locked: true,
  },
];

export default function UnidadeConjuntos() {
  const router = useRouter();
  const [streakUsuario, setStreakUsuario] = useState(0);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const streak = await AsyncStorage.getItem("userStreak");
        setStreakUsuario(streak);
      } catch (error) {
        console.error("Erro ao carregar o streak do usuário", error);
      }
    };

    carregarDados();
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace('/(matematica)/telaUnidadesMat')}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.textHeader}>
          <View>
            <ThemedText style={styles.headerTitle}>Grandezas Proporcionais e Regra de Três</ThemedText>
          </View>
        </View>
        <View style={styles.streakContainer}>
          <Image
            source={require("@/assets/images/foguin--ativado-.png")}
            style={styles.streakIcon}
          />
          <Text style={styles.streakNumber}>{streakUsuario}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.buttonsListContainer}>
        {opcoesDaUnidade.map((opcao, index) => {
          const isLocked = opcao.locked;
          return (
            <TouchableOpacity
              key={index}
              style={styles.cardShadow}
              // desabilita o botão se estiver bloqueado
              disabled={isLocked}
              // navega para a rota definida no array
              onPress={() => router.push(opcao.route as any)}
            >
              <View
                style={[styles.cardBody, isLocked && styles.lockedCardBody]}
              >
                {isLocked && (
                  <Feather
                    name="lock"
                    size={24}
                    color="#9E9E9E"
                    style={styles.lockIcon}
                  />
                )}
                <ThemedText
                  style={[styles.cardTitle, isLocked && styles.lockedCardTitle]}
                >
                  {opcao.title}
                </ThemedText>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
    marginTop: "15%",
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  textHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    position: "relative",
  },
  streakContainer: {
    alignItems: "center",
    right: "5%",
    bottom: "10%",
  },
  streakIcon: {
    width: 40,
    height: 40,
  },
  streakNumber: {
    fontSize: 12,
    color: "#060302",
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  backButton: {
    left: "2%",
    top: "5%",
  },
  headerTitle: {
    fontSize: 30,
    fontFamily: "Kumbh Sans",
    fontWeight: "600",
    color: "#121212",
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: "Kumbh Sans",
    color: "#060302",
    marginLeft: 28,
  },

  buttonsListContainer: {
    paddingHorizontal: 25,
    paddingTop: 20,
    gap: 25,
  },
  cardShadow: {
    borderRadius: 12,
    backgroundColor: "rgba(137, 161, 212, 0.7)", // Sombra/fundo
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  cardBody: {
    backgroundColor: "white",
    //borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "600",
    color: Colors.primary,
  },

  lockedCardBody: {
    backgroundColor: "#F0F0F0",
  },
  lockedCardTitle: {
    color: "#9E9E9E",
  },
  lockIcon: {
    marginRight: 10,
  },
});
