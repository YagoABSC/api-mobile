const database = require('../database/connect');

class TaskController{

    novaTarefa(request, response){
        const { tarefa, descricao, responsavel} = request.body

        database.insert({ tarefa, descricao, responsavel}).table("tasks").then(data =>{
            console.log(data)
            response.json({message: "Tarefa criada com sucesso!"})
        }).catch(error => {
            console.log(error) 
        })
    }

    listarTarefas(req, res){
        database.select("*").table("tasks").then(tarefas =>{
            res.json(tarefas)
        }).catch(error =>{
            console.log(error)
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
            res.json({message: "Tarefa atualizada"})
        }).catch(error =>{
            console.log(error)
        })
    }

    removerTarefa(req, res){
        const {id} = req.params;

        database.where({id: id}).del().table("tasks").then(data =>{
            res.json({message: "Tarefa deletada com sucesso"});
        }).catch(error =>{
            console.log(error);
        })
    }

}


module.exports = new TaskController()