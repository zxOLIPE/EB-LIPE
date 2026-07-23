const axios = require("axios");

const GROUP_ID = 966849028;

async function getGroupInfo(userId) {

    console.log("================================");
    console.log("BUSCANDO GRUPO DO USUÁRIO:", userId);
    console.log("================================");

    try {

        const { data } = await axios.get(
            `https://groups.roblox.com/v2/users/${userId}/groups/roles`
        );

        console.log(JSON.stringify(data, null, 2));

        const grupo = data.data.find(g => Number(g.group.id) === GROUP_ID);

        if (!grupo) {

            console.log("NÃO ENCONTROU O GRUPO");

            return {
                grupo: null,
                patente: "Civil",
                rank: 0,
                status: "Fora do grupo"
            };

        }

        console.log("PATENTE:", grupo.role.name);

        return {
            grupo: grupo.group.name,
            patente: grupo.role.name,
            rank: grupo.role.rank,
            status: "Ativo"
        };

    } catch (err) {

        console.log("STATUS:", err.response?.status);
        console.log("DATA:", JSON.stringify(err.response?.data, null, 2));
        console.log("ERRO:", err.message);

        throw err;

    }

}

module.exports = {
    getGroupInfo
};