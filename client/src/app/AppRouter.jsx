import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Імпорти твоїх сторінок
import { ProductList } from '../features/products/components/ProductList';
import { CartPage } from '../pages/CartPage';
import { AuthForm } from '../features/auth/components/AuthForm';

export const AppRouter = () => {
    const { isAuth } = useSelector((state) => state.auth);

    return (
        <Routes>
            {isAuth ? (
                <>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </>
            ) : (
                <>
                    <Route path="/login" element={<AuthForm />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </>
            )}
        </Routes>
    );
};