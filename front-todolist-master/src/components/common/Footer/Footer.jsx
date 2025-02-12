import { Component } from "react";

export default class Footer extends Component{

    render(){
        return(
            <footer className="footer-page">
                <div className="container">
                    <div className="row">
                        <div className="footer-page-copy text-center py-2">
                            To Do List &copy; Todos os direitos reservados.
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}