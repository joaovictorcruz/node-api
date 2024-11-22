const { Tarefa, PlanoEstudo } = require("../db");

// Buscar tarefas de um plano específico
const buscarTarefas = async (req, res) => {
    const { planoId } = req.params;

    try {
        const tarefas = await Tarefa.findAll({ where: { planoestudo_id: planoId } });

        if (!tarefas.length) {
            return res.status(404).json({ message: "Nenhuma tarefa encontrada para este plano." });
        }

        res.status(200).json(tarefas);
    } catch (error) {
        console.error("Erro ao buscar tarefas:", error.message);
        res.status(500).json({ message: "Erro ao buscar tarefas." });
    }
};

// Criar uma nova tarefa
const criarTarefa = async (req, res) => {
    const { planoId, tarefa_titulo, desc_conteudo, data_vencimento, status } = req.body;

    try {
        // Verifica se o plano existe
        const plano = await PlanoEstudo.findByPk(planoId);
        if (!plano) {
            return res.status(404).json({ message: "Plano de estudo não encontrado." });
        }

        // Cria a tarefa associada ao plano
        const novaTarefa = await Tarefa.create({
            tarefa_titulo,
            desc_conteudo,
            data_vencimento,
            status: status || "Pendente", // Define um status padrão
            planoestudo_id: planoId,     // Relaciona com o plano
        });

        // Retorna a tarefa criada
        res.status(201).json(novaTarefa);
    } catch (error) {
        console.error("Erro ao criar tarefa:", error.message);
        res.status(500).json({ message: "Erro ao criar tarefa." });
    }
};

// Editar uma tarefa usando req.body
const editarTarefa = async (req, res) => {
    const { tarefaId, tarefa_titulo, desc_conteudo, data_vencimento, status } = req.body;

    try {
        const tarefa = await Tarefa.findByPk(tarefaId);

        if (!tarefa) {
            return res.status(404).json({ message: "Tarefa não encontrada." });
        }

        await tarefa.update({
            tarefa_titulo,
            desc_conteudo,
            data_vencimento,
            status,
        });

        res.status(200).json({ message: "Tarefa atualizada com sucesso!", tarefa });
    } catch (error) {
        console.error("Erro ao editar tarefa:", error.message);
        res.status(500).json({ message: "Erro ao editar tarefa." });
    }
};

// Excluir uma tarefa
const excluirTarefa = async (req, res) => {
    const { tarefaId } = req.body; // Obter o ID da tarefa do corpo da requisição

    try {
        const tarefa = await Tarefa.findByPk(tarefaId);

        if (!tarefa) {
            return res.status(404).json({ message: "Tarefa não encontrada." });
        }

        await tarefa.destroy(); // Exclui a tarefa

        res.status(200).json({ message: "Tarefa excluída com sucesso!" });
    } catch (error) {
        console.error("Erro ao excluir tarefa:", error.message);
        res.status(500).json({ message: "Erro ao excluir tarefa." });
    }
};
;



module.exports = { buscarTarefas, criarTarefa, editarTarefa, excluirTarefa };
