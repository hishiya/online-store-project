import { api } from '../../../services/api/baseApi';

export const fetchProductsRequest = async () => {
    const response = await api.get('/products');
    return response.data;
};