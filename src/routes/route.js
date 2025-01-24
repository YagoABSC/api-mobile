const connection = require('../database/connect');
const express = require('express');
const router  = express.Router();
const TaskController = require('../controllers/TaskController')
const UserController = require('../controllers/UserController')

// Rotas de usuários
router.post('/usuario/criar', UserController.cadastrarUsuario)
router.get('/users', (req, res) => {
    res.send('Lista de usuários');
})

// Rotas de tarefas
router.post('/novaTarefa', TaskController.novaTarefa)
router.get('/tarefas', TaskController.listarTarefas)
router.get('/tarefa/:id', TaskController.listarUmaTarefa)
router.put('/tarefa/atualizar/:id', TaskController.atualizarTarefa)
router.delete('/tarefa/excluir/:id', TaskController.removerTarefa)

module.exports = router;
