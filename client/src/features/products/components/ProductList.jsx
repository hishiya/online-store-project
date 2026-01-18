import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../model/productsSlice';
import { ProductCard } from './ProductCard';
import styles from './ProductList.module.css';

export const ProductList = () => {
    const dispatch = useDispatch();
    const { items, error, isLoading } = useSelector((state) => state.products);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sortOrder, setSortOrder] = useState('default'); 

    const displayedProducts = items.filter((product) => {
        const query = searchQuery.trim().toLowerCase();
        const matchesQuery =
            !query ||
            product.title?.toLowerCase().includes(query) ||
            product.description?.toLowerCase().includes(query);

        const matchesCategory = !selectedCategory || product.category === selectedCategory;

        return matchesQuery && matchesCategory;
    });

    const sortedProducts = [...displayedProducts].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.price - b.price;
        } else if (sortOrder === 'desc') {
            return b.price - a.price;
        } else {
            return items.indexOf(a) - items.indexOf(b); 
        }
    });



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
                        <li onClick={() => setSelectedCategory(null)} className={styles.food + ' ' + (selectedCategory === null ? styles.active : '')}>Усі</li>
                        <li onClick={() => setSelectedCategory('Мангал')} className={styles.food + ' ' + (selectedCategory === 'Мангал' ? styles.active : '')}>Мангал</li>
                        <li onClick={() => setSelectedCategory('Салати')}  className={styles.food + ' ' + (selectedCategory === 'Салати' ? styles.active : '')}>Салати</li>
                        <li onClick={() => setSelectedCategory('Напої')} className={styles.food + ' ' + (selectedCategory === 'Напої' ? styles.active : '')}>Напої</li>
                        <li onClick={() => setSelectedCategory('Супи')} className={styles.food + ' ' + (selectedCategory === 'Супи' ? styles.active : '')}>Супи</li>
                    </ul>

                    <select
                        className={styles.sortSelect}
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="default">За замовчуванням</option>
                        <option value="asc">Від дешевих до дорогих</option>
                        <option value="desc">Від дорогих до дешевих</option>
                    </select>
                </div>
            </div>

            <div className={styles.grid}>
                {!items.length ? (
                    <div className={styles.empty}>Товарів поки що немає</div>
                ) : sortedProducts.length > 0 ? (
                    sortedProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <div className={styles.empty}>Каталог порожній. 😔</div>
                )}
            </div>
        </div>
    )
}