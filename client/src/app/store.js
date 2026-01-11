import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/model/authSlice.js';
import productsReducer from '../features/products/model/productsSlice.js';
import cartReducer from '../features/cart/model/cartSlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productsReducer,
        cart: cartReducer,
    }
})