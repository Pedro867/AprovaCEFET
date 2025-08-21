import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import Animated from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import initialQuestions from './questoesConjuntos.json';

const imageMap = {
  "../../../assets/questoes/1.4.png": require('../../../assets/questoes/1.4.png'),
};

const QuizScreen = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [incorrectQuestions, setIncorrectQuestions] = useState([]);
  const [quizMode, setQuizMode] = useState('initial');
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const QUIZ_STATE_KEY = 'quizState';

  const saveQuizState = async (state) => {
    try {
      const jsonValue = JSON.stringify(state);
      await AsyncStorage.setItem(QUIZ_STATE_KEY, jsonValue);
    } catch (e) {
      console.error('Erro ao salvar o estado do quiz:', e);
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
    } catch (e) {
      console.error('Erro ao carregar o estado do quiz:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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

  const handleAnswerOptionClick = (answer) => {
    if (selectedAnswer) {
      return;
    }

    setSelectedAnswer(answer);
    const isCorrectAnswer = answer === questions[currentQuestionIndex].correctAnswer;

    if (isCorrectAnswer) {
      setScore(score + 1);
    } else {
      setIncorrectQuestions([...incorrectQuestions, questions[currentQuestionIndex]]);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedAnswer(null);
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
      setQuestions(initialQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setShowScore(false);
      setIncorrectQuestions([]);
      setSelectedAnswer(null);
      setQuizMode('initial');
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
      setQuizMode('review');
    } catch (e) {
      console.error('Erro ao refazer o quiz:', e);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Carregando quiz...</Text>
      </View>
    );
  }

  if (showScore) {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.replace('/(matematica)/(conjuntos)/conjuntos')} style={styles.backButton}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.scoreText}>Você terminou o quiz!</Text>
        <Text style={styles.scoreText}>Você ganhou {score} pontos!</Text>
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
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  // Adiciona a verificação aqui para evitar o erro de 'undefined'
  if (!currentQuestion) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Quiz inválido ou concluído.</Text>
        {/* Você pode adicionar um botão para voltar ou refazer o quiz aqui */}
      </View>
    );
  }

  return (
    <Animated.ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.replace('/(matematica)/(conjuntos)/conjuntos')} style={styles.backButton}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>

        <Text style={styles.questionText}>Questão {currentQuestionIndex + 1}</Text>
        {currentQuestion.image && <Image source={imageMap[currentQuestion.image]} style={styles.image} />}
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === option && (selectedAnswer === currentQuestion.correctAnswer ? styles.correctButton : styles.incorrectButton),
            ]}
            onPress={() => handleAnswerOptionClick(option)}
            disabled={!!selectedAnswer}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
        {selectedAnswer && (
          <TouchableOpacity style={styles.continueButton} onPress={handleNextQuestion}>
            <Text style={styles.continueButtonText}>Próxima</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
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
    height: '25%',
    marginBottom: 20,
    borderRadius: 10,
    resizeMode: 'contain'
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
  }
});

export default QuizScreen;