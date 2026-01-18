import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HeroSection.module.css';

const HeroSection = () => {
    return (
        <div className={styles.hero}>
            <div className={styles.heroContent}>
                <h1 className={styles.title}>Ласкаво просимо до "Козацького Шашлику"</h1>
                <p className={styles.subtitle}>Скуштуйте найсмачніший шашлик у місті!</p>
                <Link to="/menu" className={styles.heroButton}>Наше меню</Link>
            </div>
        </div>
    );
};

export default HeroSection;