import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/model/authSlice';
import { FaShoppingCart, FaStore, FaUserCircle, FaChevronDown } from 'react-icons/fa';
import styles from './Header.module.css';
import {useState} from "react";

export const Header = () => {
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const { isAuth, user } = useSelector((state) => state.auth);
    const { items, totalPrice } = useSelector((state) => state.cart)

    const totalCount = items.reduce((sum, item) => sum + item.count, 0)

    const handleLogout = () => {
        dispatch(logout());
        setIsOpen(false);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link to="/" className={styles.link}>Головна</Link>
                <Link to="/about" className={styles.link}>Про нас</Link>
                <Link to="/promotions" className={styles.link}>Акції</Link>
                <Link to="/contacts" className={styles.link}>Контакти</Link>
                
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

                        <div className={styles.profileWrapper}>
                            <div className={styles.profileTrigger} onClick={toggleMenu}>
                                <FaUserCircle size={22} className={styles.userIcon} />
                                <span className={styles.userName}>
                                    {user?.fullName?.split(' ')[0] || 'Кабінет'}
                                </span>
                                <FaChevronDown size={14} className={isOpen ? styles.arrowUp : styles.arrowDown} />
                            </div>
                        </div>

                        {isOpen && (
                            <div className={styles.dropdown}>
                                <div className={styles.userInfo}>
                                    <p className={styles.userEmail}>{user?.email}</p>
                                    <span className={styles.roleTag}>{user?.role}</span>
                                </div>

                                <hr />

                                <Link to='/profile' onClick={() => setIsOpen(false)}>Мій профіль</Link>

                                {user?.role === 'admin' && (
                                    <>
                                        <Link to="/admin/add-product" onClick={() => setIsOpen(false)}>
                                            ➕ Додати товар
                                        </Link>
                                        <Link to="/admin/orders" onClick={() => setIsOpen(false)}>
                                            📋 Керування замовленнями
                                        </Link>
                                    </>
                                )}

                                <button onClick={handleLogout} className={styles.dropdownLogout}>
                                    Вийти
                                </button>
                            </div>
                        )}
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