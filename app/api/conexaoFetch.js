import {
    Alert
} from "react-native";
import {
    saveToken, getToken
} from "./manipulacaoTokens";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function validaCadastro(nome, email, senha) {
    try {
        //ESSE FETCH TA NO RENDER
        const response = await fetch("https://backend-aprovacefet.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome,
                email,
                senha
            }),
        });

        const text = await response.text();
        console.log("Resposta crua:", text);

        let data;
        try {
            data = JSON.parse(text);
        } catch (err) {
            console.error("Resposta não era JSON:", text);
            Alert.alert("Erro", "O servidor retornou algo inesperado.", [{
                text: "ok",
                onPress: () => console.log("jhsvafhgk")
            }]);
            return;
        }

        if (data.success) {
            await saveToken(data.token);
            await AsyncStorage.setItem("userNome", data.nome);
            await AsyncStorage.setItem("userEmail", data.email);
            await AsyncStorage.setItem("userPontuacao", data.pontuacao);
            await AsyncStorage.setItem("userStreak", data.streak);
            Alert.alert("Sucesso", data.message);
            return true;
        } else {
            Alert.alert("Erro", data.message || "Erro ao cadastrar.");
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Erro ao conectar no servidor.");
    }
}

export async function validaLogin(email, senha) {
    try {
        const response = await fetch("https://backend-aprovacefet.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                senha
            }),
        });

        const text = await response.text();
        console.log("Resposta crua:", text);

        let data;
        try {
            data = JSON.parse(text);
        } catch (err) {
            console.error("Resposta não era JSON:", text);
            Alert.alert("Erro", "O servidor retornou algo inesperado.", [{
                text: "ok",
                onPress: () => console.log("jhsvafhgk")
            }]);
            return;
        }

        if (data.success) {
            Alert.alert("Sucesso", data.message);
            return true;
        } else {
            Alert.alert("Erro", data.message || "Erro ao conectar ao BD.");
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Erro ao conectar no servidor.");
    }
}

const getPerfil = async () => {
    const token = await getToken();

    const response = await fetch("https://backend-aprovacefet.onrender.com/perfil", {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    const data = await response.json();

    if (response.ok) {
        console.log("Nome do usuário:", data.dados.nome);
        // aqui vc pode fazer setUserName(data.dados.nome) no state
    } else {
        console.log("Erro:", data.error);
    }
};