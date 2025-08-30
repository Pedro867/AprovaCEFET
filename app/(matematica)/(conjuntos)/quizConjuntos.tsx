import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import initialQuestions from './questoesConjuntos.json';
import { updateCoinsBD, updateStreakBD } from '@/app/api/conexaoFetch'; 
// import MathView from "react-native-math-view"


const imageMap = {
  "./q4.png": require('./q4.png'),
};

const QuizScreen = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [quizMode, setQuizMode] = useState('initial');
  const [isLoading, setIsLoading] = useState(true);
  const [coins, setCoinsUsuario] = useState(0);
  const [showCoinsIncrease, setShowCoinsIncrease] = useState(false);
  const [coinsIncreaseAmount, setCoinsIncreaseAmount] = useState(0);
  const [lastStreakDate, setLastStreakDate] = useState(0);
  const [streak, setStreak] = useState(0);

  const router = useRouter();

  /* TORRES, essas KEYS provavelmente sao o nome dos campos do BD, algo assim */
  const QUIZ_STATE_KEY = 'quizState';
  const COINS_KEY = 'userPontuacao';
  const STREAK_KEY = 'userStreak';
  const LAST_STREAK_DATE_KEY = 'lastStreakDate';

  const saveQuizState = async (state) => {
    /*try {
      const jsonValue = JSON.stringify(state);
      await AsyncStorage.setItem(QUIZ_STATE_KEY, jsonValue);
    } catch (e) {
      console.error('Erro ao salvar o estado do quiz:', e);
    }*/
  };

  const saveCoins = async (newCoin) => {
    try {
      await updateCoinsBD(newCoin);
    } catch (e) {
      console.error('Erro ao salvar o coin:', e);
    }
  };

  const saveStreak = async (newStreak) => {
    try {
      await updateStreakBD(newStreak);
      console.log(newStreak);
    } catch (e) {
      console.error('Erro ao salvar o streak:', e);
    }
  };

  const saveLastStreakDate = async (date) => {
    try {
      await AsyncStorage.setItem(LAST_STREAK_DATE_KEY, date.toISOString());
    } catch (e) {
      console.error('Erro ao salvar a data do streak:', e);
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
        setQuestions(savedState.quizMode === 'initial' ? initialQuestions : savedState.incorrectQuestions);
      }
      // const coinValue = await AsyncStorage.getItem(coin_KEY);
      // if (coinValue != null) {
      //   setCoinsUsuario(parseInt(coinValue, 10));
      // }
    } catch (e) {
      console.error('Erro ao carregar o estado do quiz:', e);
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
  }, [currentQuestionIndex, score, incorrectQuestions, quizMode, isLoading, showScore, questions]);

  useEffect(() => {
    if (!isLoading) {
      saveCoins(coins);
    }
  }, [coins, isLoading]);

  const handleOptionSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleConfirmAnswer = () => {
    if (!selectedAnswer) {
      Alert.alert("Atenção", "Por favor, selecione uma alternativa antes de confirmar.");
      return;
    }

    setAnswered(true);

    const isCorrectAnswer = selectedAnswer === questions[currentQuestionIndex].correctAnswer;

    if (isCorrectAnswer) {
      setScore(score + 1);
      let pointsToAdd = 0;
      if (quizMode === 'initial') {
        pointsToAdd = 5;
      } else if (quizMode === 'review') {
        pointsToAdd = 3;
      }
      const newCoins = coins + pointsToAdd;
      setCoinsUsuario(newCoins);
      setCoinsIncreaseAmount(pointsToAdd);
      setShowCoinsIncrease(true);
      setTimeout(() => {
        setShowCoinsIncrease(false);
      }, 1000);

      // Lógica da streak diária
      const today = new Date();
      const isNewDay = !lastStreakDate || today.toDateString() !== lastStreakDate.toDateString();

      // LÓGICA DE AUMENTAR SÓ UMA VEZ POR DIA
      if (isNewDay) {
        setStreak(prevStreak => prevStreak + 1);
        setLastStreakDate(today);
        saveStreak(streak + 1);
        saveLastStreakDate(today);
      }
      // saveStreak(streak + 1);

    } else {
      setIncorrectQuestions([...incorrectQuestions, questions[currentQuestionIndex]]);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowScore(true);
      saveQuizState({
        currentQuestionIndex: nextQuestion,
        score: score + (selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 1 : 0),
        incorrectQuestions: selectedAnswer === questions[currentQuestionIndex].correctAnswer ? incorrectQuestions : [...incorrectQuestions, questions[currentQuestionIndex]],
        quizMode,
        questions: questions,
      });
    }
  };

  const resetQuiz = async () => {
    try {
      await AsyncStorage.removeItem(QUIZ_STATE_KEY);
      //await AsyncStorage.removeItem(COINS_KEY);
      setQuestions(initialQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setShowScore(false);
      setIncorrectQuestions([]);
      setSelectedAnswer(null);
      setAnswered(false);
      setQuizMode('initial');
      //setCoinsUsuario(0);
    } catch (e) {
      console.error('Erro ao resetar o quiz:', e);
    }
  };

  const redoIncorrectQuestions = async () => {
    try {
      await AsyncStorage.removeItem(QUIZ_STATE_KEY);
      setQuestions(incorrectQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setShowScore(false);
      setIncorrectQuestions([]);
      setSelectedAnswer(null);
      setAnswered(false);
      setQuizMode('review');
    } catch (e) {
      console.error('Erro ao refazer o quiz:', e);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando quiz...</Text>
      </View>
    );
  }

  if (showScore) {
    return (
      <LinearGradient
        style={styles.container}
        colors={[Colors.gradientEnd, Colors.gradientStart]}
      >
        <TouchableOpacity onPress={() => router.replace('/(matematica)/(conjuntos)/conjuntos')} style={styles.backButton}>
          <IconSymbol name="arrow.left" size={32} color={Colors.light.text} />
        </TouchableOpacity>
        <View style={styles.coinContainerScore}>
          <Image
            source={require("@/assets/images/pontos.png")}
            style={styles.coinIcon}
          />
          <Text style={styles.coinNumber}>{coins}</Text>
        </View>
        <Text style={styles.scoreText}>Você terminou o quiz!</Text>
        <Text style={styles.scoreText}>Você acertou {score} de {questions.length} questões!</Text>
        <Text style={styles.scoreText}>Você ganhou um total de {coins} CefetCoins!</Text>
        <TouchableOpacity style={styles.exitButton} onPress={() => router.replace('/(matematica)/(conjuntos)/conjuntos')}>
          <Text style={styles.continueButtonText}>Sair do Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exitButton} onPress={resetQuiz}>
          <Text style={styles.continueButtonText}>Refazer</Text>
        </TouchableOpacity>
        {incorrectQuestions.length > 0 && (
          <TouchableOpacity style={styles.redoButton} onPress={redoIncorrectQuestions}>
            <Text style={styles.continueButtonText}>Refazer Questões Erradas</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (!currentQuestion) {
    return (
      <LinearGradient
        style={styles.container}
        colors={[Colors.gradientEnd, Colors.gradientStart]}
      >
        <Text style={styles.loadingText}>Quiz inválido ou concluído.</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={[Colors.gradientEnd, Colors.gradientStart]}
    >
      <TouchableOpacity onPress={() => router.replace('/(matematica)/(conjuntos)/conjuntos')} style={styles.backButton}>
        <IconSymbol name="arrow.left" size={32} color={Colors.light.text} />
      </TouchableOpacity>
      <View style={styles.coinContainer}>
        <Image
          source={require("@/assets/images/pontos.png")}
          style={styles.coinIcon}
        />
        <Text style={styles.coinNumber}>{coins}</Text>
        {showCoinsIncrease && (
          <Animated.Text entering={FadeIn.duration(500)} exiting={FadeOut.duration(500)} style={styles.coinIncrease}>
            +{coinsIncreaseAmount}
          </Animated.Text>
        )}
      </View>
      <Animated.ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* <MathView
          math="Questao /frac{1}{2}"
          style={styles.questionText}
        /> */}
        <Text style={styles.questionText}>Questão {currentQuestionIndex + 1}</Text>
        {currentQuestion.image && <Image source={imageMap[currentQuestion.image]} style={styles.image} />}
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === option && !answered && styles.selectedButton,
              answered && selectedAnswer === option && (selectedAnswer === currentQuestion.correctAnswer ? styles.correctButton : styles.incorrectButton),
              answered && selectedAnswer !== option && (option === currentQuestion.correctAnswer ? styles.correctButton : null)
            ]}
            onPress={() => handleOptionSelect(option)}
            disabled={answered}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
        {!answered && selectedAnswer && (
          <TouchableOpacity style={styles.continueButton} onPress={handleConfirmAnswer}>
            <Text style={styles.continueButtonText}>Confirmar Resposta</Text>
          </TouchableOpacity>
        )}
        {answered && (
          <TouchableOpacity style={styles.continueButton} onPress={handleNextQuestion}>
            <Text style={styles.continueButtonText}>Próxima</Text>
          </TouchableOpacity>
        )}
      </Animated.ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: 100,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  selectedButton: {
    borderColor: '#007bff',
    borderWidth: 2,
  },
  correctButton: {
    backgroundColor: '#d4edda',
    borderColor: '#28a745',
  },
  incorrectButton: {
    backgroundColor: '#f8d7da',
    borderColor: '#dc3545',
  },
  continueButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '80%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  exitButton: {
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  redoButton: {
    backgroundColor: '#ffc107',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  coinContainer: {
    position: 'absolute',
    top: 50,
    right: 50,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  coinContainerScore: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  coinIcon: {
    width: 30,
    height: 30,
  },
  coinNumber: {
    fontSize: 20,
    color: "#060302",
    fontWeight: "bold",
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    marginLeft: 5,
  },
  coinIncrease: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
    position: 'absolute',
    right: -25,
    top: -5,
  },
});

export default QuizScreen;