import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { checkAuth } from './features/auth/model/authSlice';
import { AppRouter } from './app/AppRouter'; 
import { api } from './services/api/baseApi';
import { ToastContainer } from "react-toastify";
import { useLocation } from 'react-router-dom';
import  HeroSection from './components/HeroSection';

function App() {
  const dispatch = useDispatch();
  const { isLoading, isAuth } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const isMounted = useRef(false);
  const location = useLocation();

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    if (!isAuth) return;

    const saveCartToBackend = async () => {
      try {
        const cartData = items.map(item => ({
           product: item._id,
           count: item.count
        }));

        await api.put('/api/cart', cartData); 
        console.log("✅ Кошик синхронізовано з БД");
      } catch (err) {
        console.error("❌ Не вдалося зберегти кошик:", err);
      }
    };

    const timeoutId = setTimeout(() => {
        saveCartToBackend();
    }, 500);

    return () => clearTimeout(timeoutId);

  }, [items, isAuth]);

  const isHeroSection = location.pathname === '/';

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px'}}>
        <h2>Завантаження... ⏳</h2>
      </div>
    );
  }

  return (
    <>
      {isHeroSection ? (
        <HeroSection />
      ) : (
        <div className="app-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <main style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: isAuth ? 'flex-start' : 'center',
            flex: 1
          }}>
            <AppRouter />
          </main>
          <Footer />
          <ToastContainer position='bottom-right' autoClose={3000} theme='colored'/>
        </div>
      )}
    </>
  );
}

export default App;