// tasksRoutes.js
const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");
const { autenticarToken } = require("../controllers/authController");

// Rotas para tarefas
router.get("/buscar/:planoId", autenticarToken, tasksController.buscarTarefas); // Busca todas as tarefas de um plano
router.get("/buscar/tarefa/:tarefaId", autenticarToken, tasksController.buscarTarefaPorId); // Nova rota para buscar uma tarefa específica
router.post("/adicionar", autenticarToken, tasksController.criarTarefa);
router.put("/editar/:tarefaId", autenticarToken, tasksController.editarTarefa); // Agora a rota inclui :tarefaId
router.delete("/deletar", autenticarToken, tasksController.excluirTarefa); // Excluindo com req.body

module.exports = router;
