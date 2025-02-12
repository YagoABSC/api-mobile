const database = require('../database/connect');

class TaskController{

    novaTarefa(request, response){
        const { tarefa, descricao, responsavel} = request.body

        database.insert({ tarefa, descricao, responsavel}).table("tasks").then(data =>{
            res.status(201).json({message: "Tarefa criada com sucesso!"})
        }).catch(error => {
            res.status(500).json({message: "Erro ao cadastrar tarefa"})
        })
    }

    listarTarefas(req, res){
        database.select("*").table("tasks").then(tarefas =>{
           res.status(200).json(tarefas)
        }).catch(error =>{
            res.status(500).json({message: "Erro ao obter a lista de tarefas"})
        })
    }

    listarUmaTarefa(req, res){
        const { id } = req.params

        database.select("*").table("tasks").where({id: id}).then(tarefa =>{
            res.json(tarefa)
        }).catch(error =>{
            console.log(error) 
        })
    }

    atualizarTarefa(req, res){
        const {id} = req.params;
        const {descricao} = req.body;

        database.where({id: id}).update({descricao: descricao}).table("tasks").then(data =>{
            res.status(200).json({message: "Tarefa atualizada"})
        }).catch(error =>{
            response.status(500).json({message: "Erro ao atualizar tarefa"})
        })
    }

    removerTarefa(req, res){
        const {id} = req.params;

        database.where({id: id}).del().table("tasks").then(data =>{
            res.json({message: "Tarefa deletada com sucesso"});
        }).catch(error =>{
            res.json(500).json({message: "Erro ao deletar tarefa"})
        })
    }

}


module.exports = new TaskController()