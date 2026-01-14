import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.section}>
                    <h3>Козацький Шашлик</h3>
                    <p>
                        Найкращий шашлик для вас і вашої родини.
                        Ми працюємо, щоб робити ваше життя смачнішим та приємнішим.
                    </p>
                </div>

                <div className={styles.section}>
                    <h3>Навігація</h3>
                    <ul>
                        <li><Link to="/">Головна</Link></li>
                        <li><Link to="/about">Про нас</Link></li>
                        <li><Link to="/promotions">Акції</Link></li>
                        <li><Link to="/contacts">Контакти</Link></li>
                    </ul>
                </div>

                <div className={styles.section}>
                    <h3>Контакти</h3>
                    <ul>
                        <li>📍 м. Одеса, вул. Дерибасівська, 14</li>
                        <li>📞 +38 (099) 123-45-67</li>
                        <li>✉️ shashlik@gmail.com</li>
                    </ul>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {currentYear} Козацький Шашлик. Всі права захищені.</p>
                </div>

            </div>
        </footer>
    );  
};