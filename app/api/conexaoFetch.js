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
            await AsyncStorage.setItem("userID", data.id.toString());//tem q ser string pra salvar
            await AsyncStorage.setItem("userNome", data.nome);
            await AsyncStorage.setItem("userEmail", data.email);
            await AsyncStorage.setItem("userPontuacao", data.pontuacao.toString()); //tem q ser string pra salvar
            await AsyncStorage.setItem("userStreak", data.streak.toString());
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
            await saveToken(data.token);
            await AsyncStorage.setItem("userID", data.id.toString());//tem q ser string pra salvar
            await AsyncStorage.setItem("userNome", data.nome);
            await AsyncStorage.setItem("userEmail", data.email);
            await AsyncStorage.setItem("userPontuacao", data.pontuacao.toString()); //tem q ser string pra salvar
            await AsyncStorage.setItem("userStreak", data.streak.toString());
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

export async function updateCoinsBD(newCoin) {

    let idUser = await AsyncStorage.getItem("userID");
    idUser = parseInt(idUser);

    try {
        const response = await fetch("https://backend-aprovacefet.onrender.com/updateCoins", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newCoin,
                idUser
            }),
        });

        const text = await response.text();
        console.log("Resposta crua:", text);

        let data;
        try {
            data = JSON.parse(text);
        } catch (err) {
            console.error("Resposta não era JSON:", text);
            Alert.alert("Erro", "O servidor retornou algo inesperado.");
            return;
        }

        if (data.success) {
            await AsyncStorage.setItem("userPontuacao", newCoin.toString()); //tem q ser string pra salvar
            return true;
        } else {
            Alert.alert("Erro", data.message || "Erro ao conectar ao BD.");
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Erro ao conectar no servidor.");
    }
}

export async function updateStreakBD(newStreak) {

    let idUser = await AsyncStorage.getItem("userID");
    idUser = parseInt(idUser);

    try {
        const response = await fetch("https://backend-aprovacefet.onrender.com/updateStreak", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newStreak,
                idUser
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
            await AsyncStorage.setItem("userStreak", newStreak.toString()); //tem q ser string pra salvar
            return true;
        } else {
            Alert.alert("Erro", data.message || "Erro ao conectar ao BD.");
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Erro ao conectar no servidor.");
    }
}

export async function updateNomeBD(newNome) {

    let idUser = await AsyncStorage.getItem("userID");
    idUser = parseInt(idUser);

    try {
        const response = await fetch("https://backend-aprovacefet.onrender.com/updateNome", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newNome,
                idUser
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
            await AsyncStorage.setItem("userNome", newNome);
            return true;
        } else {
            Alert.alert("Erro", data.message || "Erro ao conectar ao BD.");
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Erro ao conectar no servidor.");
    }
}