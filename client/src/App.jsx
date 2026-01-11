import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './components/Header';
import { checkAuth } from './features/auth/model/authSlice';
import { AppRouter } from './app/AppRouter'; 

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, [dispatch]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px'}}>
        <h2>Завантаження... ⏳</h2>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Header />
      
      <main style={{ padding: '40px 20px', minHeight: 'calc(100vh - 80px)' }}>
         <AppRouter />
      </main>
    </div>
  );
}

export default App;