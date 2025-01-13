// Configuración base de Axios
import axios from 'axios';

// Crear una instancia de Axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // URL base del backend
});

// Interceptor para añadir el token a cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // O `sessionStorage.getItem('authToken')`
    if (token) {
      config.headers.Authorization = `Token ${token}`; // Formato de Token Authentication
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
