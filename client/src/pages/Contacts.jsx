import React from 'react';
import styles from './Contacts.module.css';

export const Contacts = () => {
    return (
        <div className={styles.root}>
            <h1>Контакти 📍</h1>
            <div className={styles.grid}>
                <div className={styles.info}>
                    <h3>Ми чекаємо на вас:</h3>
                    <p>📍 м. Одеса, вул. Дерибасівська, 14</p>
                    <p>📞 +38 (099) 123-45-67</p>
                    <p>✉️ shashlik@gmail.com</p>
                    <h3>Графік роботи:</h3>
                    <p>Щодня: 10:00 — 22:00</p>
                </div>
                <div className={styles.mapStub}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2747.1932126356846!2d30.737058912278794!3d46.48448646466742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c631980159be15%3A0x2a529f9831b79c57!2z0YPQuy4g0JTQtdGA0LjQsdCw0YHQvtCy0YHQutCw0Y8sIDE0LCDQntC00LXRgdGB0LAsINCe0LTQtdGB0YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsIDY1MDAw!5e0!3m2!1sru!2sua!4v1768344838883!5m2!1sru!2sua"
                        width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade" title="Козацький Шашлик Карта"></iframe>
                </div>
            </div>
        </div>
    );
};