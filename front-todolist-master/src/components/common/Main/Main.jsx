import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dash from "../../pages/Dash";
import Login from "../../pages/Login";
import axios from "axios";

const Main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    return(
        <main>
            <Routes>
                <Route path="/" element={isLoggedIn ? <Dash /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true) } />} />
            </Routes>
        </main>
    )
}

export default Main