const express = require("express");
const cors = require("cors");
const path = require("path"); // Importar path para manipulação de caminhos
const rotas = express();
const { Usuario } = require("./back-end/db"); // Corrigir caminho da importação
const tasksRoutes = require("./back-end/routes/tasksRoutes");


// Importar as rotas
const authRoutes = require("./back-end/routes/authRoutes");
const planosRoutes = require("./back-end/routes/planosRoutes");

// Configuração de middlewares
rotas.use(cors());
rotas.use(express.json()); // Para parsear JSON

// Registrar rotas
rotas.use("/api/auth", authRoutes);
rotas.use("/api/planos", planosRoutes);
rotas.use("/api/tasks", tasksRoutes);

// Servir arquivos estáticos da pasta front-endAppEstudo
rotas.use(express.static(path.join(__dirname, '..', 'front-endAppEstudo'))); // Ajuste para acessar corretamente o front-end

// Rota principal
rotas.get("/", (req, res) => {
    res.send("API de Planejamento de Estudo");
});

// Rota para exibir usuários (exemplo)
rotas.get("/exibir", async function (req, res) {
    try {
        const usuarios = await Usuario.findAll(); // Busca todos os registros
        res.json(usuarios); // Retorna os registros em formato JSON
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar usuarios: ${error}` });
    }
});

// Rota para servir o arquivo tasks.html (front-end)
rotas.get("/templates/tasks.html", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'front-endAppEstudo', 'templates', 'tasks.html')); // Ajuste para o caminho correto
});

// Iniciando o servidor
rotas.listen(1910, () => {
    console.log("Server is running on port 1910");
});

