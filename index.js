const express = require("express")//para usar o express
const server = express()// para criar um servidor
const materias = require("./src/materias.json")
const tarefas = require("./src/tarefas.json")
server.get("/", (req, res) =>{
    return res.json({mensagem:"salve"})
})

server.get("/materias", (req, res) =>{
    return res.json(materias)
})

server.get("/tarefas", (req, res) =>{
    return res.json(tarefas)
})

server.get("/login/:email/:senha", (req, res) => {
    return res.json(req.params);
})

server.listen(1910, () => {
    console.log("funcionando")
})