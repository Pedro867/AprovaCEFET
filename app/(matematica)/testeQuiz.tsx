import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Animated from 'react-native-reanimated';

const questions = [
  // Use a mesma estrutura de dados do exemplo acima.
  {
    id: '1',
    question: 'Num ponto de ônibus, passa um ônibus para a cidade de Rio das Quadras de 15 em 15 minutos e um ônibus para a cidade Tão Longe de 25 em 25 minutos. Se os dois ônibus passaram juntos às 7h30min, a que horas vão passar juntos novamente?',
    options: ['7h45min', '9h10min', '8h45min', '9h30min'],
    correctAnswer: '7h45min',
  },
  {
    id: '2',
    question: 'Num sítio temos uma rua de laranjeiras e, ao seu lado, uma rua de limoeiros. Os pés de laranja são plantados a cada 4 metros e os de limão, a cada 6 metros. No começo das ruas, foi plantado um pé de laranja em frente a um pé de limão. De quantos em quantos metros isso acontece?',
    options: ['24', '12', '10', '2'],
    correctAnswer: '24',
  },
  {
    id: '3',
    question: 'João tinha 36 abacaxis, 60 abacates e 84 maçãs. Ele quer separá-los em caixas com a mesma quantidade de frutas, sem misturar os três tipos. Qual é o Maior número possível de frutas colocadas em cada caixa? ',
    options: ['12', '24', '1260', '180'],
    correctAnswer: '12',
  },
  {
    id: '4',
    question: '(CEFET-2008) No trapézio ABCD da figura abaixo, as bases AB e CD estão divididas em partes iguais. Se a área do trapézio é S, então a área do triângulo PQR é',
    image: require('../../assets/questoes/1.4.png'),
    options: ['S * 3/5', 'S * 5/3', 'S * 3/8', 'S * 5/8'],
    correctAnswer: 'S * 3/5',
  },
];

const QuizScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOptionClick = (answer) => {
    // Se uma resposta já foi selecionada, não faça nada.
    if (selectedAnswer) {
      return;
    }

    setSelectedAnswer(answer);
    const isCorrectAnswer = answer === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(isCorrectAnswer);

    if (isCorrectAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setShowScore(true);
    }
  };

  //BUGADO AINDA
  const handlePreviusQuestion = () => {
    const previusQuestion = currentQuestionIndex - 1;
    if (previusQuestion >= 1) {
      setCurrentQuestionIndex(previusQuestion);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      //nada acontece
    }
  }

  if (showScore) {
    return (
      <View style={styles.container}>
        <Text style={styles.scoreText}>Você terminou o quiz!</Text>
        <Text style={styles.scoreText}>Sua pontuação é de {score} de {questions.length}.</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Animated.ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {/* Exibe o numero da questão */}
        <Text style={styles.questionText}>Questão {currentQuestion.id}</Text>

        {/* Exibe a imagem da pergunta, se houver */}
        {currentQuestion.image && <Image source={currentQuestion.image} style={styles.image} />}

        {/* Exibe a pergunta */}
        <Text style={styles.questionText}>{currentQuestion.question}</Text>

        {/* Opções de resposta */}
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === option && (isCorrect ? styles.correctButton : styles.incorrectButton),
            ]}
            onPress={() => handleAnswerOptionClick(option)}
            disabled={!!selectedAnswer}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}

        {/* Botão para continuar, visível apenas após a resposta */}
        {selectedAnswer && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.continueButton} onPress={handlePreviusQuestion}>
              <Text style={styles.continueButtonText}>Anterior</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.continueButton} onPress={handleNextQuestion}>
              <Text style={styles.continueButtonText}>Próximo</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1, // Allows the content to grow and fill the available space
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    backgroundColor: '#d4edda', // Verde claro
    borderColor: '#28a745', // Verde escuro
  },
  incorrectButton: {
    backgroundColor: '#f8d7da', // Vermelho claro
    borderColor: '#dc3545', // Vermelho escuro
  },
  buttonContainer: {
    flexDirection: 'row', // Define a direção do layout para linha
    gap: 30,             // Adiciona um espaçamento de 10 pixels entre os botões
    justifyContent: 'center', // Opcional: centraliza os botões horizontalmente
    alignItems: 'center',     // Opcional: centraliza os botões verticalmente
    marginTop: 10, 
    marginBottom: 10, 
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
});

export default QuizScreen;