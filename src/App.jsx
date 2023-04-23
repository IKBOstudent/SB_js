import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Header from "./layouts/Header";

// axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.baseURL = "http://localhost:3030";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
            </Routes>
        </>
    );
}

export default App;
