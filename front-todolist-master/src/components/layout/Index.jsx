import axios from "axios";
import { Component, Fragment } from "react";
import Footer from "../common/Footer/Footer";
import Header from "../common/Header/Header";
import Main from "../common/Main/Main";
import "./Index.css"

import "bootstrap/dist/js/bootstrap.bundle.min.js"

export default class Index extends Component{

    render(){
        return(
            <Fragment>
                <Header />
                <Main />
                <Footer />
            </Fragment>
        )
    }
}