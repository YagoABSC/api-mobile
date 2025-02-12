import { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Index from "../components/layout/Index";

export default class App extends Component{
    render(){
        return(
            <BrowserRouter>
                <Index />
            </BrowserRouter>
        )
    }
}