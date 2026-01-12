import { Routes, Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux'; // Це тут вже не обов'язково

import { ProductList } from '../features/products/components/ProductList';
import { CartPage } from '../pages/CartPage';
import { Checkout } from '../pages/Checkout';
import { AuthForm } from '../features/auth/components/AuthForm';
import { Profile } from '../pages/Profile';
import { AdminOrders } from '../pages/AdminOrders';
import { AdminAddProduct } from '../pages/AdminAddProduct';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<AuthForm />} />
            <Route path='/admin/add-product' element={<AdminAddProduct/>} />
            <Route path="/admin/orders" element={<AdminOrders />} />

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};