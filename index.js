const express = require("express");
const rotas = express(); 
const banco = require("./db.js")

//Manipulação do BD
const Usuario = banco.Usuario;

const cors = require("cors"); // Importa o CORS
// Habilita o CORS
rotas.use(cors());


rotas.get("/", function(req, res){
    res.send("Rota Principal");
});

rotas.get("/cadastro/:nome/:email/:senha", async function(req, res){
    const {nome,email,senha} = req.params; //Guarda os parametros em variaveis

    const novoUsuario = await Usuario.create({nome,email,senha});// insert
    
    res.json({
        resposta: "Usuário cadastrado com sucesso", 
        usuario: novoUsuario
    })
});
rotas.get("/exibir", async function (req, res) {
    const usuarios = await Usuario.findAll(); // Busca todos os registros
    res.json(usuarios); // Retorna os registros em formato JSON
  });


rotas.listen(1910, function () {
    console.log("Server is running on port 1910");
  });