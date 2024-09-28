const express = require("express")//para usar o express
const server = express()// para criar um servidor
const copadobrasil = require("./src/times.json")

server.get("/", (req, res) =>{
    return res.json({mensagem:"salve"})
})

server.get("/corinthians", (req, res) => {
    return res.json({mensagem:"maior do brasil"})
})

server.get("/copadobrasil", (req, res) => {
    return res.json(copadobrasil)
})

server.listen(1910, () => {
    console.log("funcionando")
})