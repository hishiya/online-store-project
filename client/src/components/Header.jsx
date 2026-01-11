import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/model/authSlice';
import { FaShoppingCart, FaStore } from 'react-icons/fa';
import styles from './Header.module.css';

export const Header = () => {
    const dispatch = useDispatch();
    const { isAuth, user } = useSelector((state) => state.auth);
    const { items, totalPrice } = useSelector((state) => state.cart)

    const totalCount = items.reduce((sum, item) => sum + item.count, 0)

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                <FaStore color="#007bff" />
                OnlineStore
            </Link>

            <nav className={styles.nav}>
                <Link to="/" className={styles.link}>Головна</Link>
                
                {isAuth ? (
                    <div className={styles.userBlock}>
                        <Link to="/cart" className={styles.cartContainer}>
                            {totalPrice > 0 && (
                                <span className={styles.cartPrice}>{totalPrice} ₴</span>
                            )}
                            
                            <div className={styles.iconWrapper}>
                                <FaShoppingCart size={20} />
                                {totalCount > 0 && (
                                    <span className={styles.badge}>{totalCount}</span>
                                )}
                            </div>
                        </Link>
                        
                        <span className={styles.userName}>
                            {user?.email || 'User'}
                        </span>
                        
                        <button onClick={handleLogout} className={styles.logoutBtn}>
                            Вийти
                        </button>
                    </div> 
                ) : (
                    <Link to="/login" className={styles.link}>
                        Увійти
                    </Link>
                )}
            </nav>
        </header>
    );
};