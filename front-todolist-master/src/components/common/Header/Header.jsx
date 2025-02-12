import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-white">
                    <div className="container">
                        <Link to="/" className="navbar-brand">
                            To Do List
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                                                
                            </ul>

                            <ul className="navbar-nav d-flex">
                                <li className="nav-item dropdown my-account">
                                    <Link to="" className="nav-link" id="my-account" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="ion-person me-2"></i>
                                        Olá, username
                                    </Link>
                                    <ul className="dropdown-menu" aria-labelledby="my-account">
                                        <li><a className="dropdown-item" href="#">Sair</a></li>
                                    </ul>
                                </li>                               
                            </ul>
                        </div>
                    </div>                
                </nav>
            </header>
        )
    }
}