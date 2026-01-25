import { Routes, Route, Navigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import { ProductList } from '../features/products/components/ProductList';
import { About } from '../pages/About';
import { Promotions } from '../pages/Promotions';
import { Contacts } from '../pages/Contacts';
import Vacancies from '../pages/Vacancies';
import { CartPage } from '../pages/CartPage';
import { Checkout } from '../pages/Checkout';
import { AuthForm } from '../features/auth/components/AuthForm';
import { Profile } from '../pages/Profile';
import { AdminOrders } from '../pages/AdminOrders';
import { AdminAddProduct } from '../pages/AdminAddProduct';
import { AdminVacancies } from '../pages/AdminVacancies';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/menu" element={<ProductList />} />
            <Route path="/about" element={<About />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/vacancies" element={<Vacancies />} />

            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<AuthForm />} />
            <Route path='/admin/add-product' element={<AdminAddProduct/>} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/vacancies" element={<AdminVacancies />} />

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};