const Sequelize = require("sequelize");

const conexaoBanco = new Sequelize("PlanejamentoEstudo", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false, // Desabilita logs do SQL no console
});

const Usuario = conexaoBanco.define("usuarios", {
    nome: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,  // Garantir que o e-mail seja único
    },
    senha: {
        type: Sequelize.STRING,
    },
    dataNasc: {
        type: Sequelize.DATE,
    }
});

const PlanoEstudo = conexaoBanco.define("planoestudo", {
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
});

const Tarefa = conexaoBanco.define("tarefa", {
    tarefa_titulo: {
        type: Sequelize.STRING,
    },
    desc_conteudo: {
        type: Sequelize.STRING,
    },
    data_vencimento: {
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
});

const Relatorio = conexaoBanco.define("relatorio", {
    data_relatorio: {
        type: Sequelize.DATE,
    },
    tempo_gasto: {
        type: Sequelize.INTEGER,
    }
});

// Sincronizando os modelos com o banco de dados
const syncDatabase = async () => {
    try {
        await Usuario.sync({ alter: true });
        await PlanoEstudo.sync({ alter: true });
        await Tarefa.sync({ alter: true });
        await Relatorio.sync({ alter: true });
        console.log("Tabelas sincronizadas com sucesso");
    } catch (err) {
        console.error("Erro ao sincronizar as tabelas:", err);
    }
};


syncDatabase();

module.exports = {
    Usuario,
    PlanoEstudo,
    Tarefa,
    Relatorio,
    conexaoBanco,
};
