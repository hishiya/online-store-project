import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../services/api/baseApi";
import { Navigate } from "react-router-dom";
import styles from "./Profile.module.css";


export const Profile = () => {
    const { user, isAuth} = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isAuth) {
            const fetchOrders = async () => {
                try {
                    const { data } = await api.get('/api/orders');
                    setOrders(data);
                 } catch (err) {
                    console.error('Error fetching orders:', err);
                 } finally {
                    setIsLoading(false);
                 } 
            }
            fetchOrders();
        }
    }, [isAuth]);

    if (!window.localStorage.getItem('token')) {
        return <Navigate to="/login" />;
    }

    const formatDate = (dateStr) => {
        if (!dateStr) return 'Дата не вказана';
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return 'Невірна дата';
        return date.toLocaleString('uk-UA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    return (
        <div className={styles.root}>
          <div className={styles.header}>
            <div>
              <h1>{user?.fullName}</h1>
              <p>{user?.email}</p>
            </div>
          </div>
          
          <div className={styles.ordersSection}>
            <h2>Історія замовлень 📜</h2>
    
            {isLoading ? (
              <p>Завантаження історії...</p>
            ) : orders.length === 0 ? (
              <div className={styles.emptyState}>
                Ви ще нічого не замовляли 😔 <br/> Час це виправити!
              </div>
            ) : (
              orders.map((order) => (
                <div key={order._id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <span>№ {order._id.slice(-6).toUpperCase()} від {formatDate(order.createdAt)}</span>
                    <span className={`${styles.status} ${styles[order.status === 'В обробці' ? 'pending' : 'completed']}`}>
                      {order.status}
                    </span>
                  </div>
    
                  <ul className={styles.orderItems}>
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        <span>{item.product?.title || "Товар видалено"} (x{item.count})</span>
                        <b>{item.price * item.count} ₴</b>
                      </li>
                    ))}
                  </ul>
    
                  <div className={styles.orderTotal}>
                    Сума: {order.totalPrice} ₴
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );
}