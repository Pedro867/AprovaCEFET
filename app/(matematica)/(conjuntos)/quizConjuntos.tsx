import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextStyle,
  ViewStyle,
  Platform,
  Animated,
} from "react-native";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Personagem } from "@/components/ui/Personagem";
import { BotaoCustomizado } from "@/components/ui/ButtomCustom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useFocusEffect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors, Fonts } from "@/constants/Colors";
import initialQuestions from "./questoesConjuntos.json";
import { updateCoinsBD, updateStreakBD } from "@/app/api/conexaoFetch";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";

import { updateQuizBD, checkCompletedQuizes } from "@/app/api/conexaoFetch";
import { SECOES_PARA_EMBLEMAS, EMBLEMAS } from "@/constants/dadosEmblemas";

const personagemInicial = {
  background: "background1",
  ears: "orelha1",
  cheeks: "bochecha1",
  face: "rosto1",
  eyes: "olhos1",
  mouth: "boca1",
  bangs: "franja1",
  hair: "cabelo1",
  nose: "nariz1",
};

// --- TIPAGEM ---
interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  image?: string;
}

const imageMap: { [key: string]: any } = {
  "./q4.png": require("./q4.png"),
};

let tamanhoMathJax = 0;
//TAMANHO DO MATHJAX
if (Platform.OS == "web") {
  tamanhoMathJax = 2.5;
}
if (Platform.OS == "android") {
  tamanhoMathJax = 17;
}
if (Platform.OS == "ios") {
  tamanhoMathJax = 17; //testar dps
}

const QuizScreen = () => {
  const [quizStarted, setQuizStarted] = useState(false); //estado para controlar o inicio do quiz
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [incorrectQuestions, setIncorrectQuestions] = useState<Question[]>([]);
  const [quizMode, setQuizMode] = useState("initial");
  const [isLoading, setIsLoading] = useState(true);
  const [coins, setCoinsUsuario] = useState(0);
  const [showCoinsIncrease, setShowCoinsIncrease] = useState(false);
  const [coinsIncreaseAmount, setCoinsIncreaseAmount] = useState(0);
  const [customizacoes, setCustomizacoes] = useState(personagemInicial);
  const [userName, setUserName] = useState("");
  const [selectedEmblem, setSelectedEmblem] = useState<string | null>(null);

  const [lastStreakDate, setLastStreakDate] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);

  const router = useRouter();

  /* TORRES, essas KEYS provavelmente sao o nome dos campos do BD, algo assim */
  const QUIZ_STATE_KEY = "quizState";
  const COINS_KEY = "userPontuacao";
  const STREAK_KEY = "userStreak";
  const LAST_STREAK_DATE_KEY = "lastStreakDate";

  // Estados para a animação
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  const saveQuizState = async (state) => {
    /*try {
      const jsonValue = JSON.stringify(state);
      await AsyncStorage.setItem(QUIZ_STATE_KEY, jsonValue);
    } catch (e) {
      console.error('Erro ao salvar o estado do quiz:', e);
    }*/
  };

  //CARREGA DADOS DO USUÁRIO (NOME, PERSONAGEM, STREAK, EMBLEMA)
  useFocusEffect(
    useCallback(() => {
      const carregaDadosUsuario = async () => {
        try {
          const savedName = await AsyncStorage.getItem("userPrimeiroNome");
          if (savedName) {
            setUserName(savedName);
          }
        } catch (error) {
          console.error("Erro ao carregar nome do usuário", error);
        }

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
          // carrega o emblema selecionado
          const emblem = await AsyncStorage.getItem("selectedEmblem");
          setSelectedEmblem(emblem);
        } catch (error) {
          console.error("Erro ao carregar emblema na tela de seção", error);
        }

        try {
          const streakArmazenada = await AsyncStorage.getItem("userStreak");
          setStreak(streakArmazenada ? parseInt(streakArmazenada, 10) : 0);

          const lastDate = await AsyncStorage.getItem("lastStreakDate");
          setLastStreakDate(lastDate);
        } catch (error) {
          console.error("Erro ao carregar dados do streak", error);
        }
      };

      carregaDadosUsuario();
    }, [])
  );

  const finalizarQuiz = async () => {
    try {
      await updateQuizBD(score, 401); //401 eh o id do quiz
      const p4 = await checkCompletedQuizes(4); // 4 = Matemática

      const getCompletedCount = (
        r: any // normaliza: aceita tanto number quanto { completados: number }
      ) =>
        typeof r === "number"
          ? r
          : r && typeof r.completados === "number"
          ? r.completados
          : 0;

      const completados = getCompletedCount(p4);

      const totalQuizzesMatematica = SECOES_PARA_EMBLEMAS.matematica.length;

      if (completados >= totalQuizzesMatematica) {
        const unlockedEmblemsStr = await AsyncStorage.getItem(
          "unlockedEmblems"
        );
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
            "Você completou Matemática e ganhou o emblema 'Mestre da Matemática'!"
          );
        }
      }
    } catch (err) {
      console.error("Erro ao atualizar quiz:", err);
    }
  };

  const saveCoins = async (newCoin: number) => {
    try {
      await updateCoinsBD(newCoin);
    } catch (e) {
      console.error("Erro ao salvar o coin:", e);
    }
  };

  const saveStreak = async (newStreak: number) => {
    try {
      await updateStreakBD(newStreak);
      console.log(newStreak);
    } catch (e) {
      console.error("Erro ao salvar o streak:", e);
    }
  };

  const saveLastStreakDate = async (date: Date) => {
    try {
      await AsyncStorage.setItem(LAST_STREAK_DATE_KEY, date.toISOString());
    } catch (e) {
      console.error("Erro ao salvar a data do streak:", e);
    }
  };

  const loadQuizState = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(QUIZ_STATE_KEY);
      if (jsonValue != null) {
        const savedState = JSON.parse(jsonValue);
        if (savedState.currentQuestionIndex >= savedState.questions.length) {
          setShowScore(true);
          setScore(savedState.score);
        } else {
          setCurrentQuestionIndex(savedState.currentQuestionIndex);
          setScore(savedState.score);
        }
        setIncorrectQuestions(savedState.incorrectQuestions);
        setQuizMode(savedState.quizMode);
        setQuestions(
          savedState.quizMode === "initial"
            ? initialQuestions
            : savedState.incorrectQuestions
        );
      }
      // const coinValue = await AsyncStorage.getItem(coin_KEY);
      // if (coinValue != null) {
      //   setCoinsUsuario(parseInt(coinValue, 10));
      // }
    } catch (e) {
      console.error("Erro ao carregar o estado do quiz:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const carregaCoins = async () => {
      try {
        const coins = await AsyncStorage.getItem("userPontuacao");
        setCoinsUsuario(parseInt(coins));

        // Lógica para carregar a streak e a data
        const streakValue = await AsyncStorage.getItem(STREAK_KEY);
        if (streakValue != null) {
          setStreak(parseInt(streakValue, 10));
        }
        const lastStreakDate = await AsyncStorage.getItem(LAST_STREAK_DATE_KEY);
        if (lastStreakDate != null) {
          setLastStreakDate(new Date(lastStreakDate));
        }
      } catch (error) {
        console.error("Erro ao carregar as coins do usuário", error);
      }
    };

    carregaCoins();
    loadQuizState();
  }, []);

  useEffect(() => {
    if (!isLoading && !showScore) {
      const quizState = {
        currentQuestionIndex,
        score,
        incorrectQuestions,
        quizMode,
        questions: questions,
      };
      saveQuizState(quizState);
    }
  }, [
    currentQuestionIndex,
    score,
    incorrectQuestions,
    quizMode,
    isLoading,
    showScore,
    questions,
  ]);

  useEffect(() => {
    if (!isLoading) {
      saveCoins(coins);
    }
  }, [coins, isLoading]);

  useEffect(() => {
    // lógica para carregar estado inicial do quiz e do usuário
    const loadInitialData = async () => {
      try {
        // carregar moedas, streak, etc.
        const coinsValue = await AsyncStorage.getItem("userPontuacao");
        if (coinsValue) setCoinsUsuario(parseInt(coinsValue, 10));

        // Simula o carregamento
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados", error);
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleOptionSelect = (answer: string) => {
    if (!answered) {
      setSelectedAnswer(answer);
    }
  };

  const handleConfirmAnswer = async () => {
    if (!selectedAnswer) {
      Alert.alert(
        "Atenção",
        "Por favor, selecione uma alternativa antes de confirmar."
      );
      return;
    }

    setAnswered(true);

    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      // Lógica da streak diária
      const today = new Date();
      const todayString = today.toDateString();

      // A streak so aumenta se for a primeira resposta correta do dia
      if (lastStreakDate !== todayString) {
        const yestarday = new Date(today);
        yestarday.setDate(today.getDate() - 1);

        let newStreak = 1; // inicia ou reinicia a streak

        if (lastStreakDate === yestarday.toDateString()) {
          newStreak = streak + 1; // continua a streak
        }

        try {
          setStreak(newStreak);
          setLastStreakDate(todayString);

          await AsyncStorage.setItem("userStreak", newStreak.toString());
          await AsyncStorage.setItem("lastStreakDate", todayString);
          await updateStreakBD(newStreak);

          if(newStreak == 1){
            Alert.alert("Sequencia iniciada!", `Você iniciou uma streak de ${newStreak} dia! Mantenha o ritmo!`);
          } else{
            Alert.alert("Sequencia atualizada!", `Sua streak diária é de ${newStreak} dias! Continue assim!`);
          }
        } catch (error) {}
      }

      setScore(score + 1);
      let pointsToAdd = 0;
      if (quizMode === "initial") {
        pointsToAdd = 5;
      } else if (quizMode === "review") {
        pointsToAdd = 3;
      }
      const newCoins = coins + pointsToAdd;
      setCoinsUsuario(newCoins);
      setCoinsIncreaseAmount(pointsToAdd);
      setShowCoinsIncrease(true);

      // Inicia a animação
      animatedValue.setValue(0); // Reseta o valor para o início
      animatedOpacity.setValue(1); // Torna o texto visível

      Animated.parallel([
        Animated.timing(animatedValue, {
          toValue: 20, // Move para a direita
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0, // Desaparece
          duration: 800,
          delay: 200, // Começa a desaparecer um pouco depois
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowCoinsIncrease(false); // Esconde o componente no final da animação
      });
    } else {
      setIncorrectQuestions([
        ...incorrectQuestions,
        questions[currentQuestionIndex],
      ]);
    }
  };

  const handleNextQuestion = async () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowScore(true);
      finalizarQuiz(); //salva  a pontuação no BD
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false); // volta para a tela inicial
    setShowScore(false);
    setQuestions(initialQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIncorrectQuestions([]);
    setSelectedAnswer(null);
    setAnswered(false);
    setQuizMode("initial");
  };

  const redoIncorrectQuestions = async () => {
    if (incorrectQuestions.length === 0) {
      Alert.alert("Parabéns!", "Você não errou nenhuma questão.");
      return;
    }
    setShowScore(false);
    setQuestions(incorrectQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIncorrectQuestions([]);
    setSelectedAnswer(null);
    setAnswered(false);
    setQuizMode("review");
  };

  /**
   * renderiza a tela inicial do quiz com o personagem
   */
  const renderStartScreen = () => (
    <LinearGradient
      style={styles.container}
      locations={[0, 1]}
      colors={[Colors.gradientStart, Colors.gradientEnd]}
    >
      <View style={styles.startScreen}>
        <View style={styles.startHeader}>
          <TouchableOpacity
            onPress={() =>
              router.replace("/(matematica)/(conjuntos)/conjuntos")
            }
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.personagemContainer}>
          <Personagem
            size={150}
            customizations={customizacoes}
            emblemId={selectedEmblem}
          />
        </View>

        <View style={styles.startTextContainer}>
          <Text style={styles.welcomeText}>
            Ei, <Text style={styles.userName}>{userName}</Text>
          </Text>

          <Text style={styles.startTitle}>
            Preparado para o Quiz sobre{" "}
            <Text style={styles.differentText}>Conjuntos?</Text>
          </Text>

          <Text style={styles.startSubtitle}>
            Vamos testar o que você aprendeu!{"\n"}
            Dica: revise o material teórico antes de começar para garantir o
            máximo de pontos!
          </Text>
        </View>
        <View style={styles.footerButton}>
          <BotaoCustomizado onPress={handleStartQuiz} title="COMEÇAR QUIZ" />
        </View>
      </View>
    </LinearGradient>
  );

  /**
   * renderiza a tela de perguntas do quiz.
   */
  const renderQuizScreen = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
      <LinearGradient
        style={styles.container}
        locations={[0, 1]}
        colors={["rgba(107, 145, 226, 0.8)", "rgba(255, 255, 255, 0.8)"]}
      >
        <View style={styles.startHeader}>
          <TouchableOpacity
            onPress={() =>
              router.replace("/(matematica)/(conjuntos)/conjuntos")
            }
            style={styles.backButton2}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <View style={styles.coinContainer}>
            <Image
              source={require("@/assets/images/pontos.png")}
              style={styles.coinIcon}
            />
            <Text style={styles.coinNumber}>{coins}</Text>

            {showCoinsIncrease && (
              <Animated.View
                style={[
                  styles.coinsIncreaseContainer,
                  {
                    opacity: animatedOpacity,
                    transform: [{ translateX: animatedValue }],
                  },
                ]}
              >
                <Text style={styles.coinsIncreaseText}>
                  +{coinsIncreaseAmount}
                </Text>
              </Animated.View>
            )}
          </View>
        </View>

        <View style={styles.header}>
          <ProgressBar
            progress={progress}
            height={10}
            backgroundColor="#E5E5E5"
            progressColor="#0D1B52" // azul escuro
            style={styles.progressBar}
          />
          <Text style={styles.progressText}>
            {currentQuestionIndex + 1} / {questions.length}
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.quizScrollViewContent}>
          <View style={styles.questionContainer}>
            <View style={styles.questionBox}>
              {currentQuestion.image && (
                <Image
                  source={imageMap[currentQuestion.image]}
                  style={styles.image}
                />
              )}
              <Text style={styles.questionText}>
                {currentQuestion.question}
              </Text>
            </View>

            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = currentQuestion.correctAnswer === option;
                const style: (ViewStyle | TextStyle)[] = [styles.optionButton];
                if (answered) {
                  if (isCorrect) style.push(styles.correctButton);
                  else if (isSelected) style.push(styles.incorrectButton);
                } else if (isSelected) {
                  style.push(styles.selectedButton);
                }

                return (
                  <TouchableOpacity
                    key={index}
                    style={style}
                    onPress={() => handleOptionSelect(option)}
                    disabled={answered}
                  >
                    {parseAndRenderMathOptions2(option)}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.actionButtonContainer}>
            {!answered ? (
              <BotaoCustomizado
                onPress={handleConfirmAnswer}
                disabled={!selectedAnswer}
                title="CONFIRMAR"
              />
            ) : (
              <BotaoCustomizado
                onPress={handleNextQuestion}
                title="PRÓXIMA QUESTÃO"
              />
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    );
  };

  /**
   * renderiza a tela de pontuação final.
   */
  const renderScoreScreen = () => (
    <LinearGradient
      style={styles.container}
      locations={[0, 1]}
      colors={["rgba(107, 145, 226, 0.8)", "rgba(255, 255, 255, 0.8)"]}
    >
      <View style={styles.startHeader}>
        <TouchableOpacity
          onPress={() => router.replace("/(matematica)/(conjuntos)/conjuntos")}
          style={styles.backButton2}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.coinContainer}>
          <Image
            source={require("@/assets/images/pontos.png")}
            style={styles.coinIcon}
          />
          <Text style={styles.coinNumber}>{coins}</Text>

          {showCoinsIncrease && (
            <Animated.View
              style={[
                styles.coinsIncreaseContainer,
                {
                  opacity: animatedOpacity,
                  transform: [{ translateX: animatedValue }],
                },
              ]}
            >
              <Text style={styles.coinsIncreaseText}>
                +{coinsIncreaseAmount}
              </Text>
            </Animated.View>
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scoreScrollViewContent}>
        <View style={styles.scoreContent}>
          <Image
            style={styles.trofeuIcon}
            source={require("@/assets/images/trofeu.png")}
          />
          <Text style={styles.quizFinalizado}>QUIZ FINALIZADO!</Text>
          <Text style={styles.quizFinalizadoSub}>
            Você acertou {score} de {questions.length} questões!
          </Text>
        </View>
        <View style={styles.scoreButtonContainer}>
          <BotaoCustomizado onPress={resetQuiz} title="REFAZER QUIZ" />
          <BotaoCustomizado
            onPress={redoIncorrectQuestions}
            title="REFAZER QUESTÕES ERRADAS"
            disabled={incorrectQuestions.length === 0}
          />
          <BotaoCustomizado
            onPress={() =>
              router.replace("/(matematica)/(potencia_radiciacao)/pot_rad")
            }
            title="IR PARA O PRÓXIMO MÓDULO"
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );

  // --- renderização ---
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!quizStarted) {
    return renderStartScreen();
  }

  if (showScore) {
    finalizarQuiz();
    return renderScoreScreen();
  }

  return renderQuizScreen();
};

const parseAndRenderMathOptions = (text: string) => {
  // A regex agora busca por fórmulas ($...$) ou texto em negrito (**...**)
  const parts = text.split(/(\$[^\$]+\$|\*\*[^\*]+\*\*)/);

  return (
    <Text style={styles.optionText}>
      {parts.map((part, index) => {
        if (part.startsWith("$") && part.endsWith("$")) {
          return (
            <MathJaxSvg
              key={index}
              color={styles.optionText.color}
              fontSize={tamanhoMathJax}
            >
              {part}
            </MathJaxSvg>
          );
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          // Remove os asteriscos e aplica o estilo de negrito
          return (
            <Text key={index} style={styles.boldText}>
              {part.slice(2, -2)}
            </Text>
          );
        }
        return part;
      })}
    </Text>
  );
};

const parseAndRenderMathOptions2 = (text: string) => {
  // Regex para capturar fórmulas ($...$) e texto em negrito (**...**)
  const regex = /(\$\$[\s\S]*?\$\$|\$[^\$]+\$|\*\*[^\*]+\*\*)/g;
  const parts = text.split(regex).filter(Boolean); // Filtra strings vazias

  return (
    <Text style={styles.optionText}>
      {parts.map((part, index) => {
        if (part.startsWith("$$") && part.endsWith("$$")) {
          // Fórmulas em display mode
          return (
            <View key={index}>
              <MathJaxSvg
                key={`math-display-${index}`}
                fontSize={tamanhoMathJax}
                color={styles.optionText.color}
              >
                {part}
              </MathJaxSvg>
            </View>
          );
        }
        if (part.startsWith("$") && part.endsWith("$")) {
          // Fórmulas inline
          return (
            <MathJaxSvg
              key={`math-inline-${index}`}
              fontSize={tamanhoMathJax}
              color={styles.optionText.color}
            >
              {part}
            </MathJaxSvg>
          );
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          // Texto em negrito
          return (
            <Text key={`bold-${index}`} style={styles.boldText}>
              {part.slice(2, -2)}
            </Text>
          );
        }
        // Texto normal
        return (
          <Text key={`text-${index}`} style={styles.optionText}>
            {part}
          </Text>
        );
      })}
    </Text>
  );
};

/* PRECISA MUDAR A FUNÇÃO PARA RETORNAR A STRING DAS OPÇÕES PQ É UM TOUCHABLEOPACITY */

const styles = StyleSheet.create({
  //estilos gerais e carregamento
  container: { flex: 1, width: "100%" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },

  //Tela inicial
  startScreen: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 30,
  },
  backButton2: {
    marginTop: 15,
  },
  personagemContainer: {
    alignItems: "center",
  },
  startTextContainer: {
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 10,
  },
  welcomeText: {
    fontSize: 46,
    fontFamily: Fonts.family.bold,
    textAlign: "center",
    color: "#ffffffff",
  },
  userName: {
    color: "#0D1B52",
    fontFamily: Fonts.family.bold,
  },

  differentText: {
    color: "#0D1B52",
    fontFamily: Fonts.family.bold,
  },
  startTitle: {
    fontSize: 32,
    fontFamily: Fonts.family.bold,
    textAlign: "center",
    color: "#ffffffff",
  },
  startSubtitle: {
    fontSize: 16,
    fontFamily: Fonts.family.kumbhSans,
    textAlign: "center",
    color: Colors.primary,
    paddingHorizontal: 20,
  },
  footerButton: {
    alignItems: "center",
    marginBottom: "10%",
  },

  // Estilos da Tela de Quiz
  quizScrollViewContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  startHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 40,
    marginLeft: 30,
    marginRight: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  progressBar: {
    flex: 1,
  },
  progressText: {
    fontSize: 14,
    fontFamily: Fonts.family.bold,
    color: "white",
  },

  coinContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative", // Necessário para posicionar o Animated.View
    marginRight: 20,
  },

  coinIcon: {
    width: 30,
    height: 30,
  },

  coinNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },

  questionContainer: { flex: 1, justifyContent: "center" },
  questionBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    fontFamily: Fonts.family.kumbhSans,
    textAlign: "center",
    lineHeight: 30,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginBottom: 10,
  },
  optionsContainer: { marginTop: 10 },
  optionButton: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  optionText: {
    fontSize: 18,
    fontFamily: Fonts.family.kumbhSans,
    color: "#333",
  },
  boldText: {
    fontFamily: Fonts.family.bold,
    color: "#333",
  },
  selectedButton: { borderColor: "#007bff", borderWidth: 3 },
  correctButton: { backgroundColor: "#d4edda", borderColor: "#28a745" },
  incorrectButton: { backgroundColor: "#f8d7da", borderColor: "#dc3545" },
  actionButtonContainer: {
    paddingBottom: 10,
    alignItems: "center",
    marginTop: 10,
  },

  // Estilos da Tela de Pontuação Final
  scoreScrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  scoreContent: { alignItems: "center", gap: 10, marginBottom: 70 },
  trofeuIcon: { width: 200, height: 200 },
  quizFinalizado: {
    fontSize: 32,
    fontFamily: Fonts.family.bold,
    textAlign: "center",
    color: Colors.primary,
  },
  quizFinalizadoSub: {
    fontSize: 22,
    fontFamily: Fonts.family.kumbhSans,
    textAlign: "center",
  },
  scoreButtonContainer: {
    width: "90%",
    gap: 40,
    alignItems: "center",
  },

  //animação de pontuação
  coinsIncreaseContainer: {
    position: "absolute",
    right: 0,
    alignItems: "center",
  },
  coinsIncreaseText: {
    fontSize: 18,
    fontFamily: Fonts.family.bold,
    color: "#28a745", // Verde para pontos positivos
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default QuizScreen;
