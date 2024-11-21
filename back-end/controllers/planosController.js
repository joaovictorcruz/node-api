const { Usuario, PlanoEstudo } = require("../db"); // Importando os modelos

// Função para listar os planos do usuário autenticado
const exibirPlanos = async (req, res) => {
    try {
        const usuarioId = req.usuarioId;

        if (!usuarioId) {
            return res.status(400).json({ message: "Usuário não autenticado ou inválido." });
        }

        // Busca todos os planos do usuário autenticado
        const planos = await PlanoEstudo.findAll({ where: { usuario_id: usuarioId } });

        if (!planos.length) {
            return res.status(404).json({ message: "Nenhum plano encontrado." });
        }

        res.json(planos);
    } catch (error) {
        console.error("Erro ao buscar planos:", error.message);
        res.status(500).json({ message: "Erro interno ao buscar planos." });
    }
};

// Função para adicionar um novo plano ao usuário autenticado
const adicionarPlano = async (req, res) => {
    const { plano_titulo, metas, DataInicio, DataFim } = req.body;

    try {
        const usuarioId = req.usuarioId;

        // Verifica se o usuário existe
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            return res.status(400).json({ erro: "Usuário não encontrado" });
        }

        const novoPlano = await PlanoEstudo.create({
            plano_titulo,
            metas,
            DataInicio,
            DataFim,
            usuario_id: usuarioId,
        });

        res.status(201).json({ mensagem: "Plano adicionado com sucesso!", plano: novoPlano });
    } catch (error) {
        console.error("Erro ao adicionar plano:", error.message);
        res.status(500).json({ erro: "Erro ao adicionar plano." });
    }
};

// Função para editar um plano
const editarPlano = async (req, res) => {
    const { planoId, plano_titulo, metas, DataInicio, DataFim } = req.body;

    try {
        const usuarioId = req.usuarioId;

        if (!usuarioId) {
            return res.status(400).json({ message: "Usuário não autenticado." });
        }

        const plano = await PlanoEstudo.findOne({ where: { id: planoId, usuario_id: usuarioId } });
        if (!plano) {
            return res.status(404).json({ message: "Plano não encontrado." });
        }

        await PlanoEstudo.update(
            { plano_titulo, metas, DataInicio, DataFim },
            { where: { id: planoId } }
        );

        res.json({ message: "Plano atualizado com sucesso!" });
    } catch (error) {
        console.error("Erro ao atualizar plano:", error.message);
        res.status(500).json({ message: "Erro interno ao atualizar plano." });
    }
};

// Função para deletar um plano
const deletarPlano = async (req, res) => {
    const { planoId } = req.body;

    try {
        const usuarioId = req.usuarioId;

        if (!usuarioId) {
            return res.status(400).json({ message: "Usuário não autenticado." });
        }

        const plano = await PlanoEstudo.findOne({ where: { id: planoId, usuario_id: usuarioId } });
        if (!plano) {
            return res.status(404).json({ message: "Plano não encontrado." });
        }

        await PlanoEstudo.destroy({ where: { id: planoId } });

        res.json({ message: "Plano deletado com sucesso!" });
    } catch (error) {
        console.error("Erro ao deletar plano:", error.message);
        res.status(500).json({ message: "Erro interno ao deletar plano." });
    }
};

module.exports = { exibirPlanos, adicionarPlano, editarPlano, deletarPlano };

