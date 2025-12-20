import * as SecureStore from 'expo-secure-store';

const secureStorage = {
  // Guardar Token
  saveToken: async (token:string) => {
    try {
      await SecureStore.setItemAsync('user_session_token', token);
    } catch (e) {
      console.error("Error de almacenamiento seguro", e);
    }
  },

  // Recuperar Token
  getToken: async () => {
    try {
      return await SecureStore.getItemAsync('user_session_token');
    } catch (e) {
      console.error("Error obteniendo token seguro", e);
    }
  },

  // Eliminar (Logout)
  deleteToken: async () => {
    await SecureStore.deleteItemAsync('user_session_token');
  }
};
export default secureStorage;