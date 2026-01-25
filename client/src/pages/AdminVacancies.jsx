import { useEffect, useState } from 'react';
import { api } from '../services/api/baseApi';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import styles from './AdminVacancies.module.css';

export const AdminVacancies = () => {
    const [vacancies, setVacancies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { user, isAuth } = useSelector((state) => state.auth);
    const token = window.localStorage.getItem('token');

    const fetchVacancies = async () => {
        try {
            const { data } = await api.get('/vacancies');
            setVacancies(data);
        } catch (err) {
            console.error('Помилка завантаження: ', err);
            alert('Не вдалося завантажити список заявок');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user?.role === 'admin') {
            fetchVacancies();
        }
    }, [user]);

    const handleChangeStatus = async (id, newStatus) => {
        try {
            await api.patch(`/vacancies/${id}`, { status: newStatus });

            setVacancies((prev) =>
                prev.map((vacancy) =>
                    vacancy._id === id ? { ...vacancy, status: newStatus } : vacancy
                )
            );
        } catch (err) {
            console.error('Не вдалося оновити статус', err);
            alert('Помилка при оновленні статусу');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Ви впевнені, що хочете видалити цю заявку?')) {
            return;
        }

        try {
            await api.delete(`/vacancies/${id}`);
            setVacancies((prev) => prev.filter((vacancy) => vacancy._id !== id));
        } catch (err) {
            console.error('Не вдалося видалити заявку', err);
            alert('Помилка при видаленні');
        }
    };

    if (token && !isAuth) {
        return <div style={{ padding: 40, textAlign: 'center' }}>Перевірка прав доступу... 🕵️‍♂️</div>;
    }

    if (!isAuth || user?.role !== 'admin') {
        return <Navigate to="/" />;
    }

    if (isLoading) {
        return <div style={{ padding: 40, textAlign: 'center' }}>Завантаження заявок... 📋</div>;
    }

    const statusLabels = {
        new: '🆕 Нова',
        reviewed: '👀 Переглянута',
        accepted: '✅ Прийнята',
        rejected: '❌ Відхилена',
    };

    return (
        <div className={styles.root}>
            <h1>Заявки на вакансії 📋</h1>

            {vacancies.length === 0 ? (
                <div className={styles.empty}>
                    <p>Поки немає жодної заявки</p>
                </div>
            ) : (
                <>
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Ім'я</th>
                                    <th>Контакти</th>
                                    <th>Повідомлення</th>
                                    <th>Резюме</th>
                                    <th>Дата</th>
                                    <th>Статус</th>
                                    <th>Дії</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vacancies.map((vacancy, index) => (
                                    <tr key={vacancy._id}>
                                        <td>
                                            <b>{index + 1}</b>
                                        </td>
                                        <td>
                                            <b>{vacancy.name}</b>
                                        </td>
                                        <td>
                                            <a href={`mailto:${vacancy.email}`} className={styles.link}>
                                                {vacancy.email}
                                            </a>
                                            <br />
                                            <a href={`tel:${vacancy.phone}`} className={styles.link}>
                                                {vacancy.phone}
                                            </a>
                                        </td>
                                        <td className={styles.message}>{vacancy.message}</td>
                                        <td>
                                            {vacancy.resumeUrl ? (
                                                <a 
                                                    href={`http://localhost:5000${vacancy.resumeUrl}`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className={styles.fileLink}
                                                >
                                                    📄 Завантажити
                                                </a>
                                            ) : (
                                                <span className={styles.noFile}>—</span>
                                            )}
                                        </td>
                                        <td>{new Date(vacancy.createdAt).toLocaleDateString('uk-UA')}</td>
                                        <td>
                                            <select
                                                className={`${styles.statusSelect} ${styles[vacancy.status]}`}
                                                value={vacancy.status}
                                                onChange={(e) => handleChangeStatus(vacancy._id, e.target.value)}
                                            >
                                                <option value="new">Нова</option>
                                                <option value="reviewed">Переглянута</option>
                                                <option value="accepted">Прийнята</option>
                                                <option value="rejected">Відхилена</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button
                                                className={styles.deleteBtn}
                                                onClick={() => handleDelete(vacancy._id)}
                                            >
                                                Видалити
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.cardsWrapper}>
                        {vacancies.map((vacancy, index) => (
                            <div key={vacancy._id} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.cardNumber}>#{index + 1}</span>
                                    <span className={styles.cardDate}>
                                        {new Date(vacancy.createdAt).toLocaleDateString('uk-UA')}
                                    </span>
                                </div>
                                <div className={styles.cardName}>{vacancy.name}</div>
                                <div className={styles.cardContacts}>
                                    <a href={`mailto:${vacancy.email}`} className={styles.link}>
                                        📧 {vacancy.email}
                                    </a>
                                    <a href={`tel:${vacancy.phone}`} className={styles.link}>
                                        📞 {vacancy.phone}
                                    </a>
                                </div>
                                {vacancy.message && (
                                    <div className={styles.cardMessage}>{vacancy.message}</div>
                                )}
                                {vacancy.resumeUrl && (
                                    <a 
                                        href={`http://localhost:5000${vacancy.resumeUrl}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className={styles.fileLink}
                                    >
                                        📄 Завантажити резюме
                                    </a>
                                )}
                                <div className={styles.cardActions}>
                                    <select
                                        className={`${styles.statusSelect} ${styles[vacancy.status]}`}
                                        value={vacancy.status}
                                        onChange={(e) => handleChangeStatus(vacancy._id, e.target.value)}
                                    >
                                        <option value="new">Нова</option>
                                        <option value="reviewed">Переглянута</option>
                                        <option value="accepted">Прийнята</option>
                                        <option value="rejected">Відхилена</option>
                                    </select>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => handleDelete(vacancy._id)}
                                    >
                                        Видалити
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
