import styles from './ProductCard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../cart/model/cartSlice';
import { api } from '../../../services/api/baseApi';
import { fetchProducts } from '../model/productsSlice'; // 3. Імпорт для оновлення списку

export const ProductCard = ({ product }) => {

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth)

    const formattedPrice = new Intl.NumberFormat('uk-Ua', {
        style: 'currency',
        currency: 'UAH',
        maximumFractionDigits: 0,
    }).format(product.price);

    const imageUrl = product.imageUrl 
    ? `http://localhost:5000${product.imageUrl}`
    : 'https://via.placeholder.com/200?text=No+Image';

    const onClickAdd = () => {

        console.log("🔍 ЩО В ТОВАРІ?", product); 
        console.log("🆔 ID ТОВАРУ:", product._id);
        const item = {
            _id: product._id,
            title: product.title,
            price: product.price,
            imageUrl: product.imageUrl,
        }

        dispatch(addItem(item));

        alert('Товар додано в кошик! 🛒')
    }

    const onClickRemove = async () => {
        if (window.confirm('Ви точно хочете видалити цей товар? 🗑️')) {
            try {
                await api.delete(`/products/${product._id}`)
                dispatch(fetchProducts())
            } catch (err) {
                console.error(err);
                alert('Не вдалося видалити товар');
            }
        }
    }

    return (
        <article className={styles.card}>
            
            {user?.role === 'admin' && (
                <button 
                    onClick={onClickRemove} 
                    className={styles.deleteBtn}
                    title="Видалити товар"
                >
                    ✖
                </button>
            )}

            <div className={styles.imageWrapper}>
                <img
                    src={imageUrl}
                    alt={product.title}
                    className={styles.image}
                    loading="lazy"
                />
            </div>

            <div className={styles.content}>
                <h3 className={styles.title} title={product.title}>{product.title}</h3>
                <div className={styles.price}>{formattedPrice}</div>
                <button onClick={onClickAdd} className={styles.button}>В кошик</button>
            </div>
        </article>
    )
}

