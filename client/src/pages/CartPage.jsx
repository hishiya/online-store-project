import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from '../features/cart/model/cartSlice';
import { CartItem } from '../features/cart/components/CartItem';

import styles from './CartPage.module.css';

export const CartPage = () => {
    const dispatch = useDispatch();
    const { items, totalPrice } = useSelector((state) => state.cart)

    const totalCount = items.reduce((sum, item) => sum + item.count, 0)

    const onClickClear = () => {
        if (window.confirm('Видалити всі товари з кошика?'))
            dispatch(clearCart())
    }

    if (!totalCount) {
        return (
            <div className={styles.empty}>
                <h2 className={styles.emptyTitle}>Кошик порожній 😕</h2>
                <p className={styles.emptyText}>
                    Ви ще нічого не додали до замовлення.
                </p>
                <Link to="/" className={styles.backBtn}>
                    Повернутися до меню
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Кошик</h1>
                <button onClick={onClickClear} className={styles.clearBtn}>
                    🗑 Очистити кошик
                </button>
            </div>

            <div className={styles.list}>
                {items.map((item) => (
                    <CartItem key={item._id} {...item}/>
                ))}
            </div>

            <div className={styles.bottom}>
                <p className={styles.details}>
                    Всього товарів: <b>{totalCount} шт.</b>
                </p>
                <p className={styles.totalPrice}>
                    Загальна сума замовлення: <b>{totalPrice} ₴</b>
                </p>
                
                <button className={styles.payBtn}>
                    Оплатити зараз
                </button>
            </div>
        </div>
    )
}