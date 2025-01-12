import React from 'react'
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',  // Reemplaza con tu URL base
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'application/json',
    },
});

  export const getData = async (endpoint) => {
    try {
      const response = await api.get(endpoint);
      return response.data;  // Retorna los datos obtenidos
    } catch (error) {
      console.error('Error obteniendo datos tipo votaciones:', error);
      throw error;  
    }
  };
  
  // Función para crear datos
  export const createData = async (endpoint, data,method) => {
    try {
      let response;
      if (method === 'POST'){
        response = await api.post(endpoint, data);
      }else if(method === 'PUT'){
        response = await api.put(endpoint, data);
      }
      return response.data;  // Retorna los datos creados
    } catch (error) {
      console.error('Error datos tipo votaciones:', error);
      throw error;
    }
  };

  export const deleteData = async (endpoint) => {
    try {
        const response = await api.delete(endpoint);
        return response.data; // Si el servidor devuelve un mensaje de confirmación
    } catch (error) {
        console.error('Error eliminando el registro:', error);
        throw error; // Lanza el error para manejarlo donde se llame el servicio
    }
};
