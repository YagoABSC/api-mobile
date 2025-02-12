const database = require('../database/connect');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

class UserController {

    async cadastrarUsuario(req, res) {
        const { nome, email, senha, situacao } = req.body

        const senhaSegura = await bcrypt.hash(senha, 10)

        database.insert({ nome, email, senha: senhaSegura, situacao }).table("users").then(data => {
            res.json({ message: "Cadastro efetuado com sucesso!" })
        }).catch(error => {
            res.status(500).json({message: "Erro ao cadastrar usuário"})
        })
    }

    autenticarUsuario(req, res) {
        const { email, senha } = req.body;

        database.select("*").where({ email: email }).table("users").then(async usuario => {

            if (!usuario[0])
                res.status(401).json({ message: "Autenticação falhou! " })


            const validarSenha = await bcrypt.compare(senha, usuario[0].senha)
            if (!validarSenha)
                res.status(401).json({ message: "Autenticação falhou! " })


            const token = jwt.sign({ id: usuario[0].id }, `${process.env.SALT}`, {
                expiresIn: '1h'
            })

            res.status(200).json({ cod: 0, token })

            console.log(usuario)

        }).catch(error => {
            res.status(500).json({message: "Erro ao tentar autenticar o usuário"})
        })

    }

    listarUsuarios(req, res) {
        database.select("*").table("users").then(usuarios => {
            res.json(usuarios);
        }).catch(error => {
            res.status(500).json({message: "Erro ao obter lista de usuários"})
        })
    }

    listarUmUsuario(req, res) {
        const { id } = req.params

        database.where({ id }).select('*').table('users').then(usuario => {
            res.status(200).json({ usuario })
        }).catch(error => {
            res.status(500).json({message: "Erro ao exibir usuário"})
        })
    }

    atualizarUsuario(req, res) {
        const { id } = req.params
        const { nome, email } = req.body

        database.where({ id: id }).update({ nome: nome, email: email }).table('users').then(usuario => {
            res.status(200).json({ message: "Usuário atualizado com sucesso!" })
        }).catch(error => {
            res.status(500).json({message: "Erro ao atualizar os dados do usuário"})
        })
    }

    removerUsuario(req, res) {
        const { id } = req.params

        database.where({ id: id }).del().table('users').then(usuario => {
            res.status(200).json({ message: "Usuário deletado com sucesso!" })
        }).catch(error => {
            res.status(500).json({message: "Erro ao remover usuário"})
        })
    }

    async redefinirSenha(req, res) {
        const { id } = req.params
        const { senha } = req.body

        const senhaSegura = await bcrypt.hash(senha, 10)

        database.where({ id: id }).update({ senha: senhaSegura}).table('users').then(usuario => {
            res.json({message: "Senha atualizada com sucesso!"})
        }).catch(error =>{
            res.status(500).json({message: "Erro ao redefinir senha"})
        })
    }

}

module.exports = new UserController()