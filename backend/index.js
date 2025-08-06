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

    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: "root",
            password: process.env.DB_PASSWORD,
            database: "aprovacefet",
            port: 3306,
        });

        const [result] = await conn.execute(
            "INSERT INTO aluno (nome, email, senha) VALUES (?, ?, ?)",
            [nome, email, senha]
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

app.post("/login", async (req, res) => {
    const {
        email,
        senha
    } = req.body;

    try {
        const conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: "root",
            password: process.env.DB_PASSWORD,
            database: "aprovacefet",
            port: 3306,
        });

        const [rows] = await conn.execute(
            "SELECT * FROM aluno WHERE email = ?",
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
        if (aluno.Senha !== senha) {
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