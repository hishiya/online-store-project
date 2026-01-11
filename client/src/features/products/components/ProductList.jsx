import {  use, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../model/productsSlice';
import { ProductCard } from './ProductCard';
import styles from './ProductList.module.css';

export const ProductList = () => {
    const dispatch = useDispatch();
    const { items, error, isLoading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (isLoading) {
        return <div className={styles.loading}>Завантаження каталогу... ⏳</div>
    }

    if (error) {
        return <div className={styles.error}>Помилка завантаження каталогу: {error}</div>
    }

    if (!items.length) {
        return <div className={styles.empty}>Каталог порожній. 😔</div>
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Каталог товарів</h1>
            <div className={styles.grid}>
                {items.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
}