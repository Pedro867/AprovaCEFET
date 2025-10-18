import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Personagem } from "@/components/ui/Personagem";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useRouter, useFocusEffect } from "expo-router";
import { Colors, Fonts } from "@/constants/Colors";
import { BotaoCustomizado } from "@/components/ui/ButtomCustom";
import { CalendarioCustomizado } from "@/components/ui/CalendarCustom";
import { BlurView } from "expo-blur";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  checkCompletedQuizes,
  updateStreakBD,
} from "../../utils/api/conexaoFetch";
import { SECOES_PARA_EMBLEMAS, EMBLEMAS } from "@/constants/dadosEmblemas";
import { SafeAreaView } from "react-native-safe-area-context";
import { streakEventEmitter } from "@/utils/events/streakEvents";

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
} as const;

export default function TelaSecao() {
  const [progressos, setProgressos] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  });

  const verificarEmblemasDesbloqueados = async (progressoAtual: {
    [key: number]: number;
  }) => {
    // Checa o emblema de Matemática
    const totalQuizzesMatematica = SECOES_PARA_EMBLEMAS.matematica.length;
    const quizzesCompletosMatematica = progressoAtual[4]; // ID 4 para Matemática

    if (quizzesCompletosMatematica >= totalQuizzesMatematica) {
      const unlockedEmblemsStr = await AsyncStorage.getItem("unlockedEmblems");
      const unlockedEmblems = unlockedEmblemsStr
        ? JSON.parse(unlockedEmblemsStr)
        : [];

      if (!unlockedEmblems.includes("matematica")) {
        unlockedEmblems.push("matematica");
        await AsyncStorage.setItem(
          "unlockedEmblems",
          JSON.stringify(unlockedEmblems)
        );
        Alert.alert(
          "Emblema Desbloqueado!",
          "Você completou a seção de Matemática e ganhou o emblema 'Mestre da Matemática'!"
        );
      }
    }
    //adicionar checagem de outros emblemas aqui dps
  };

  const subjectAreas = [
    {
      id: 1,
      title: "Ciências da Natureza",
      disciplines: "3 Disciplinas",
      image: require("@/assets/images/naturezas.png"),
      color: "rgba(137, 161, 212, 0.66)",
      route: "/(natureza)/cienciasNatureza",
      progress: progressos[1], //1 eh o id
    },
    {
      id: 2,
      title: "Ciências Humanas",
      disciplines: "2 Disciplinas",
      image: require("@/assets/images/humanas.png"),
      color: "rgba(137,161,212,0.64)",
      route: "/(humanas)/cienciasHumanas",
      progress: progressos[2], //2 eh o id
    },
    {
      id: 3,
      title: "Linguagens",
      disciplines: "1 Disciplina",
      image: require("@/assets/images/linguagens.png"),
      color: "rgba(137,161,212,0.64)",
      route: "/(linguagens)/telaUnidadesLing",
      progress: progressos[3], //3 eh o id
    },
    {
      id: 4,
      title: "Matemática",
      disciplines: "1 Disciplina",
      image: require("@/assets/images/matematica.png"),
      color: "rgba(137,161,212,0.64)",
      route: "/(matematica)/telaUnidadesMat",
      progress: progressos[4] / 7, //4 eh o id
    },
  ];

  const [selectedEmblem, setSelectedEmblem] = useState<string | null>(null);
  const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);
  const [streakUsuario, setStreakUsuario] = useState<number>(0);
  const [isStreakActive, setIsStreakActive] = useState(false); //controlar a img de ativo ou inativo
  const [coinsUsuario, setCoinsUsuario] = useState<number>(0);
  const [customizacoes, setCustomizacoes] = useState(personagemInicial);

  const carregarTodosOsDados = useCallback(async () => {
    try {
      //logica de verificar se o streak ta ativo ou n
      const today = new Date();
      const todayStr = today.toDateString();

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      const lastDateStr = await AsyncStorage.getItem("lastStreakDate");
      const currentStreakStr = await AsyncStorage.getItem("userStreak");
      let currentStreak = currentStreakStr ? parseInt(currentStreakStr, 10) : 0;

      if (
        lastDateStr &&
        lastDateStr !== todayStr &&
        lastDateStr !== yesterdayStr
      ) {
        //se a ultima data for diferente de hoje e ontem, zerar streak
        currentStreak = 0;
        await AsyncStorage.setItem("userStreak", "0");
        //await updateStreakBD(0);
      }
      setStreakUsuario(currentStreak);
      setIsStreakActive(lastDateStr === todayStr);

      //carrega nome do usuario
      const primeiroNome = await AsyncStorage.getItem("userPrimeiroNome");
      setNomeUsuario(primeiroNome);

      //carrega coins do usuario
      const coins = await AsyncStorage.getItem("userPontuacao");
      setCoinsUsuario(coins ? parseInt(coins, 10) : 0);

      // carrega customizações do personagem
      const savedCustomizations = await AsyncStorage.getItem("userCharacter");
      if (savedCustomizations) {
        setCustomizacoes(
          JSON.parse(savedCustomizations) as typeof personagemInicial
        );
      }

      // carrega o emblema selecionado
      const emblem = await AsyncStorage.getItem("selectedEmblem");
      setSelectedEmblem(emblem);

      const streak = await AsyncStorage.getItem("userStreak");
      setStreakUsuario(streak ? parseInt(streak, 10) : 0);

      //CARREGA PROGRESSO DAS SEÇÕES
      const getCompletedCount = (r: any) =>
        typeof r === "number"
          ? r
          : r && typeof r.completados === "number"
          ? r.completados
          : 0;

      let p1 = await checkCompletedQuizes(1);
      let p2 = await checkCompletedQuizes(2);
      let p3 = await checkCompletedQuizes(3);
      let p4 = await checkCompletedQuizes(4);

      const novosProgressos = {
        1: getCompletedCount(p1),
        2: getCompletedCount(p2),
        3: getCompletedCount(p3),
        4: getCompletedCount(p4),
      };

      setProgressos(novosProgressos);
      await verificarEmblemasDesbloqueados(novosProgressos);
    } catch (error) {
      console.error("Erro ao carregar emblema na tela de seção", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarTodosOsDados();
    }, [carregarTodosOsDados])
  );

  useEffect(() => {
    const listener = streakEventEmitter.addListener("streakAtualizada", () => {
      carregarTodosOsDados();
    });

    return () => {
      listener.remove();
    };
  }, [carregarTodosOsDados]);

  const router = useRouter();
  const [diasFaltando, setDiasFaltando] = useState(0);
  const [progresso, setProgresso] = useState(0);

  //estados para controlar uma nova data
  const [calendarioVisivel, setCalendarioVisivel] = useState(false);
  const [novaDataSelecionada, setNovaDataSelecionada] = useState("");

  const calculaProgresso = useCallback(async () => {
    try {
      const dataProvaStr = await AsyncStorage.getItem("dataProva");
      const dataInicioStr = await AsyncStorage.getItem("inicioEstudo");

      console.log("Data da Prova lida do armazenamento:", dataProvaStr);
      console.log("Data de Início lida do armazenamento:", dataInicioStr);
      if (dataProvaStr && dataInicioStr) {
        const today = new Date();
        const examDate = new Date(dataProvaStr + "T00:00:00"); // adiciona tempo para evitar problemas de fuso horário
        const startDate = new Date(dataInicioStr + "T00:00:00");
        today.setHours(0, 0, 0, 0);

        const diffTime = examDate.getTime() - today.getTime(); // calcula a diferença em milissegundos
        const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // converte para dias e arredonda para cima
        setDiasFaltando(remainingDays >= 0 ? remainingDays : 0);

        const oneDay = 1000 * 60 * 60 * 24;
        // calcula o progresso
        const totalDuration = examDate.getTime() - startDate.getTime() + oneDay;
        const elapsedDuration = today.getTime() - startDate.getTime() + oneDay;

        if (totalDuration > 0) {
          const progressPercentage = (elapsedDuration / totalDuration) * 100;

          setProgresso(Math.min(Math.max(progressPercentage, 0), 100)); // progresso entre 0 e 100
        } else {
          setProgresso(100); //se a data ja tiver passado
        }
      }
    } catch (error) {
      console.error("Erro ao carregar data:", error);
    }
  }, []);

  useEffect(() => {
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
      await AsyncStorage.setItem("dataProva", novaDataSelecionada);
      await AsyncStorage.setItem("inicioEstudo", today); // Reinicia a data de início

      await calculaProgresso(); // recalcula o progresso com a nova data
      setCalendarioVisivel(false); // fecha o modal
    } catch (error) {
      console.error("Erro ao atualizar a data", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
          <Personagem
            size={32}
            customizations={customizacoes}
            emblemId={selectedEmblem}
          />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.greeting}>Olá, {nomeUsuario}</Text>

          <Text style={styles.subtitle}>Vamos começar a aprender!</Text>
        </View>
        <View style={styles.streakContainer}>
          <Image
            source={
              isStreakActive
                ? require("@/assets/images/foguin--ativado-.png")
                : require("@/assets/images/foguin--desativado-.png")
            }
            style={styles.streakIcon}
          />
          <Text style={styles.streakNumber}>{streakUsuario}</Text>
        </View>
        <View style={styles.streakContainer}>
          <Image
            source={require("@/assets/images/pontos.png")}
            style={styles.streakIcon}
          />
          <Text style={styles.streakNumber}>{coinsUsuario}</Text>
        </View>
      </View>

      {/* CARD PROGRESSO DIAS ATÉ A PROVA */}
      <Card style={styles.progressCard}>
        <LinearGradient
          colors={["rgba(34,75,244,0.29)", "rgba(103, 114, 160, 0.78)"]}
          style={{ width: '100%', padding: 16, borderRadius: 12.38 }}
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

          <View style={styles.dateProgressBarContainer}>
            <ProgressBar
              progress={progresso}
              height={10}
              style={styles.progressDateBar}
              progressColor="#0D1B52"
            
            />
          </View>
        </LinearGradient>
      </Card>

      {/* ÁREA DE SEÇÕES */}
      <Text style={styles.sectionTitle}>Áreas de conhecimento</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.subjectsGrid}>
          {subjectAreas.map((area) => (
            <TouchableOpacity
              key={area.id}
              style={styles.subjectTouchable}
              onPress={() => router.push(area.route as any)}
            >
              {/* inicio do card da disciplina */}
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
                    progress={area.progress * 100}
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
      {calendarioVisivel && (
        <BlurView
          intensity={100}
          tint="systemThinMaterialDark"
          style={styles.blurContainer}
        >
          <View style={styles.modalContent}>
            <CalendarioCustomizado onDateSelect={setNovaDataSelecionada} />
          </View>

          <BotaoCustomizado title="CONFIRMAR" onPress={handleUpdateDate} />

          <TouchableOpacity onPress={() => setCalendarioVisivel(false)}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </BlurView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    paddingBottom: 50,
    paddingHorizontal: "5%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "5%",
    paddingTop: 20,
    marginBottom: 20,
  },
  avatar: {
    marginRight: 10,
  },
  headerText: {
    marginLeft: 15,
    flex: 1,
  },
  greeting: {
    fontSize: 25,
    fontWeight: "700",
    color: "#060302",
    fontFamily: Fonts.family.kumbhSans,
  },
  subtitle: {
    fontSize: 14,
    color: "#060302",
    fontFamily: Fonts.family.kumbhSans,
    fontWeight: "600",
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
    marginHorizontal: "5%",
    marginBottom: 30,
  },
  progressCardContent: {
    padding: 16,
    borderRadius: 12.38,
    justifyContent: 'space-between',
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14.4,
    color: "#060302",
    fontFamily: "DM Sans",
  },
  changeDate: {
    fontSize: 14.4,
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
    fontSize: 13.3,
    color: "#060302",
    fontFamily: "DM Sans",
  },
  progressDateBar: {
    width: "100%",
  },
  progressBar: {
    width: "80%",
  },
  dateProgressBarContainer: {
    width: '100%', 
  },
  progressBarContainer: {
    alignItems: "center",
    marginBottom: "5%",
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
    paddingBottom: 3,
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
    fontSize: 15,
    fontWeight: "600",
    color: "#121212",
    fontFamily: Fonts.family.kumbhSans,
    marginBottom: 4,
  },
  subjectDisciplines: {
    fontSize: 10,
    color: "#727272",
    fontFamily: Fonts.family.kumbhSans,
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
