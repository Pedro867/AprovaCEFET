//services/auth.js
import AsyncStorage from '@react-native-async-storage/async-storage';

//salvar token
export const saveToken = async (token) => {
    await AsyncStorage.setItem('userToken', token);
};

//buscar token
export const getToken = async () => {
    return await AsyncStorage.getItem('userToken');
};

//remover token
export const removeToken = async () => {
    await AsyncStorage.removeItem('userToken');
};