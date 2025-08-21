import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link, useNavigation } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { validaCadastro } from "../api/conexaoFetch";
import { Spacing, Fonts, Colors } from "@/constants/Colors";
import { BotaoCustomizado } from "@/components/ui/ButtomCustom";
import { InputCustomizado } from "@/components/ui/InputCustom";
import Animated from 'react-native-reanimated';
import { useRouter } from 'expo-router';

export default function SignScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    //funcao assincrona, chamada quando o botao registrar é pressionado
    //valida os campos
    if (
      !nome.trim() ||
      !email.trim() ||
      !senha.trim() ||
      !confirmarSenha.trim()
    ) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    // chama a API de cadastro
    //comentado para testes com bd desligado
    // const sucesso = await validaCadastro(nome, email, senha);
    const sucesso = true;
    if (sucesso) {
      router.replace('/(telas)/registerDate')
    } else {
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 20} // Ajuste este valor se tiver um header
    >
      <Animated.ScrollView contentContainerStyle={styles.scrollViewContent}>
        <LinearGradient
          colors={[Colors.gradientStart, Colors.gradientEnd]}
          style={styles.container}
        >
          <View style={styles.headerContainer}>
            <Image
              source={require("@/assets/images/logoAprovaCefet.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>BEM VINDO!</Text>
            <Text style={styles.subtitle}>Preencha seus dados para continuar</Text>
          </View>

          <View style={styles.formContainer}>
            <InputCustomizado
              label="Nome Completo"
              value={nome}
              onChangeText={setNome}
              placeholder="Digite seu nome completo"
              keyboardType="default"
              autoCapitalize="words"
            />
            <InputCustomizado
              label="Endereço de email"
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <InputCustomizado
              label="Senha"
              value={senha}
              onChangeText={setSenha}
              placeholder="Digite sua senha"
              isPassword
            />

            <InputCustomizado
              label="Confirmar senha"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              placeholder="Digite sua senha novamente"
              isPassword
            />
          </View>

          <View style={styles.footerContainer}>
            <BotaoCustomizado title="CADASTRAR" onPress={handleRegister} />
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Já possui uma conta? </Text>
              <Link href="/login" asChild>
                <TouchableOpacity>
                  <Text style={styles.loginLink}>Faça Login</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </LinearGradient>
      </Animated.ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1, // Permite que a view ocupe todo o espaço disponível
  },
  scrollViewContent: {
    flexGrow: 1, // Allows the content to grow and fill the available space
  },
  container: {
    flex: 1,
    padding: Spacing.large,
    alignItems: "center",
    justifyContent: "center", // center para acomodar mais campos
  },
  headerContainer: {
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  logo: {
    width: 156,
    height: 156,
    marginBottom: Spacing.medium,
  },
  title: {
    fontSize: 18,
    fontWeight: Fonts.weight.bold as 'bold',
    color: Colors.primary,
    lineHeight: 30,
  },
  subtitle: {
    fontSize: Fonts.size.medium,
    color: Colors.primary,
    lineHeight: 30,
  },
  formContainer: {
    width: "100%",
    gap: Spacing.formGap, // diminui o espaçamento para caber tudo
  },
  footerContainer: {
    width: "100%",
    alignItems: "center",
    gap: 20,
    marginTop: 25,
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    fontWeight: "500",
    color: "black",
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "500",
    color: "#004ef799",
  },
});
