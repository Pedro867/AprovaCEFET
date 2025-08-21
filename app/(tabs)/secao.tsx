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
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { BotaoCustomizado } from "@/components/ui/ButtomCustom";
import { CalendarioCustomizado } from "@/components/ui/CalendarCustom";
import { BlurView } from "expo-blur";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: screenWidth } = Dimensions.get("window");

const subjectAreas = [
  {
    id: 1,
    title: "Ciências da natureza",
    disciplines: "3 Disciplinas",
    image: require("@/assets/images/natural-science-and-school-supplies.png"),
    color: "rgba(137, 161, 212, 0.66)",
    route: "/(natureza)/cienciasNatureza",
  },
  {
    id: 2,
    title: "Ciências Humanas",
    disciplines: "2 Disciplinas",
    image: require("@/assets/images/studying-geography-with-a-globe.png"),
    color: "rgba(137,161,212,0.64)",
    route: "/(humanas)/cienciasHumanas",
  },
  {
    id: 3,
    title: "Linguagens",
    disciplines: "1 Disciplina",
    image: require("@/assets/images/books.png"),
    color: "rgba(137,161,212,0.64)",
    route: "/(linguagens)/linguagens",
  },
  {
    id: 4,
    title: "Matemática",
    disciplines: "1 Disciplina",
    image: require("@/assets/images/matematica/math-class--calculator--and-other-supplies.png"),
    color: "rgba(137,161,212,0.64)",
    route: "/(matematica)/telaUnidades",
  },
];

export default function TelaSecao() {
   const [nomeUsuario, setNomeUsuario] = useState(null);

  useEffect(() => {
    const carregarNomeUsuario = async () => {
      try {
        const nome = await AsyncStorage.getItem("userNome");
        setNomeUsuario(nome);
      } catch (error) {
        console.error("Erro ao carregar o nome do usuário", error);
      }
    };

    carregarNomeUsuario();
  }, []); //o array vazio significa que essa função será chamada apenas uma vez

  const router = useRouter();
  const [diasFaltando, setDiasFaltando] = useState(0);
  const [progresso, setProgresso] = useState(0);

  //estados para controlar uma nova data
  const [calendarioVisivel, setCalendarioVisivel] = useState(false);
  const [novaDataSelecionada, setNovaDataSelecionada] = useState("");

  const calculaProgresso = useCallback(async () => {
    try {
      const dataProvaStr = await AsyncStorage.getItem("examDate");
      const dataInicioStr = await AsyncStorage.getItem("startDate");

      if (dataProvaStr && dataInicioStr) {
        const today = new Date();
        const examDate = new Date(dataProvaStr + "T00:00:00"); // Adiciona tempo para evitar problemas de fuso horário
        const startDate = new Date(dataInicioStr + "T00:00:00");
        today.setHours(0, 0, 0, 0);

        const diffTime = examDate.getTime() - today.getTime(); // calcula a diferença em milissegundos
        const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // converte para dias e arredonda para cima
        setDiasFaltando(remainingDays >= 0 ? remainingDays : 0);

        // calcula o progresso
        const totalDuration = examDate.getTime() - startDate.getTime();
        const elapsedDuration = today.getTime() - startDate.getTime();

        if (totalDuration > 0) {
          const progressPercentage = (elapsedDuration / totalDuration) * 100;
          setProgresso(Math.min(Math.max(progressPercentage, 0), 100)); // progresso entre 0 e 100
        }
      }
    } catch (error) {
      console.error("Erro ao carregar data:", error);
    }
  }, []);

  useEffect(() => {
    //aq tem q ficar alguma funcao pra pegar o nome do usuario
    calculaProgresso();
  }, [calculaProgresso]);

  const handleUpdateDate = async () => {
    //funcao pra caso o usuario queira alterar a data da prova
    if (!novaDataSelecionada) {
      alert("Por favor, selecione uma nova data.");
      return;
    }
    try {
      const today = new Date().toISOString().split("T")[0];
      await AsyncStorage.setItem("examDate", novaDataSelecionada);
      await AsyncStorage.setItem("startDate", today); // Reinicia a data de início

      await calculaProgresso(); // recalcula o progresso com a nova data
      setCalendarioVisivel(false); // fecha o modal
    } catch (error) {
      console.error("Erro ao atualizar a data", error);
    }
  };
  return (
    <View style={styles.rootContainer}>
      <LinearGradient
        colors={[Colors.gradientEnd, Colors.gradientStart]}
        style={styles.container}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Avatar
              source={require("@/assets/images/avatar.png")}
              size={36}
              style={styles.avatar}
            />
            <View style={styles.headerText}>
              {/*torres --> precisa pegar o nome do user no bd pra exibir na tela !!!*/ }
              <Text style={styles.greeting}>Olá, {nomeUsuario}</Text> 

              <Text style={styles.subtitle}>Vamos começar a aprender!</Text>
            </View>
            <View style={styles.streakContainer}>
              <Image
                source={require("@/assets/images/foguin--ativado-.png")}
                style={styles.streakIcon}
              />
              <Text style={styles.streakNumber}>0</Text>
            </View>
            <View style={styles.streakContainer}>
              <Image
                source={require("@/assets/images/pontos.png")}
                style={styles.streakIcon}
              />
              <Text style={styles.streakNumber}>0</Text>
            </View>
          </View>

          {/* CARD PROGRESSO DIAS ATÉ A PROVA */}
          <Card style={styles.progressCard}>
            <LinearGradient
              colors={["rgba(34,75,244,0.29)", "rgba(34,75,244,0.29)"]}
              style={styles.progressCardContent}
            >
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Faltam</Text>
                <TouchableOpacity onPress={() => setCalendarioVisivel(true)}>
                  <Text style={styles.changeDate}>Alterar data</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.daysContainer}>
                <Text style={styles.daysNumber}>{diasFaltando} dias</Text>
                <Text style={styles.daysLabel}>para a sua prova!</Text>
              </View>

              <ProgressBar
                progress={progresso}
                style={styles.progressBar}
                progressColor="#6B91E2"
              />
            </LinearGradient>
          </Card>

          {/* ÁREA DE SEÇÕES */}
          <Text style={styles.sectionTitle}>Áreas de conhecimento</Text>

          <View style={styles.subjectsGrid}>
            {subjectAreas.map((area) => (
              <TouchableOpacity
                key={area.id}
                style={styles.subjectCard}
                onPress={() => router.push(area.route as any)}
              >
                <Card style={styles.subjectCardInner}>
                  <View style={styles.subjectImageContainer}>
                    <LinearGradient
                      colors={[area.color, "rgba(248, 248, 248, 1)"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.subjectImageBackground}
                    />
                    <Image source={area.image} style={styles.subjectImage} />
                  </View>

                  <View style={styles.subjectInfo}>
                    <Text style={styles.subjectTitle}>{area.title}</Text>
                    <Text style={styles.subjectDisciplines}>
                      {area.disciplines}
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
      {calendarioVisivel && (
        <BlurView intensity={100} tint='systemThinMaterialDark' style={styles.blurContainer}>
          <View style={styles.modalContent}>
            <CalendarioCustomizado onDateSelect={setNovaDataSelecionada} />
          </View>

          <BotaoCustomizado title="CONFIRMAR" onPress={handleUpdateDate} />

          <TouchableOpacity onPress={() => setCalendarioVisivel(false)}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </BlurView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 24.88,
    fontWeight: "500",
    color: "#060302",
    fontFamily: "DM Sans",
  },
  subtitle: {
    fontSize: 12,
    color: "#060302",
    fontFamily: "DM Sans",
    marginTop: 4,
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
  progressCard: {
    marginHorizontal: 24,
    marginBottom: 26,
  },
  progressCardContent: {
    padding: 16,
    borderRadius: 12.38,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12.4,
    color: "#060302",
    fontFamily: "DM Sans",
  },
  changeDate: {
    fontSize: 12.4,
    color: "#003869",
    fontFamily: "DM Sans",
  },
  daysContainer: {
    marginBottom: 16,
  },
  daysNumber: {
    fontSize: 20.6,
    fontWeight: "bold",
    color: "#060302",
    fontFamily: "DM Sans",
  },
  daysLabel: {
    fontSize: 10.3,
    color: "#060302",
    fontFamily: "DM Sans",
  },
  progressBar: {
    width: "100%",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#121212",
    fontFamily: "Kumbh Sans",
    marginHorizontal: 60,
  },
  subjectsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 35,
    paddingVertical: 50,
    paddingBottom: 40,
  },
  subjectCard: {
    width: (screenWidth - 70 - 19) / 2,
    marginBottom: 19,
  },
  subjectCardInner: {
    height: 200,
    padding: 0,
  },
  subjectImageContainer: {
    height: 113,
    margin: 14,
    marginBottom: 8,
    borderRadius: 5,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  subjectImageBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  subjectImage: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  subjectInfo: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  subjectTitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#121212",
    fontFamily: "Kumbh Sans",
    marginBottom: 4,
  },
  subjectDisciplines: {
    fontSize: 10,
    color: "#727272",
    fontFamily: "Kumbh Sans",
  },
  //estilos mudar data prova
  blurContainer: {
    ...StyleSheet.absoluteFillObject, // Faz o blur cobrir a tela inteira
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.38)",
  },
  modalContent: {
    width: "95%",
    padding: 5,
    backgroundColor: "transparent",
    borderRadius: 20,
    alignItems: "center",
    gap: 15,
    marginTop: 30,
    marginBottom: 50,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },

  cancelText: {
    fontSize: 16,
    color: "red",
    marginTop: 40,
  },
});
