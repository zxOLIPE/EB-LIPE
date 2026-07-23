const militaryService = require("../services/militaryService");

exports.buscarMilitar = async (req, res) => {

    try {

        const nome = req.params.nome;

        const militar = await militaryService.buscarPorNome(nome);

        if (!militar) {
            return res.status(404).json({
                success: false,
                message: "Militar não encontrado."
            });
        }

        res.json({
            success: true,
            militar
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Erro interno."
        });

    }

};