import {
    Alert
} from "react-native";
import {
    saveToken,
} from "./manipulacaoTokens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Personagem } from "@/components/ui/Personagem";

export async function validaCadastro(nome, email, senha, todayString) {
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
                senha,
                todayString
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
            await AsyncStorage.setItem("userID", data.id.toString()); //tem q ser string pra salvar
            await AsyncStorage.setItem("userNome", data.nome);
            await AsyncStorage.setItem("userPrimeiroNome", data.primeiroNome);
            await AsyncStorage.setItem("userEmail", data.email);
            await AsyncStorage.setItem("userPontuacao", data.pontuacao.toString()); //tem q ser string pra salvar
            await AsyncStorage.setItem("userStreak", data.streak.toString());
            await AsyncStorage.setItem("inicioEstudo", data.todayString);
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
            await AsyncStorage.setItem("userID", data.id.toString()); //tem q ser string pra salvar
            await AsyncStorage.setItem("userNome", data.nome);
            await AsyncStorage.setItem("userPrimeiroNome", data.primeiroNome);
            await AsyncStorage.setItem("userEmail", data.email);
            await AsyncStorage.setItem("userPontuacao", data.pontuacao.toString()); //tem q ser string pra salvar
            await AsyncStorage.setItem("userStreak", data.streak.toString());
            await AsyncStorage.setItem("dataProva", data.dataProva);
            await AsyncStorage.setItem("inicioEstudo", data.dataInicio);
            await AsyncStorage.setItem("lastStreakDate", data.lastStreakDate);
            await AsyncStorage.setItem("bestStreak", data.bestStreak.toString());
            
            //SALVANDO PERSONAGEM
            const customizacoes = ({
                background: data.background,
                ears: data.ears,
                cheeks: data.cheeks,
                face: data.face,
                eyes: data.eyes,
                mouth: data.mouth,
                bangs: data.bangs,
                hair: data.hair,
                nose: data.nose,
                //faceColor: data.faceColor,
                //faceShadowColor: CORES_ROSTO[0].sombra,
            });
            await AsyncStorage.setItem(
                "userCharacter",
                JSON.stringify(customizacoes)
            );
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

export async function checkQuizCompleted(idQuiz) {

    let idUser = await AsyncStorage.getItem("userID");
    idUser = parseInt(idUser);

    try {
        const response = await fetch("https://backend-aprovacefet.onrender.com/checkQuizCompleted", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idUser,
                idQuiz
            }),
        });

        const text = await response.text();
        let data;

        try {
            data = JSON.parse(text);
        } catch (err) {
            console.error("Resposta não era JSON:", text);
            Alert.alert("Erro", "O servidor retornou algo inesperado.");
            return;
        }

        if (data.success) {
            return data.completed;
        } else {
            Alert.alert("Erro", data.message || "Erro ao conectar ao BD.");
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Erro ao conectar no servidor.");
    }
}

export async function updateQuizBD(acertos, idQuiz) {

    let idUser = await AsyncStorage.getItem("userID");
    idUser = parseInt(idUser);

    try {
        const response = await fetch("https://backend-aprovacefet.onrender.com/updateQuiz", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                acertos,
                idUser,
                idQuiz
            }),
        });

        const text = await response.text();
        let data;

        try {
            data = JSON.parse(text);
        } catch (err) {
            console.error("Resposta não era JSON:", text);
            Alert.alert("Erro", "O servidor retornou algo inesperado.");
            return;
        }

        if (data.success) {
            return true;
        } else {
            Alert.alert("Erro", data.message || "Erro ao conectar ao BD.");
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Erro ao conectar no servidor.");
    }
}

export async function updatePersonalizacoesBD(itemId) {

    let idUser = await AsyncStorage.getItem("userID");
    idUser = parseInt(idUser);

    try {
        const response = await fetch("https://backend-aprovacefet.onrender.com/updatePersonalizacao", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                itemId,
                idUser,
            }),
        });

        const text = await response.text();
        let data;

        try {
            data = JSON.parse(text);
        } catch (err) {
            console.error("Resposta não era JSON:", text);
            Alert.alert("Erro", "O servidor retornou algo inesperado.");
            return;
        }

        if (data.success) {
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

export async function updatelastStreakDateBD(newDate) {
    let idUser = await AsyncStorage.getItem("userID");
    idUser = parseInt(idUser);

    try {
        const response = await fetch("https://backend-aprovacefet.onrender.com/updateLastStreakDate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idUser,
                newDate,
            }),
        });

        const text = await response.text();

        let data;
        try {
            data = JSON.parse(text);
        } catch (err) {
            console.error("Resposta não era JSON:", text);
            Alert.alert("Erro", "O servidor retornou algo inesperado.", [{
                text: "ok",
                onPress: () => console.log("jhsvafhgk")
            }]);
        }

        if (data.success) {
            await AsyncStorage.setItem("lastStreakDate", newDate);
            return true;
        } else {
            Alert.alert("Erro", data.message || "Erro ao conectar ao BD.");
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Erro ao conectar no servidor.");
        return;
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

export async function updateSenhaBD(newSenha) {

    let idUser = await AsyncStorage.getItem("userID");
    idUser = parseInt(idUser);

    try {
        const response = await fetch("https://backend-aprovacefet.onrender.com/updateSenha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newSenha,
                idUser
            }),
        });

        const text = await response.text();

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
            return true;
        } else {
            Alert.alert("Erro", data.message || "Erro ao conectar ao BD.");
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Erro ao conectar no servidor.");
    }
}

export async function deleteAcc() {
    let idUser = await AsyncStorage.getItem("userID");
    idUser = parseInt(idUser);

    try {
        const response = await fetch("https://backend-aprovacefet.onrender.com/deleteAcc", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
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
            //DEPOIS TIRAR OS TOKENS
            return true;
        } else {
            Alert.alert("Erro", data.message || "Erro ao conectar ao BD.");
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Erro ao conectar no servidor.");
    }
}

export async function saveData(selectedDate) {
    let idUser = await AsyncStorage.getItem("userID");
    idUser = parseInt(idUser);

    try {
        const response = await fetch("https://backend-aprovacefet.onrender.com/saveData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idUser,
                selectedDate
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
            return true;
        } else {
            Alert.alert("Erro", data.message || "Erro ao conectar ao BD.");
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Erro ao conectar no servidor.");
    }
}

//ESSA FUNCAO SERVE P VERIFICAR SE A SENHA CONCEDIDA COINCIDE COM A DO BD
export async function checkSenha(senha) {
    let idUser = await AsyncStorage.getItem("userID");
    idUser = parseInt(idUser);

    try {
        const response = await fetch("https://backend-aprovacefet.onrender.com/checkSenha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idUser,
                senha
            }),
        });

        const text = await response.text();

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
            return true;
        } else {
            Alert.alert("Erro", data.message || "Erro ao conectar ao BD.");
            return false;
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Erro ao conectar no servidor.");
    }
}

//ESSA FUNCAO SERVE P VER QUANTOS QUIZES DE DETERMINADA MATERIA O ALUNO JA FEZ
export async function checkCompletedQuizes(disciplina) { //O(S) PRIMEIRO(S) NUMERO(S) DO ID DO QUIZ
    let idUser = await AsyncStorage.getItem("userID");
    idUser = parseInt(idUser);

    try {
        const response = await fetch("https://backend-aprovacefet.onrender.com/checkCompletedQuizes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idUser,
                disciplina
            }),
        });

        const text = await response.text();

        let data;
        try {
            data = JSON.parse(text);
        } catch (err) {
            console.error("Resposta não era JSON:", text);
            Alert.alert("Erro", "O servidor retornou algo inesperado.", [{
                text: "ok",
                onPress: () => console.log("jhsvafhgk")
            }]);
            return 0;
        }

        if (data.success) {
            return parseInt(data.completados);
        } else {
            Alert.alert("Erro", data.message || "Erro ao conectar ao BD.");
            return 0;
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Erro ao conectar no servidor.");
        return 0;
    }
}

export async function getLastStreakDateBD() {
    let idAluno = await AsyncStorage.getItem("userID");
    idAluno = parseInt(idAluno);

    try {
        const response = await fetch("https://backend-aprovacefet.onrender.com/getLastStreakDate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idAluno,
            }),
        });

        const text = await response.text();

        let data;
        try {
            data = JSON.parse(text);
        } catch (err) {
            console.error("Resposta não era JSON:", text);
            Alert.alert("Erro", "O servidor retornou algo inesperado.", [{
                text: "ok",
                onPress: () => console.log("jhsvafhgk")
            }]);
            return 0;
        }

        if (data.success) {
            return data.lastStreakDate;
        } else {
            Alert.alert("Erro", data.message || "Erro ao conectar ao BD.");
            return 0;
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Erro", "Erro ao conectar no servidor.");
        return 0;
    }
}