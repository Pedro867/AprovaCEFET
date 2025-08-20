import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
import session from "express-session";

dotenv.config();

export const nomeUsuario = "";

const app = express();
app.use(cors());
app.use(express.json());

app.use(session({
    secret: "chave-secreta",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));

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

    //if (!emailValido) {
        res.json({
            success: true,
            message: "Cadastro realizado!",
            id: result.insertId,
        });

        req.session.nome = nome;
        req.session.email = email;
        req.session.streak = 0;
        req.session.pontuacao = 0;

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

        req.session.nome = aluno.nome;
        req.session.email = aluno.email;
        req.session.streak = aluno.streak;
        req.session.pontuacao = aluno.pontuacao;

        return true;
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Erro no login.",
        });
    }
});

app.get("/getDados", (req, res) => {
    if (!req.session.nome) {
        return res.status(401).json({
            success: false //NAO TEM LOGIN
        });
    }
    res.json({
        success: true,
        nome: req.session.nome,
        email: req.session.email,
        streak: req.session.streak,
        pontuacao: req.session.pontuacao
    });
});

app.listen(8081, "0.0.0.0", () => {
    console.log("Servidor backend rodando em http://192.168.100.16:8081");
});