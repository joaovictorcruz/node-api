const { Usuario, PlanoEstudo, Tarefa } = require("../db"); // Importando os modelos

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
    const { planoId, plano_titulo, metas, DataInicio, DataFim } = req.body; // Recebe os dados do plano a ser editado

    try {
        const usuarioId = req.usuarioId;

        if (!usuarioId) {
            return res.status(400).json({ message: "Usuário não autenticado." });
        }

        const plano = await PlanoEstudo.findOne({ where: { id: planoId, usuario_id: usuarioId } });
        if (!plano) {
            return res.status(404).json({ message: "Plano não encontrado." });
        }

        // Atualiza o plano com os novos dados
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

        // Verifica se o plano existe
        const plano = await PlanoEstudo.findOne({ where: { id: planoId, usuario_id: usuarioId } });
        if (!plano) {
            return res.status(404).json({ message: "Plano não encontrado." });
        }

        // Exclui as tarefas associadas ao plano
        await Tarefa.destroy({ where: { planoestudo_id: planoId } });

        // Exclui o plano
        await PlanoEstudo.destroy({ where: { id: planoId } });

        // Responde ao cliente após as exclusões
        res.json({ message: "Plano e suas tarefas deletadas com sucesso!" });
    } catch (error) {
        console.error("Erro ao deletar plano:", error.message);
        res.status(500).json({ message: "Erro interno ao deletar plano." });
    }
};

// Função para buscar um plano por ID no back-end
const exibirPlanoPorId = async (req, res) => {
    const { planoId } = req.params; // Obtém o ID do plano da URL

    try {
        const plano = await PlanoEstudo.findByPk(planoId);
        
        if (!plano) {
            return res.status(404).json({ message: "Plano não encontrado." });
        }

        res.json(plano); // Retorna o plano encontrado
    } catch (error) {
        console.error("Erro ao buscar plano:", error.message);
        res.status(500).json({ message: "Erro interno ao buscar plano." });
    }
};


module.exports = { exibirPlanos, adicionarPlano, editarPlano, deletarPlano, exibirPlanoPorId };

