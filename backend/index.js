import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
const SECRET = "chave-secreta";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
    const {
        nome,
        email,
        senha
    } = req.body;

    //mysql://root:yYvSsJUUdmehuFwxTMzNGWKFHCHdYlye@trolley.proxy.rlwy.net:16798/railway

    //const emailValido = validaEmail(email);

    /*if (!emailValido) {
        res.json({
            success: false,
            message: "Email inválido!",
        });
        return false;
    } else {*/
    try {
        const conn = await mysql.createConnection({
            host: "trolley.proxy.rlwy.net",
            port: "16798",
            user: "root",
            password: "yYvSsJUUdmehuFwxTMzNGWKFHCHdYlye",
            database: "railway",
        });

        const [result] = await conn.execute(
            "INSERT INTO alunos (pontuacao, streak, nome, email, senha) VALUES (?, ?, ?, ?, ?)",
            [0, 0, nome, email, senha]
        );

        await conn.end();

        const token = jwt.sign({
                id: result.insertId,
                nome,
                email
            }, // payload
            SECRET, // chave secreta (colocar no .env)
            {
                expiresIn: "7d"
            } // validade
        );

        //if (!emailValido) {
        res.json({
            success: true,
            message: "Cadastro realizado!",
            id: result.insertId,
            token,
            nome,
            email,
            pontuacao: '0',
            streak: '0',
        });

        return true;
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Email inválido!",
        });
    }
    //}
});

function validaEmail(email) {

}

app.post("/login", async (req, res) => {
    const {
        email,
        senha
    } = req.body;

    try {
        const conn = await mysql.createConnection({
            host: "trolley.proxy.rlwy.net",
            port: "16798",
            user: "root",
            password: "yYvSsJUUdmehuFwxTMzNGWKFHCHdYlye",
            database: "railway",
        });

        const [rows] = await conn.execute(
            "SELECT * FROM alunos WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Email não encontrado.",
            });
        }

        await conn.end();

        const aluno = rows[0];

        //exemplo com texto normal, substituir por bcrypt se usar hash
        if (aluno.senha !== senha) {
            return res.status(401).json({
                success: false,
                message: "Senha incorreta.",
            });
        }

        res.json({
            success: true,
            message: "Login realizado!",
        });

        nomeUsuario = aluno.nome;
        emailUsuario = aluno.email;
        streakUsuario = aluno.streak;
        pontuacaoUsuario = aluno.pontuacao;

        return true;
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Erro no login.",
        });
    }
});

app.get("/perfil", (req, res) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
        return res.status(401).json({
            error: "Token não fornecido"
        });

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.status(403).json({
            error: "Token inválido"
        });

        // aqui o user é o payload do token
        res.json({
            success: true,
            mensagem: `Bem-vindo, ${user.nome}!`,
            dados: user, // { id, nome, email }
        });
    });
});

app.listen(8081, "0.0.0.0", () => {
    console.log("Servidor backend rodando em http://192.168.100.16:8081");
});