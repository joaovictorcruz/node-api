const { Usuario, PlanoEstudo, Tarefa, Relatorio } = require("../db"); 

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "admin123"; 

// Função para cadastro de usuário
const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha, dataNasc } = req.body;

    try {
        // Verifica se o email já está cadastrado
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ erro: "E-mail já cadastrado" });
        }

        // Criptografar a senha
        const senhaCriptografada = await bcrypt.hash(senha, 10);
       
        // Criar o usuário
        const novoUsuario = await Usuario.create({
            nome,
            email,
            senha: senhaCriptografada,
            dataNasc,
        });

        const token = jwt.sign({ id: novoUsuario.id }, SECRET_KEY, { expiresIn: "1h" });

        res.status(201).json({ mensagem: "Usuário cadastrado com sucesso", token: token, usuario: novoUsuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao cadastrar usuário" });
    }
};

// Função para login
const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Verifica se o usuário existe
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(400).json({ erro: "E-mail ou senha inválidos" });
        }

        // Verifica se a senha está correta
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(400).json({ erro: "E-mail ou senha inválidos" });
        }

        // Gerar um token JWT
        const token = jwt.sign({ id: usuario.id }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ mensagem: "Login realizado com sucesso", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao realizar login" });
    }
};

const autenticarToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ message: "Acesso negado. Token não fornecido." });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.usuarioId = decoded.id;
        next();
    } catch (error) {
        res.status(403).json({ message: "Token inválido ou expirado." });
    }
};    

module.exports = {autenticarToken, cadastrarUsuario, loginUsuario };
