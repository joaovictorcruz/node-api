const express = require("express")//para usar o express
const server = express()// para criar um servidor
const copadobrasil = require("./src/times.json")
const materias = require("./src/materias.json")
server.get("/", (req, res) =>{
    return res.json({mensagem:"salve"})
})

server.get("/materias", (req, res) =>{
    return res.json(materias)
})

server.get("/login/:email/:senha", (req, res) => {
    return res.json(req.params);
})

server.listen(1910, () => {
    console.log("funcionando")
})