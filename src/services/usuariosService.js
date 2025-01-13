import api from './auth'

  export const getData = async (endpoint) => {
    try {
      const response = await api.get(endpoint);
      console.log(response);
      
      return response.data;  // Retorna los datos obtenidos
    } catch (error) {
      console.error('Error obteniendo datos usuarios:', error);
      throw error;  
    }
  };

  export const getDataUsuario = async (endpoint) => {
    try {
      const response = await api.get(endpoint);
      console.log(response);
      
      return response.data;  // Retorna los datos obtenidos
    } catch (error) {
      console.error('Error obteniendo datos usuarios:', error);
      throw error;  
    }
  };
  
  // Función para crear datos
  export const createData = async (endpoint, data,method) => {
    try {
        console.log(data);
        
      let response;
      if (method === 'POST'){
        response = await api.post(endpoint, data);
      }else if(method === 'PUT'){
        response = await api.put(endpoint, data);
      }
      return response.data;  // Retorna los datos creados
    } catch (error) {
      console.error('Error datos usuarios:', error);
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
