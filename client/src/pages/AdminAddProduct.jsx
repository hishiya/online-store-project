import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { api } from '../services/api/baseApi';
import styles from './AdminAddProduct.module.css';

export const AdminAddProduct = () => {
    const { isAuth, user } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const inputFileRef = useRef(null);

    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [category, setCategory] = useState('Мангал');
    
    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file);

            const { data } = await api.post('/upload', formData)
            setImageUrl(data.url)
        } catch (err) {
            console.warn(err);
            alert('Помилка при завантаженні файлу')
        }
    }

    const onClickRemoveImage = () => {
        setImageUrl('');
      };

    const onSubmit = async () => {
        try {
            const fields = {
                title, 
                description,
                price: Number(price),
                weight: Number(weight),
                category,
                imageUrl,
            }

            await api.post('/products', fields)
            alert('Товар успішно створено! 🎉');
            navigate('/');
        } catch (err) {
            console.warn(err);
            alert('Не вдалося створити товар');
          }
    }

    const token = window.localStorage.getItem('token');
  
    if (token && !isAuth) {
      return <div style={{padding: 40, textAlign: 'center'}}>Перевірка прав...</div>;
    }
  
    if (!token || (isAuth && user?.role !== 'admin')) {
      return <Navigate to="/" />;
    }
    
    return (
        <div className={styles.root}>
        <h1>Додавання нового товару 🍖</h1>

      <div className={styles.formGroup}>
        <button onClick={() => inputFileRef.current.click()} className={styles.uploadBtn}>
           📸 Завантажити фото
        </button>
        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
        
        {imageUrl && (
          <>
            <img className={styles.previewImage} src={`http://localhost:5000${imageUrl}`} alt="Uploaded" />
            <button onClick={onClickRemoveImage} style={{color: 'red', marginTop: 10, cursor: 'pointer', border: 'none', background: 'none'}}>
                Видалити фото
            </button>
          </>
        )}
      </div>

      <div className={styles.formGroup}>
        <label>Назва товару</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Наприклад: Шашлик свинячий" />
      </div>

      <div className={styles.formGroup}>
        <label>Категорія</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Мангал">🔥 Мангал</option>
            <option value="Салати">🥗 Салати</option>
            <option value="Напої">🥤 Напої</option>
            <option value="Супи">🍲 Супи</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <div style={{display: 'flex', gap: 20}}>
            <div style={{flex: 1}}>
                <label>Ціна (грн)</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div style={{flex: 1}}>
                <label>Вага (г)</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Опис</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Опис інгредієнтів..." />
      </div>

      <button onClick={onSubmit} className={styles.submitBtn}>
        Опублікувати товар ✅
      </button>
    </div>
    )
}