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
            console.log(error)
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

            res.status(200).json({ token })

            console.log(usuario)

        }).catch(error => {
            console.log(error)
        })

    }

    listarUsuarios(req, res) {
        database.select("*").table("users").then(usuarios => {
            res.json(usuarios);
        }).catch(error => {
            console.log(error);
        })
    }

    listarUmUsuario(req, res) {
        const { id } = req.params

        database.where({ id }).select('*').table('users').then(usuario => {
            res.status(200).json({ usuario })
        }).catch(error => {
            console.log(error)
        })
    }

    atualizarUsuario(req, res) {
        const { id } = req.params
        const { nome, email } = req.body

        database.where({ id: id }).update({ nome: nome, email: email }).table('users').then(usuario => {
            res.status(200).json({ message: "Usuário atualizado com sucesso!" })
        }).catch(error => {
            console.log(error)
        })
    }

    removerUsuario(req, res) {
        const { id } = req.params

        database.where({ id: id }).del().table('users').then(usuario => {
            res.status(200).json({ message: "Usuário deletado com sucesso!" })
        }).catch(error => {
            console.log(error)
        })
    }

    async redefinirSenha(req, res) {
        const { id } = req.params
        const { senha } = req.body

        const senhaSegura = await bcrypt.hash(senha, 10)

        database.where({ id: id }).update({ senha: senhaSegura}).table('users').then(usuario => {
            res.json({message: "Senha atualizada com sucesso!"})
        }).catch(error =>{
            console.log(error)
        })
    }

}

module.exports = new UserController()