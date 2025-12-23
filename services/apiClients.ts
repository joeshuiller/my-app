import axios from 'axios';
import { API_URL } from './route';
import secureStorage from './secureStoreService';

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(
  async (config) => {
    // Recuperar token guardado de forma segura
    const token = await secureStorage.getToken();
    config.headers.Accept = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Si el token expiró, borrarlo y redirigir al Login
      await secureStorage.deleteToken();
      // Lógica opcional: disparar logout global
    }
    return Promise.reject(error);
  }
);