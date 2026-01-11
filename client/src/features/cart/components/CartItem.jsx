import { useDispatch } from 'react-redux'
import { removeItem, addItem, minusItem } from '../model/cartSlice'
import styles from './CartItem.module.css';

export const CartItem = ({ _id, title, price, imageUrl, count }) => {
    const dispatch = useDispatch();

    const onClickPlus = () => {
        dispatch(addItem({ _id }));
    };

    const onClickMinus = () => {
        dispatch(minusItem(_id));
    };

    const onClickRemove = () => {
        if (window.confirm('Видалити цей товар')) {
            dispatch(removeItem(_id))
        }
    }

    const imageSrc = imageUrl 
    ? `http://localhost:5000${imageUrl}` 
    : 'https://via.placeholder.com/100';

    return (
        <div className={styles.item}>
            <img className={styles.image} src={imageSrc} alt={title} />
            
            <div className={styles.info}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.category}>Мангал меню</p>
            </div>

            <div className={styles.countBlock}>
                <button onClick={onClickMinus} className={styles.countBtn}>
                    -
                </button>
                <button onClick={onClickPlus} className={styles.countBtn}>
                    +
                </button>
            </div>

            <div className={styles.count}>
                <b>{count} шт.</b>
            </div>

            <div className={styles.price}>
                <b>{price * count} ₴</b>
            </div>

            <button onClick={onClickRemove} className={styles.removeBtn}>
                ❌
            </button>
        </div>
    );
}