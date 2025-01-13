import axios from 'axios';
import api from './auth'

export const login = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:8000/api/login/', {
      username,
      password,
    });

    // Guardar el token en localStorage
    localStorage.setItem('authToken', response.data.token);

    console.log('Token guardado con éxito:', response.data.token);
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
};

export const logout = async () => {
    const token = localStorage.getItem('authToken');  // Obtener el token del localStorage
    if (!token) {
      console.log('No se encontró un token válido');
      return;
    }
    try {
        const response = await api.post('http://localhost:8000/api/logout/');
        localStorage.removeItem('authToken');
        console.log('Token eliminado exitosamente:', response.data.message);
        window.location.href = '/';
    } catch (error) {
      console.error('No fue posible eliminar el token:', error);
      alert('No fue posible cerrar sesión.');
    }
  };
