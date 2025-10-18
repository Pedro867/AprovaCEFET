import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedText } from "@/components/ThemedText";
import { Personagem } from "@/components/ui/Personagem";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const opcoesDaUnidade = [
  {
    title: "Material Teórico",
    route: "/(matematica)/(potencia_radiciacao)/teoriaPot_rad",
    locked: false,
  },
  {
    title: "Sugestão de Vídeoaulas",
    route: "/(matematica)/(potencia_radiciacao)/videoAulasPotRad",
    locked: false,
  },
  {
    title: "Exercícios",
    route: "/(matematica)/(potencia_radiciacao)/quizPot_rad",
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
    }

    carregarDados();
  }, []);

  //customizacao do personagem
  const customizacoes = {
    background: 'cor1',
    ears: 'orelha1',
    cheeks: 'bochecha1',
    face: 'rosto1',
    eyes: 'olhos1',
    mouth: 'boca1',
    bangs: 'franja1',
    hair: 'cabelo1',
    nose: 'nariz1',
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace('/(matematica)/telaUnidadesMat')}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.textHeader}>
         
            <ThemedText style={styles.headerTitle} numberOfLines={2}>Potenciação e Radiciação</ThemedText>
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
              // Desabilita o botão se estiver bloqueado
              disabled={isLocked}
              // Navega para a rota definida no array
              onPress={() => router.push(opcao.route as any)}
            >
              {/* Aplicamos um estilo diferente se estiver bloqueado */}
              <View style={[styles.cardBody, isLocked && styles.lockedCardBody]}>
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
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: "5%",
    marginTop: "15%",
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  textHeader: {
    flex: 1,
    alignItems: "center",
  },
  streakContainer: {
    alignItems: "center",
  },
  streakIcon: {
    width: 40,
    height: 40,
  },
  streakNumber: {
    fontSize: 14,
    color: "#060302",
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Kumbh Sans",
    fontWeight: "600",
    color: "#121212",
    paddingVertical: 20,
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