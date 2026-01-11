import { api } from '../../../services/api/baseApi.js';

export const registerRequest = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
}

export const loginRequest = async (userData) => {
    const response = await api.post('/auth/login', userData);
    return response.data;
}

export const getMeRequest = async () => {
    const response = await api.get('/auth/me');
    return response.data;
}