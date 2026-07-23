const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const path = require("path");

require("./database");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ===============================
// SESSÃO
// ===============================

app.use(
    session({
        secret: process.env.SESSION_SECRET || "eb-lipe-secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);

// ===============================
// FRONTEND
// ===============================

app.use(express.static(path.join(__dirname, "client")));

// ===============================
// ROTAS
// ===============================

const authRoutes = require("./routes/authRoutes");
const militaresRoutes = require("./routes/militaresRoutes");

app.use("/auth", authRoutes);
app.use("/api/militares", militaresRoutes);

// ===============================
// PÁGINA INICIAL
// ===============================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "index.html"));
});

// ===============================
// PAINEL
// ===============================

app.get("/painel", (req, res) => {

    if (!req.session.user) {
        return res.redirect("/");
    }

    res.sendFile(path.join(__dirname, "client", "pages", "painel.html"));

});

// ===============================
// API DO USUÁRIO LOGADO
// ===============================

app.get("/api/me", (req, res) => {

    if (!req.session.user) {
        return res.status(401).json({
            error: "Não autenticado"
        });
    }

    res.json(req.session.user);

});

// ===============================
// PORTA
// ===============================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`EB LIPE SERVER ONLINE - Porta ${PORT}`);
});