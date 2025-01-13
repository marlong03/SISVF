import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import React from 'react'
import AdministradorDashboard from './pages/AdministradorDashboard';
import Login from "./pages/Login";
import TipoVotaciones from "./components/administrador/TipoVotaciones";
import Planchas from "./components/administrador/Planchas";
import Votantes from "./components/administrador/Votantes";
import Usuarios from "./components/administrador/Usuarios";
import Graficas from "./components/administrador/Graficas";
import PrivateRoute from './components/PrivateRoute';
import JuradoDashboard from './pages/JuradoDashboard'
import VotanteDashboard from './pages/VotanteDashboard'
import Votar from "./components/votante/Votar";
import DescargarCertificado from "./components/votante/DescargarCertificado";
import Perfil from "./components/Perfil";
import HistorialVotacion from "./components/votante/HistorialVotacion";
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      
      {/* Rutas protegidas envueltas con PrivateRoute */}
      {/* DASHBOARD-ADMINISTRADOR */}
      <Route 
        path="/dashboard-administrador/" 
        element={<PrivateRoute element={<AdministradorDashboard componentePintar={<Graficas />} />} />} 
      />
      <Route 
        path="/dashboard-administrador/perfil" 
        element={<PrivateRoute element={<AdministradorDashboard componentePintar={<Perfil />} />} />} 
      />
      <Route 
        path="/dashboard-administrador/tipo-votaciones" 
        element={<PrivateRoute element={<AdministradorDashboard componentePintar={<TipoVotaciones />} />} />} 
      />
      <Route 
        path="/dashboard-administrador/graficas" 
        element={<PrivateRoute element={<AdministradorDashboard componentePintar={<Graficas />} />} />} 
      />
      <Route 
        path="/dashboard-administrador/planchas" 
        element={<PrivateRoute element={<AdministradorDashboard componentePintar={<Planchas />} />} />} 
      />
      <Route 
        path="/dashboard-administrador/votantes" 
        element={<PrivateRoute element={<AdministradorDashboard componentePintar={<Votantes />} />} />} 
      />
      <Route 
        path="/dashboard-administrador/usuarios" 
        element={<PrivateRoute element={<AdministradorDashboard componentePintar={<Usuarios />} />} />} 
      />
      {/* ######################################################################################### */}
      {/* DASHBOARD-JURADO */}
      <Route 
        path="/dashboard-jurado/" 
        element={<PrivateRoute element={<JuradoDashboard componentePintar={<Graficas />} />} />} 
      />
       <Route 
        path="/dashboard-jurado/graficas" 
        element={<PrivateRoute element={<JuradoDashboard componentePintar={<Graficas />} />} />} 
      />
      <Route 
        path="/dashboard-jurado/perfil" 
        element={<PrivateRoute element={<JuradoDashboard componentePintar={<Perfil />} />} />} 
      />
      {/* ######################################################################################### */}
      {/* DASHBOARD-VOTANTE */}
      <Route 
        path="/dashboard-votante/" 
        element={<PrivateRoute element={<VotanteDashboard componentePintar={<Perfil />} />} />} 
      />
      <Route 
        path="/dashboard-votante/perfil" 
        element={<PrivateRoute element={<VotanteDashboard componentePintar={<Perfil />} />} />} 
      />
      <Route 
        path="/dashboard-votante/votar" 
        element={<PrivateRoute element={<VotanteDashboard componentePintar={<Votar />} />} />} 
      />
      <Route 
        path="/dashboard-votante/historial" 
        element={<PrivateRoute element={<VotanteDashboard componentePintar={<HistorialVotacion />} />} />} 
      />
      <Route 
        path="/dashboard-votante/descargar-certificado" 
        element={<PrivateRoute element={<VotanteDashboard componentePintar={<DescargarCertificado />} />} />} 
      />
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
