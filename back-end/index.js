// index.js
const express = require("express");
const cors = require("cors");
const app = express();

// Importar as rotas
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json()); // Para parsear JSON

// Definindo a rota principal
app.get("/", (req, res) => {
    res.send("API de Planejamento de Estudo");
});

// Usando as rotas
app.use("/api/auth", authRoutes);

// Iniciando o servidor
app.listen(1910, () => {
    console.log("Server is running on port 1910");
});
