// index.js
const express = require("express");
const cors = require("cors");
const rotas = express();
const { Usuario } = require("./db")
// Importar as rotas
const authRoutes = require("./routes/authRoutes");

rotas.use(cors());
rotas.use(express.json()); // Para parsear JSON

// Definindo a rota principal
rotas.get("/", (req, res) => {
    res.send("API de Planejamento de Estudo");
});

// Usando as rotas
rotas.use("/api/auth", authRoutes);

rotas.get("/exibir", async function (req, res) {
    try{
    const usuarios = await Usuario.findAll(); // Busca todos os registros
    res.json(usuarios); // Retorna os registros em formato JSON
    }catch(error){
        res.status(500).json({ message: `Erro ao buscar usuarios: ${error}` });
    }
  });

// Iniciando o servidor
rotas.listen(1910, () => {
    console.log("Server is running on port 1910");
});