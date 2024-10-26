const express = require("express");
const rotas = express();

const Sequelize = require("sequelize"); 

const con = new Sequelize("DiarioBordo", "root", "",{
    host: "localhost",
    dialect: "mysql",
});


const Usuario = conexaoBanco.define("usuarios",{
    nome:{
        type: Sequelize.STRING,
    },
    email:{
        type: Sequelize.STRING,
    },
    senha:{
        type: Sequelize.STRING,
    }
})

const PlanoEstudo = conexaoBanco.define("planoestudo",{
    plano_titulo: {
        type: Sequelize.STRING,
    },
    metas: {
        type: Sequelize.STRING,
    },
    DataInicio: {
        type: Sequelize.DATE,
    },
    DataFim: {
        type: Sequelize.DATE,
    }
})


const Tarefa = conexaoBanco.define("tarefa",{
    tarefa_titulo: {
        type: Sequelize.STRING,
    },
    desc_conteudo: {
        type: Sequelize.STRING,
    },
    data_vencimento:{
        type: Sequelize.DATE,
    },
    horario: {
        type: Sequelize.TIME,
    },
    status: {
        type: Sequelize.STRING,
    },
    data_conclusao: {
        type: Sequelize.DATE,
    }
})

const Relatorio = conexaoBanco.define("relatorio", {
  data_relatorio: {
    type: Sequelize.DATE,
    tempo_gasto: Sequelize.INTEGER,
  }
})

/*
Usuario.sync({ force: true});
PlanoEstudo.sync({ force: true});
Tarefa.sync({ force: true});
Relatorio.sync({ force: true});
*/

con.authenticate().then(function(){
    console.log("conexão realizada com sucesso");

}).catch(function(err){
    console.log("Erro ao conectar com o banco de dados" + err);
})



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