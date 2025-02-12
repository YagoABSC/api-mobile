import React, { useState } from 'react';
import "./Login.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(username != "" && password != ""){
            await axios.post('http://localhost:4000/usuario/autenticar', {
                "email": username,
                "senha": password
            }).then(response => {
                const dados = response.data;
    
                if (dados.cod == 0) {
                    localStorage.setItem('TODO_TOKEN', dados.token)
                    onLogin()
                    navigate('/')
                } else {
                    setError('Credenciais inválidas');
                }
    
            })
            .catch(error => {
                setError('Credenciais inválidas');
            })
        } else {
            setError('Preencha todos os campos.');
        }
        
    }

    return(
        <>
            <div className="container mt-5 mb-5 py-4">
                <form onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="text-center">Autenticação</h5>
                            </div>
                            <div className="card-body">

                                {error && <div className="alert alert-danger">{error}</div>}
                                
                                <div className="row">
                                    <div className="col-md-12">
                                        <label htmlFor="">Usuário:</label>
                                        <input type="text" name="user" id="user" className="form-control" onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                </div>      
                                <div className="row">
                                    <div className="col-md-12">
                                        <label htmlFor="">Senha:</label>
                                        <input type="password" name="password" id="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>  
                                <div className="row mt-2 mb-2">
                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="btn btn-success">
                                            Autenticar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>      
                    </div>
                </form>
            </div>
        </>
    )
    
}

export default Login