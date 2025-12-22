import { Platform } from "react-native";
const host = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

export const API_URL = `http://${host}:8090/api/`;
