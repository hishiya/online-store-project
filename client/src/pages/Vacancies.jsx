import React, { useState } from 'react';
import styles from './Vacancies.module.css';
import { api } from '../services/api/baseApi';
import { toast } from 'react-toastify';

const Vacancies = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.post('/vacancies', formData);
            toast.success(response.data.message);
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting vacancy:', error);
            const errorMessage = error.response?.data?.message || 'Помилка при надсиланні заявки. Спробуйте ще раз пізніше.';
            alert(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Приєднуйтесь до нашої команди!</h1>
            <p className={styles.description}>Заповніть форму нижче, щоб подати заявку на вакансію в нашому ресторані.</p>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Ім'я:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={styles.input}
                        required
                        disabled={isLoading}
                    />
                </label>
                <label className={styles.label}>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input}
                        required
                        disabled={isLoading}
                    />
                </label>
                <label className={styles.label}>
                    Телефон:
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={styles.input}
                        required
                        disabled={isLoading}
                    />  
                </label>
                <label className={styles.label}>
                    Розкажіть про себе:
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={styles.textarea}
                        rows="5"
                        required
                        disabled={isLoading}
                    />
                </label>
                <button type="submit" className={styles.button} disabled={isLoading}>{isLoading ? 'Відправляємо...' : 'Відправити'}</button>
            </form>
        </div>
    );
};

export default Vacancies;