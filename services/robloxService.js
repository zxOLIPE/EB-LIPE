const axios = require("axios");

const GROUP_ID = 966849028;

async function getGroupInfo(userId) {

    try {

        const { data } = await axios.get(
            `https://groups.roblox.com/v2/users/${userId}/groups/roles`
        );

        console.log("======================================");
        console.log("GRUPOS DO USUÁRIO");
        console.log("======================================");

        for (const g of data.data) {

            console.log(
                `${g.group.id} | ${g.group.name} | ${g.role.name}`
            );

        }

        console.log("======================================");

        const grupo = data.data.find(
            g => Number(g.group.id) === GROUP_ID
        );

        if (!grupo) {

            console.log("GRUPO EB LIPE NÃO ENCONTRADO");

            return {
                grupo: null,
                patente: "Civil",
                rank: 0,
                status: "Fora do grupo"
            };

        }

        console.log("======================================");
        console.log("GRUPO ENCONTRADO");
        console.log(`ID: ${grupo.group.id}`);
        console.log(`Nome: ${grupo.group.name}`);
        console.log(`Patente: ${grupo.role.name}`);
        console.log(`Rank: ${grupo.role.rank}`);
        console.log("======================================");

        return {
            grupo: grupo.group.name,
            patente: grupo.role.name,
            rank: grupo.role.rank,
            status: "Ativo"
        };

    } catch (err) {

        console.log("========== ERRO ==========");

        console.log(err.response?.status);
        console.log(err.response?.data || err.message);

        console.log("==========================");

        return {
            grupo: null,
            patente: "Erro",
            rank: 0,
            status: "Erro"
        };

    }

}

module.exports = {
    getGroupInfo
};