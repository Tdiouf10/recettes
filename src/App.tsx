import React from 'react';
import './App.css';
import AuthProvider from "./provider/AuthProvider";
import { Route, Routes } from 'react-router-dom'
import Register from "./components/Register";
import Login from "./components/Login";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Recettes from "./pages/Recettes";
import ProtectedRoute from "./routes/ProtectedRoute";
const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/recettes" element={
                        <ProtectedRoute>
                            <Recettes />
                        </ProtectedRoute>
                    } />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </AuthProvider>
    )
}

export default App;
