const db = require("../database");

// Busca militar pelo nome
function buscarPorNome(nome) {

    return new Promise((resolve, reject) => {

        db.get(
            `
            SELECT *
            FROM militares
            WHERE nome = ?
            `,
            [nome],
            (err, row) => {

                if (err) {
                    reject(err);
                    return;
                }

                resolve(row);

            }
        );

    });

}

module.exports = {
    buscarPorNome
};