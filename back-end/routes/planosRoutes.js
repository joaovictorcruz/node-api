const express = require("express");
const router = express.Router();
const { PlanoEstudo } = require("/db")

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

// Rota para buscar planos
router.get("/", autenticarToken, async (req, res) => {
    try {
        const planos = await PlanoEstudo.findAll({ where: { usuario_id: req.usuarioId } });
        res.json(planos);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar planos." });
    }
});

// Rota para criar novo plano
router.post("/", autenticarToken, async (req, res) => {
    const { plano_titulo, metas, DataInicio, DataFim } = req.body;

    try {
        const novoPlano = await PlanoEstudo.create({
            plano_titulo,
            metas,
            DataInicio,
            DataFim,
            usuario_id: req.usuarioId,
        });
        res.status(201).json(novoPlano);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar plano." });
    }
});

module.exports = router;
