import styles from './ProductCard.module.css';
import { useDispatch } from 'react-redux';
import { addItem } from '../../cart/model/cartSlice';

export const ProductCard = ({ product }) => {

    const dispatch = useDispatch();
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

    return (
        <article className={styles.card}>
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
                <button  onClick={onClickAdd} className={styles.button}>В кошик</button>
            </div>
        </article>
    )
}

