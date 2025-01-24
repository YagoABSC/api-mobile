const database = require('../database/connect');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController{

    async cadastrarUsuario(req, res){
        const {nome, email, senha, situacao} = req.body

        const senhaSegura = await bcrypt.hash(senha, 10)

        database.insert({nome, email, senha: senhaSegura, situacao}).table("users").then(data => {
            res.json({message: "Cadastro efetuado com sucesso!"})
        }).catch(error =>{
            console.log(error)
        })
    }

    autenticarUsuario(req, res){
        const {email, senha} = req.body;

        database.select("*").where({email: email}).table("users").then(async usuario => {

            if(!usuario)
                res.status(401).json({message: "Autenticação falhou! "})
            
            const validarSenha = await bcrypt.compare(senha, usuario[0].senha)
            if(!senha)
                res.status(401).json({message: "Autenticação falhou! "})

            const token = jwt.sign({id: usuario[0].id}, 'Titos@2025!', {
                expiresIn: '1h'
            })

            res.status(200).json({token})

            console.log(usuario)

        }).catch(error => {
            console.log(error)
        })

    }

}

module.exports = new UserController()