const express = require("express");
const router = express.Router();
const { exibirPlanos, adicionarPlano, editarPlano, deletarPlano } = require("../controllers/planosController");
const jwt = require("jsonwebtoken");

// Middleware para autenticação
const autenticarToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ erro: "Acesso negado." });

    try {
        const decoded = jwt.verify(token, "admin123");
        req.usuarioId = decoded.id;
        next();
    } catch (err) {
        res.status(403).json({ erro: "Token inválido." });
    }
};

// Rotas de planos
router.get("/buscarplanos", autenticarToken, exibirPlanos);       // Buscar todos os planos
router.post("/novoplano", autenticarToken, adicionarPlano);      // Criar um novo plano
router.put("/editarplano", autenticarToken, editarPlano);        // Editar um plano
router.delete("/excluirplano", autenticarToken, deletarPlano);   // Excluir um plano

module.exports = router;
