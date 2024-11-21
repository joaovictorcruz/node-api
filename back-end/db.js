const Sequelize = require("sequelize");

const conexaoBanco = new Sequelize("PlanejamentoEstudo", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false, // Desabilita logs do SQL no console
});

const Usuario = conexaoBanco.define("usuarios", {
    nome: Sequelize.STRING,
    email: Sequelize.STRING,
    senha: Sequelize.STRING,
    dataNasc: Sequelize.DATE,
});

const PlanoEstudo = conexaoBanco.define("planoestudo", {
    plano_titulo: Sequelize.STRING,
    metas: Sequelize.STRING,
});


const Tarefa = conexaoBanco.define("tarefa", {
    tarefa_titulo: Sequelize.STRING,
    desc_conteudo: Sequelize.STRING,
    data_vencimento: Sequelize.DATE,
    status: Sequelize.STRING,
    data_conclusao: Sequelize.DATE,
});


// Relacionamentos
Usuario.hasMany(PlanoEstudo, { foreignKey: 'usuario_id' });
PlanoEstudo.belongsTo(Usuario, { foreignKey: 'usuario_id' });

PlanoEstudo.hasMany(Tarefa, { foreignKey: 'planoestudo_id' });
Tarefa.belongsTo(PlanoEstudo, { foreignKey: 'planoestudo_id' });

// Sincronizando os modelos com o banco de dados
const syncDatabase = async () => {
    try {
        await Usuario.sync({ alter: true });
        await PlanoEstudo.sync({ alter: true });
        await Tarefa.sync({ alter: true });
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
    conexaoBanco,
};
