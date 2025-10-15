import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Personagem } from "@/components/ui/Personagem";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useRouter, useFocusEffect } from "expo-router";
import { Colors, Fonts } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";


const subjectAreas = [
  {
    id: 1,
    title: "História",
    disciplines: "X Unidades",
    image: require("@/assets/images/linguagens.png"),
    color: "rgba(137, 161, 212, 0.66)",
    route: "/(historia)/telaUnidadesHist",
  },
  {
    id: 2,
    title: "Geografia",
    disciplines: "X Unidades",
    image: require("@/assets/images/geografia.png"),
    color: "rgba(137,161,212,0.64)",
    route: "/(geografia)/telaUnidadesGeo",
  }
];

export default function TelaSecao() {
  const [streakUsuario, setStreakUsuario] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const carregarDados = async () => {
        //EU SEI QUE TUDO PODE SER FEITO EM 1 TRY CATCH MAS SE 1 DER ERRADO O CONSOLE.ERROR DIZ QUAL EH
        try {
          const streak = await AsyncStorage.getItem("userStreak");
          setStreakUsuario(streak);
        } catch (error) {
          console.error("Erro ao carregar o streak do usuário", error);
        }
      };

      carregarDados();
    }, [])
  );

  const router = useRouter();

  const progress = ((3) / 5) * 100;
  
  return (
    <View style={styles.container}>
      <View style={styles.matematica}><Text>Ciências Humanas</Text></View>

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace('/(tabs)/secao')}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.textHeader}>
          <View>
            <ThemedText style={styles.headerTitle}>CIÊNCIAS HUMANAS</ThemedText>
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

        {/* ÁREA DE SEÇÕES */}
        <Text style={styles.sectionTitle}>Áreas de conhecimento</Text>

        <View style={styles.subjectsGrid}>
          {subjectAreas.map((area) => (
            <TouchableOpacity
              key={area.id}
              style={styles.subjectTouchable}
              onPress={() => router.push(area.route as any)}
            > {/* inicio do card da disciplina */}
              <Card style={styles.subjectCard}>
                <LinearGradient
                  colors={["rgba(34,75,244,0.29)", "rgba(34,75,244,0.29)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.subjectImageBackground}
                />

                <View style={styles.subjectImageContainer}>
                  <Image source={area.image} style={styles.subjectImage} />
                </View>

                <View style={styles.subjectInfo}>
                  <Text style={styles.subjectTitle}>{area.title}</Text>
                  <Text style={styles.subjectDisciplines}>
                    {area.disciplines}
                  </Text>
                </View>

                <View style={styles.progressBarContainer}>
                  <ProgressBar
                    progress={progress}
                    height={10}
                    backgroundColor="#E5E5E5"
                    progressColor="#0D1B52" // azul escuro
                    style={styles.progressBar}
                  />
                </View>
              </Card>
            </TouchableOpacity>
          ))}
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
  matematica: {
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 16,
    fontFamily: "Kumbh Sans",
    color: "#060302",
    paddingHorizontal: 20,
    marginTop: "15%",
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
  avatar: {
    marginRight: 12,
  },
  headerText: {
    marginLeft: 10,
    flex: 1,
  },
  streakContainer: {
    alignItems: "center",
    right: '5%',
    bottom: '20%',
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
  progressBar: {
    width: "80%",
  },
  progressBarContainer: {
    alignItems: "center",
    marginBottom: "5%"
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#121212",
    fontFamily: Fonts.family.kumbhSans,
    textAlign: "center",
    marginBottom: 20,
  },
  subjectsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: "5%",
    marginTop: "10%",
    paddingBottom: 3,
    gap: "10%",
  },
  subjectTouchable: {
    width: "48%",
    marginBottom: 20,
    borderRadius: 30,
  },
  subjectCard: {
    borderRadius: 30,
  },
  subjectImageContainer: {
    aspectRatio: 1, //mantem proporcao da img
    width: "80%",
    alignSelf: "center",
    margin: 14,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  subjectImageBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 30,
  },
  subjectImage: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  subjectInfo: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    minHeight: 70,
    justifyContent: "space-between",
  },
  subjectTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#121212",
    fontFamily: Fonts.family.kumbhSans,
    marginBottom: 4,
    textAlign: "center",
  },
  subjectDisciplines: {
    fontSize: 10,
    color: "#727272",
    fontFamily: Fonts.family.kumbhSans,
    textAlign: "center",
  },
});
