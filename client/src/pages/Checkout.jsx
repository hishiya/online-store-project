import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { api } from '../services/api/baseApi';
import { clearCart } from '../features/cart/model/cartSlice';

import styles from './Checkout.module.css';

export const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { items, totalPrice } = useSelector((state) => state.cart);
    const { isAuth } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        comment: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    if (!items.length) return <Navigate to="/" />;
    if (!isAuth) return <Navigate to="/login" />;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await api.post('/api/orders', formData);
            dispatch(clearCart());
            alert('Order created successfully');
            navigate('/');
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Failed to create order');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.root}>
      <h1>Оформлення замовлення 📦</h1>
      
      <div className={styles.grid}>
        
        {/* ЛІВА КОЛОНКА: ФОРМА */}
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>ПІБ</label>
            <input 
              name="fullName"
              value={formData.fullName} 
              onChange={handleChange} 
              required 
              placeholder="Іванов Іван"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Телефон</label>
            <input 
              name="phone"
              value={formData.phone} 
              onChange={handleChange} 
              required 
              placeholder="+380..."
            />
          </div>

          <div className={styles.formGroup}>
            <label>Адреса доставки</label>
            <input 
              name="address"
              value={formData.address} 
              onChange={handleChange} 
              required 
              placeholder="Місто, вулиця, будинок"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Коментар до замовлення</label>
            <textarea 
              name="comment"
              value={formData.comment} 
              onChange={handleChange} 
              placeholder="Код домофону, кількість приборів, тощо..."
            />
          </div>

          <button 
            disabled={isLoading} 
            type="submit" 
            className={styles.submitBtn}
          >
            {isLoading ? 'Оформлюємо...' : `Оплатити ${totalPrice} грн`}
          </button>
        </form>

        {/* ПРАВА КОЛОНКА: ВАШЕ ЗАМОВЛЕННЯ */}
        <div className={styles.summary}>
          <h3>Ваше замовлення:</h3>
          <ul className={styles.itemList}>
            {items.map(item => (
              <li key={item._id} className={styles.item}>
                <div className={styles.itemInfo}>
                  <b>{item.title}</b>
                  <span>{item.count} шт.</span>
                </div>
                <div className={styles.itemPrice}>
                   {item.price * item.count} ₴
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.total}>
            <span>Разом до сплати:</span>
            <span>{totalPrice} ₴</span>
          </div>
        </div>

      </div>
    </div>
    )
}