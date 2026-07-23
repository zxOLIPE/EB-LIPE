const axios = require("axios");
const db = require("../database");
const robloxService = require("../services/robloxService");

// LOGIN ROBLOX
exports.login = (req, res) => {

    const url =
        `https://authorize.roblox.com/?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&scope=openid+profile`;

    res.redirect(url);

};

// CALLBACK
exports.callback = async (req, res) => {

    const code = req.query.code;

    if (!code) {
        return res.send("Código não encontrado.");
    }

    try {

        // ===============================
        // TOKEN
        // ===============================

        const token = await axios.post(
            "https://apis.roblox.com/oauth/v1/token",

            new URLSearchParams({
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                grant_type: "authorization_code",
                code: code,
                redirect_uri: process.env.REDIRECT_URI
            }),

            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        );

        const accessToken = token.data.access_token;

        // ===============================
        // USUÁRIO
        // ===============================

        const user = await axios.get(
            "https://apis.roblox.com/oauth/v1/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        // ===============================
        // BUSCA PATENTE NO GRUPO
        // ===============================

        const grupo = await robloxService.getGroupInfo(user.data.sub);

        // ===============================
        // SALVA / ATUALIZA BANCO
        // ===============================

        db.run(
            `
            INSERT INTO militares
            (
                roblox_id,
                nome,
                patente,
                rank,
                grupo,
                status
            )
            VALUES (?,?,?,?,?,?)
            ON CONFLICT(roblox_id)
            DO UPDATE SET
                nome=excluded.nome,
                patente=excluded.patente,
                rank=excluded.rank,
                grupo=excluded.grupo,
                status=excluded.status,
                atualizado_em=CURRENT_TIMESTAMP
            `,
            [
                user.data.sub,
                user.data.preferred_username,
                grupo.patente,
                grupo.rank,
                966849028,
                grupo.status
            ]
        );

        // ===============================
        // SESSÃO
        // ===============================

        req.session.user = {
            id: user.data.sub,
            nome: user.data.preferred_username,
            patente: grupo.patente,
            rank: grupo.rank,
            grupo: grupo.grupo,
            status: grupo.status
        };

        console.log(req.session.user);
        
        res.redirect("/painel");

    } catch (error) {

        console.log(error.response?.data || error);

        res.send("Erro no login Roblox");

    }

};