const axios = require("axios");
const db = require("../database");

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

        const user = await axios.get(
            "https://apis.roblox.com/oauth/v1/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        // Salva no banco
        db.run(
            `
            INSERT OR IGNORE INTO militares
            (roblox_id, nome)
            VALUES (?,?)
            `,
            [
                user.data.sub,
                user.data.preferred_username
            ]
        );

        // ===============================
        // SALVA A SESSÃO
        // ===============================

        req.session.user = {
            id: user.data.sub,
            nome: user.data.preferred_username
        };

        // Vai para o painel
        res.redirect("/painel");

    } catch (error) {

        console.log(error.response?.data || error);

        res.send("Erro no login Roblox");

    }

};  