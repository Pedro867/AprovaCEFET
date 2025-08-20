import React from "react";
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
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ThemedText } from "@/components/ThemedText";
import { Avatar } from "@/components/ui/Avatar";

// importacao dos icons em svg (maior qualidade)
import IconConjuntos from "@/assets/images/matematica/vector.svg";
import IconPotencia from "@/assets/images/matematica/math-formula.svg";
import IconFatoracao from "@/assets/images/matematica/group.svg";
import IconEquacao from "@/assets/images/matematica/graphic-designing.svg";
import IconFuncoes from "@/assets/images/matematica/graphic-designing.svg";
import IconRegraDeTres from "@/assets/images/matematica/graphic-designing.svg";
import IconGeometria from "@/assets/images/matematica/graphic-designing.svg";

//array de unidades
const unidadesData = [
  {
    title: "Conjuntos",
    description:
      "Conceitos básicos, tipos de conjuntos numéricos (naturais, inteiros, racionais, etc.) e operações como MMC e MDC.",
    Icon: IconConjuntos,
    route: "/(matematica)/testeQuiz", //rota para testeQuiz por enquanto
  },
  {
    title: "Potenciação e Radiciação",
    description:
      "Propriedades e regras das operações, notação científica e racionalização de denominadores.",
    Icon: IconPotencia,
    route: "/(matematica)/testeQuiz",
  },
  {
    title: "Fatoração e Sistemas Lineares",
    description:
      "Simplificação de expressões algébricas e métodos de adição e substituição para resolver sistemas.",
    Icon: IconFatoracao,
    route: "/(matematica)/testeQuiz",
  },
  {
    title: "Equação do 2º Grau",
    description:
      "Resolução por fatoração e Bhaskara, relação de soma e produto entre as raízes e equações biquadradas.",
    Icon: IconEquacao,
    route: "/(matematica)/testeQuiz",
  },
  {
    title: "Funções",
    description:
      "Características, propriedades e gráficos das funções de 1º e 2º grau. Análise de raízes e vértices.",
    Icon: IconFuncoes,
    route: "/(matematica)/testeQuiz",
  },
  {
    title: "Grandezas Proporcionais e Regra de três",
    description:
      "Esta unidade explora as relações entre grandezas direta e inversamente proporcionais. Em seguida, aplica esses conceitos para resolver problemas práticos através da regra de três simples e composta.",
    Icon: IconRegraDeTres,
    route: "/(matematica)/testeQuiz",
  },
  {
    title: "Geometria",
    description:
      "Geometria plana, Teorema de Tales, semelhança de triângulos, Teorema de Pitágoras e cálculo de áreas.",
    Icon: IconGeometria,
    route: "/(matematica)/testeQuiz",
  },
];

export default function TelaUnidadesMatematica() {
  const router = useRouter();

  return (
    <LinearGradient
      style={styles.container}
      colors={["rgba(255, 255, 255, 0.8)", "rgba(107, 145, 226, 0.8)"]}
    >
      <View style={styles.headerUser}>
        <Avatar
          source={require("@/assets/images/avatar.png")}
          size={36}
          style={styles.avatar}
        />
        <View style={styles.streakContainer}>
          <Image
            source={require("@/assets/images/foguin--ativado-.png")}
            style={styles.streakIcon}
          />
          <Text style={styles.streakNumber}>1</Text>
        </View>
      </View>
      <View style={styles.headerUnidade}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <IconSymbol name="arrow.left" size={32} color={Colors.light.text} />
        </TouchableOpacity>
        <View>
          <ThemedText style={styles.headerTitle}>UNIDADES</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Matemática</ThemedText>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Lista de Unidades */}
        <View style={styles.unitsListContainer}>
          {unidadesData.map((unidade, index) => {
            //percorre o array de unidades
            const Icon = unidade.Icon;
            return (
              <TouchableOpacity
                key={index}
                style={styles.cardShadow}
                onPress={() => router.push(unidade.route)}
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
                  <ThemedText style={styles.cardDescription}>
                    {unidade.description}
                  </ThemedText>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerUser: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 50,
    marginBottom: 20,
  },

  headerUnidade: {
    flexDirection: "row",
    alignItems: 'center', 
    paddingHorizontal: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    paddingBottom: 15,
  },
  avatar: {
    marginRight: 10,
  },
  streakContainer: {
    alignItems: "center",
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
    marginRight: 80,
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
    fontSize: 18,
    fontFamily: "Poppins",
    fontWeight: "700",
    color: Colors.primary,
    textAlign: "left",
    
    marginBottom: 15,
    backgroundColor:'white',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },

  cardIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    
  },
  cardDescription: {
    fontSize: 13,
    fontFamily: "Poppins",
    color: "white",
    lineHeight: 20,
    textAlign: "center",
  },
});
