const Sequelize = require("sequelize")

const  conexaoBanco = new Sequelize("PlanejamentoEstudo", "root", "", {
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

