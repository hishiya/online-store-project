import { useEffect, useState } from 'react';
import { api } from '../services/api/baseApi';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import styles from './AdminOrders.module.css'; 

export const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { user, isAuth } = useSelector((state) => state.auth);
    const token = window.localStorage.getItem('token');

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/api/admin/orders');
            setOrders(data);
        } catch (err) {
            console.error('Помилка завантаження: ', err);
            alert('Не вдалося завантажити список замовлень');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user?.role === 'admin') {
            fetchOrders();
        }
    }, [user]);

    const handleChangeStatus = async (id, newStatus) => {
        try {
            await api.patch(`/api/admin/orders/${id}`, { status: newStatus });
            
            setOrders((prev) => prev.map(order =>
                order._id === id ? { ...order, status: newStatus } : order
            ));
        } catch (err) {
            console.error('Не вдалося оновити статус', err);
            alert("Помилка при оновленні");
        }
    };

    if (token && !isAuth) {
        return <div style={{ padding: 40, textAlign: 'center' }}>Перевірка прав доступу... 🕵️‍♂️</div>;
    }

    if (!isAuth || user?.role !== 'admin') {
        return <Navigate to='/' />;
    }

    if (isLoading) return <div style={{ padding: 40, textAlign: 'center' }}>Завантаження замовлень... 📦</div>;

    return (
        <div className={styles.root}>
            <h1>Панель керування замовленнями 🛠️</h1>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Клієнт</th>
                            <th>Товари</th>
                            <th>Сума</th>
                            <th>Дата</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>
                                    <b>#{order._id.slice(-6).toUpperCase()}</b>
                                </td>
                                <td>
                                    <b>{order.fullName}</b><br />
                                    <span style={{ fontSize: 13, color: '#555' }}>{order.phone}</span><br />
                                    <span style={{ fontSize: 12, color: '#999' }}>{order.address}</span>
                                </td>
                                <td className={styles.itemsList}>
                                    {order.items.map((item, idx) => (
                                        <div key={idx}>
                                            • {item.product ? item.product.title : 'Товар видалено'} (x{item.count})
                                        </div>
                                    ))}
                                    {order.comment && (
                                        <div style={{ marginTop: 5, color: '#d35400', fontStyle: 'italic', fontSize: 12 }}>
                                            💬 "{order.comment}"
                                        </div>
                                    )}
                                </td>
                                <td className={styles.price}>{order.totalPrice} ₴</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <select
                                        className={styles.statusSelect}
                                        value={order.status}
                                        onChange={(e) => handleChangeStatus(order._id, e.target.value)}
                                        style={{
                                            borderColor: order.status === 'Виконано' ? 'green' : '#ddd',
                                            color: order.status === 'Виконано' ? 'green' : 'black'
                                        }}
                                    >
                                        <option value="В обробці">⏳ В обробці</option>
                                        <option value="Готується">👨‍🍳 Готується</option>
                                        <option value="Відправлено">🚀 Відправлено</option>
                                        <option value="Виконано">✅ Виконано</option>
                                        <option value="Скасовано">❌ Скасовано</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.cardsWrapper}>
                {orders.map((order) => (
                    <div key={order._id} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <span className={styles.cardNumber}>#{order._id.slice(-6).toUpperCase()}</span>
                            <span className={styles.cardDate}>
                                {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <div className={styles.cardClient}>
                            <div className={styles.cardName}>{order.fullName}</div>
                            <div className={styles.cardPhone}>{order.phone}</div>
                            <div className={styles.cardAddress}>{order.address}</div>
                        </div>
                        <div className={styles.cardItems}>
                            {order.items.map((item, idx) => (
                                <div key={idx} className={styles.cardItem}>
                                    • {item.product ? item.product.title : 'Товар видалено'} (x{item.count})
                                </div>
                            ))}
                            {order.comment && (
                                <div className={styles.cardComment}>
                                    💬 "{order.comment}"
                                </div>
                            )}
                        </div>
                        <div className={styles.cardFooter}>
                            <span className={styles.cardPrice}>{order.totalPrice} ₴</span>
                            <select
                                className={styles.statusSelect}
                                value={order.status}
                                onChange={(e) => handleChangeStatus(order._id, e.target.value)}
                                style={{
                                    borderColor: order.status === 'Виконано' ? 'green' : '#ddd',
                                    color: order.status === 'Виконано' ? 'green' : 'black'
                                }}
                            >
                                <option value="В обробці">⏳ В обробці</option>
                                <option value="Готується">👨‍🍳 Готується</option>
                                <option value="Відправлено">🚀 Відправлено</option>
                                <option value="Виконано">✅ Виконано</option>
                                <option value="Скасовано">❌ Скасовано</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};