import AsyncStorage from '@react-native-async-storage/async-storage';

const asyncStorage = {
  // Guardar un objeto o valor
  saveSettings: async (item:string, settings:any) => {
    try {
      const jsonValue = JSON.stringify(settings);
      await AsyncStorage.setItem(item, jsonValue);
    } catch (e) {
      console.error("Error guardando settings", e);
    }
  },

  // Recuperar un objeto
  getSettings: async (item:string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(item);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error("Error leyendo settings", e);
    }
  }
};
export default asyncStorage;