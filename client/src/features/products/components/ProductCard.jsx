import styles from './ProductCard.module.css';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../cart/model/cartSlice';
import { api } from '../../../services/api/baseApi';
import { fetchProducts } from '../model/productsSlice';
import { useState } from 'react';

export const ProductCard = ({ product }) => {
    const [showDetails, setShowDetails] = useState(false); // Стан для кнопки "Подробиці"
    const [detailsVisible, setDetailsVisible] = useState(false); // Стан для відображення опису

    const toggleDetails = () => {
        setDetailsVisible((prev) => !prev); // Перемикання видимості опису
    };

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const formattedPrice = new Intl.NumberFormat('uk-Ua', {
        style: 'currency',
        currency: 'UAH',
        maximumFractionDigits: 0,
    }).format(product.price);

    const getImageUrl = (url) => {
        if (!url) return 'https://via.placeholder.com/200?text=No+Image';
        if (url.startsWith('http')) return url;
        return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${url}`;
    };

    const imageUrl = getImageUrl(product.imageUrl);

    const onClickAdd = () => {
        const item = {
            _id: product._id,
            title: product.title,
            price: product.price,
            imageUrl: product.imageUrl,
        };

        dispatch(addItem(item));
        toast.success(`🛒 ${product.title} додано в кошик!`);
    };

    const onClickRemove = async () => {
        if (window.confirm('Ви точно хочете видалити цей товар? 🗑️')) {
            try {
                await api.delete(`/products/${product._id}`);
                dispatch(fetchProducts());
                toast.info('Товар видалено успішно');
            } catch (err) {
                console.error(err);
                toast.error('Не вдалося видалити товар');
            }
        }
    };

    const handleTouchStart = () => {
        setShowDetails(true);
    };

    const handleTouchEnd = () => {
        setTimeout(() => setShowDetails(false), 2000); 
    };

    return (
        <article 
            className={styles.card} 
            onMouseEnter={() => setShowDetails(true)} 
            onMouseLeave={() => setShowDetails(false)}
            onTouchStart={handleTouchStart} 
            onTouchEnd={handleTouchEnd}
        >
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
                {showDetails && !detailsVisible && (
                    <button 
                        className={styles.detailsButton} 
                        onClick={toggleDetails}
                    >
                        Подробиці
                    </button>
                )}
            </div>

            <div className={styles.content}>
                <h3 className={styles.title} title={product.title}>{product.title}</h3>
                <div className={styles.price}>{formattedPrice}</div>
                <button onClick={onClickAdd} className={styles.button}>В кошик</button>
            </div>

            {detailsVisible && (
                <div className={styles.detailsPopup}>
                    <p><strong>Опис:</strong> {product.description}</p>
                    <p><strong>Вага:</strong> {product.weight} г</p>
                    <button 
                        className={styles.closeDetailsButton} 
                        onClick={toggleDetails}
                    >
                        Закрити
                    </button>
                </div>
            )}
        </article>
    );
};

