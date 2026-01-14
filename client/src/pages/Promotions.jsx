import React from 'react';
import styles from './Promotions.module.css';

export const Promotions = () => {
    const promos = [
        {
            id: 1,
            title: "Козацький вівторок",
            description: "Кожна третя порція шашлику зі свинини — у подарунок!",
            date: "До кінця місяця",
            image: "🍖"
        },
        {
            id: 2,
            title: "Сет для компанії",
            description: "Замовляйте великий м'ясний сет та отримуйте 1л ПИВА! безкоштовно.",
            date: "Постійна акція",
            image: "🍺"
        }
    ];

    return (
        <div className={styles.root}>
            <h1>Наші Акції 🔥</h1>
            <div className={styles.list}>
                {promos.map(promo => (
                    <div key={promo.id} className={styles.card}>
                        <div className={styles.icon}>{promo.image}</div>
                        <h2>{promo.title}</h2>
                        <p>{promo.description}</p>
                        <span className={styles.date}>{promo.date}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};