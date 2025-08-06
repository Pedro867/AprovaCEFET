import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

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

    try {
        const conn = await mysql.createConnection({
            host: "trolley.proxy.rlwy.net",
            port: "16798",
            user: "root",
            password: "yYvSsJUUdmehuFwxTMzNGWKFHCHdYlye",
            database: "railway",
        });

        const id = gerarIdNumerico(email);
        const [result] = await conn.execute(
            "INSERT INTO alunos (id, nome, email, senha) VALUES (?, ?, ?, ?)",
            [Number(id), nome, email, senha]
        );

        await conn.end();

        res.json({
            success: true,
            message: "Cadastro realizado!",
            id: result.insertId,
        });

        return true;
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Erro ao cadastrar.",
        });
    }
});

async function gerarIdNumerico(email) {
    const encoder = new TextEncoder();
    const data = encoder.encode(email);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16);

    const asciiNumerico = hashHex
        .split('')
        .map(char => char.charCodeAt(0))
        .join('');

    const numeroSeguro = Number(asciiNumerico.slice(0, 15));

    return numeroSeguro;
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
        return true;
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Erro no login.",
        });
    }
});

app.listen(8081, "0.0.0.0", () => {
    console.log("Servidor backend rodando em http://192.168.100.16:8081");
});