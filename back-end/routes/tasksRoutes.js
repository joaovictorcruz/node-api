const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");
const { autenticarToken } = require("../controllers/authController"); // Importa autenticarToken

// Rotas para tarefas
router.get("/buscar/:planoId", autenticarToken, tasksController.buscarTarefas);
router.post("/adicionar", autenticarToken, tasksController.criarTarefa);
router.put("/editar", autenticarToken, tasksController.editarTarefa); // Atualizando para usar req.body
router.delete("/deletar", autenticarToken, tasksController.excluirTarefa);




module.exports = router;
