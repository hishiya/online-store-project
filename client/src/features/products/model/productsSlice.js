import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductsRequest } from '../api/productsApi';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchProductsRequest();
            return data;
        } catch (error) {
            return rejesctWithValue(error.response?.data?.message || 'Не вдалося завантажити товари');
    }
 });

const initialState = {
    items: [],
    isLoading: false,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default productsSlice.reducer;
