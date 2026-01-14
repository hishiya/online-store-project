import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../model/authSlice";
import styles from "./AuthForm.module.css";
import { toast, ToastContainer } from 'react-toastify';

export const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, isLoading, isAuth } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuth) {
            toast.success('Ви успішно увійшли')
            navigate('/');
        }
    }, [isAuth, navigate]);

    useEffect(() => {
        if (status && !isAuth) {
            toast.error(status)
        }
    }, [status, isAuth])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLogin) {
            dispatch(loginUser({email, password}))
        } else {
            dispatch(registerUser({email, password, fullName: fullName || 'Користувач'}))
        }
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h2 className={styles.title}>
                {isLogin ? "Вхід" : "Реєстрація"}
            </h2>

            {status && <div className={styles.error}>{status}</div>}

            {!isLogin && (
                <div className={styles.formGroup}>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="ПІБ"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required={!isLogin}
                    />
                </div>
            )}

            <div className={styles.formGroup}>
                <input
                    className={styles.input}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <input 
                    className={styles.input}
                    type="password" 
                    placeholder="Пароль" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button
                type="submit"
                className={styles.button}
                disabled={isLoading}
            >
                {isLoading ? 'Завантаження' : (isLogin ? 'Увійти' : 'Зареєструватися')}
            </button>

            <p className={styles.toggleText}>
                <span 
                    className={styles.link}
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setFullName('');
                    }}
                >
                    {isLogin ? 'Немає акаунту? Реєстрація' : 'Вже є акаунт? Вхід'}
                </span>
            </p>
        </form>
    )

}