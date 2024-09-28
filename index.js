const express = require("express")
const server = express()

server.get("/", (req, res) =>{
    return res.json({mensagem:"salve"})
})

server.get("/corinthians", (req, res) => {
    return res.json({mensagem:"maior do brasil"})
})

server.get("/copadobrasil", (req, res) => {
    return res.json({campeão:"corinthians"})
})

server.listen(1910, () => {
    console.log("funcionando")
})