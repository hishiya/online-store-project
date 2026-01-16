import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../model/productsSlice';
import { ProductCard } from './ProductCard';
import { useState } from 'react';
import styles from './ProductList.module.css';

export const ProductList = () => {
    const dispatch = useDispatch();
    const { items, error, isLoading } = useSelector((state) => state.products);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = items.filter((product) => {
        const query = searchQuery.toLowerCase();

        const matchesTitle = product.title?.toLowerCase().includes(query);
        const matchesDescription = product.description?.toLowerCase().includes(query);
        return matchesTitle || matchesDescription;
    })


    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (isLoading) {
        return <div className={styles.loading}>Завантаження каталогу... ⏳</div>
    }

    if (error) {
        return <div className={styles.error}>Помилка завантаження каталогу: {error}</div>
    }



    return (
        <div className={styles.container}>
            <div className={styles.sorting}>
                <h1 className={styles.heading}>Каталог товарів</h1>
                <div className={styles.content}>
                    <input
                        className={styles.search}
                        placeholder="Пошук"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <ul className={styles.list}>
                        <li className={styles.food}>Мангал</li>
                        <li className={styles.food}>Салати</li>
                        <li className={styles.food}>Напої</li>
                        <li className={styles.food}>Супи</li>
                    </ul>
                </div>
            </div>
            <div className={styles.grid}>
                {!items.length ? (
                    <div className={styles.empty}>Товарів поки що немає</div>
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <div className={styles.empty}>Каталог порожній. 😔</div>
                )}
            </div>
        </div>
    )
}