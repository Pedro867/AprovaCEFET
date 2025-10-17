import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import Ionicons from '@expo/vector-icons/Ionicons';
import { unidadesHistoria } from "@/constants/dadosUnidades"
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function telaUnidadesLing() {
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
          onPress={() => router.replace('/(tabs)/secao')}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.textHeader}>
          <View>
            <ThemedText style={styles.headerTitle}>UNIDADES</ThemedText>
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
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Lista de Unidades */}
        <View style={styles.unitsListContainer}>
          {unidadesHistoria.map((unidade, index) => {
            //percorre o array de unidades
            const Icon = unidade.Icon;
            return (
              <TouchableOpacity
                key={index}
                style={styles.cardShadow}
                onPress={() => router.push(unidade.route as any)}
              >
                <LinearGradient
                  colors={["#89A1D4", "#89A1D4"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.cardGradient}
                >
                  <View style={styles.titleContainer}>
                    <ThemedText style={styles.cardTitle}>
                      {unidade.title}
                    </ThemedText>
                  </View>

                  <View style={styles.cardIconContainer}>
                    <Icon width={60} height={60} fill="#FFFFFF" />
                  </View>
                  {/* <ThemedText style={styles.cardDescription}>
                    {unidade.description}
                  </ThemedText> */}
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 40,
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
    alignContent: 'center',
    textAlign: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    position: "relative",
  },
  streakContainer: {
    alignItems: "center",
    right: '5%',
    bottom: '10%',
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
    left: '2%',
    top: '5%',
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
  },
  unitsListContainer: {
    gap: 25,
  },
  cardShadow: {
    borderRadius: 12,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,

  },
  cardGradient: {
    borderRadius: 12,
    paddingTop: 15,
    paddingLeft: 0,

  },
  titleContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 0,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: "Poppins",
    fontWeight: "700",
    color: Colors.primary,
    textAlign: "left",

    marginBottom: 15,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 2,
    alignSelf: "flex-start",
  },

  cardIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,

  },
  cardDescription: {
    fontSize: 15,
    fontFamily: "Poppins",
    color: "white",
    lineHeight: 20,
    textAlign: "center",
  },
});
