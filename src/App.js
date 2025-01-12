import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import React from 'react'
import AdministradorDashboard from './pages/AdministradorDashboard';
import Login from "./pages/Login";
import TipoVotaciones from "./components/administrador/TipoVotaciones";
import Planchas from "./components/administrador/Planchas";
import Votantes from "./components/administrador/Votantes";
import Usuarios from "./components/administrador/Usuarios";
import { Link } from "react-router-dom";
import Graficas from "./components/administrador/Graficas";
function App() {

  return (
    <BrowserRouter>  
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard-administrador/tipo-votaciones" element={<AdministradorDashboard componentePintar={<TipoVotaciones />} />} />
            <Route path="/dashboard-administrador/graficas" element={<AdministradorDashboard componentePintar={<Graficas />} />} />
            <Route path="/dashboard-administrador/planchas" element={<AdministradorDashboard componentePintar={<Planchas />} />} />
            <Route path="/dashboard-administrador/votantes" element={<AdministradorDashboard componentePintar={<Votantes />} />} />
            <Route path="/dashboard-administrador/usuarios" element={<AdministradorDashboard componentePintar={<Usuarios />} />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
