// services/api.js
import axios from 'axios';

// Configuración de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para iniciar sesión
export const loginUser  = async (email, password) => {
  try {
    const response = await apiClient.post('/login', { email, password });
    return response.data;
  } catch (error) {
    // Manejo de errores
    if (error.response && error.response.data) {
      throw error.response.data; // Lanza el mensaje de error de la respuesta
    } else {
      throw new Error('Error de red o servidor. Intenta nuevamente.');
    }
  }
};

// Función para registrar un usuario
export const registerUser  = async (name, email, password) => {
  try {
    const response = await apiClient.post('/register', { name, email, password });
    return response.data;
  } catch (error) {
    // Manejo de errores
    if (error.response && error.response.data) {
      throw error.response.data; // Lanza el mensaje de error de la respuesta
    } else {
      throw new Error('Error de red o servidor. Intenta nuevamente.');
    }
  }
};