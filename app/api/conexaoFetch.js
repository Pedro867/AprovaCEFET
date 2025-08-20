import {
    Alert
} from "react-native";

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
            Alert.alert("Erro", "O servidor retornou algo inesperado.", [{text: "ok", onPress: ()=> console.log("jhsvafhgk")}] );
            return;
        }

        if (data.success) {
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
            Alert.alert("Erro", "O servidor retornou algo inesperado.", [{text: "ok", onPress: ()=> console.log("jhsvafhgk")}] );
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

    let nome;
    let email;
    let streak;
    let pontuacao;

export async function checksessao() {
    try {
        const response = await fetch("https://backend-aprovacefet.onrender.com/getDados", {
            method: "GET",
            credentials: "include",
        });

        const text = await response.text();
        console.log("Resposta crua:", text);

        let data;
        try {
            data = JSON.parse(text);
        } catch (err) {
            //NAO TINHA SESSAO
            return false;
        }

        if (data.success) {
            nome = data.nome;
            email = data.email;
            streak = data.streak;
            pontuacao = data.pontuacao;
            return true;
        } else {
            Alert.alert("Erro", data.message || "Erro ao conectar ao BD.");
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Erro ao conectar no servidor.");
        return false;
    }
}