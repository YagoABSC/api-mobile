import axios from "axios";
import React, { useState, useEffect } from "react";

const Dash = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios('http://localhost:4000/tarefas', {
            headers: {
                'Authorization': localStorage.getItem('TODO_TOKEN'),                
                'Content-Type': 'application/json'
            }
        })
        .then(response => setTasks(response.data))
        .catch(error => console.error('Erro ao carregar tarefas:', error));
    }, []);

    return (
        <div className="container">
            <h1>Bem-vindo ao Dash!</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.tarefa}</li>
                ))}
            </ul>
        </div>
    );
}

export default Dash