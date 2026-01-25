import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../model/authSlice";
import styles from "./AuthForm.module.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const [errors, setErrors] = useState({})

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, isLoading, isAuth } = useSelector((state) => state.auth);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    }

    const validateFullName = (name) => {
        return name.trim().length >= 2;
    }

    const validateForm = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = "Email є обов'язковим";
        } else if (!validateEmail(email)) {
            newErrors.email = "Некоректний формат email";
        }

        if (!password) {
            newErrors.password = "Пароль є обов'язковим";
        } else if (!validatePassword(password)) {
            newErrors.password = "Пароль повинен містити щонайменше 8 символів";
        }

        if (!isLogin && !validateFullName(fullName)) {
            newErrors.fullName = "ПІБ має містити мінімум 2 символи";
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    useEffect(() => {
        if (isAuth) {
            toast.success('Ви успішно увійшли')
            setTimeout(() => {
                navigate('/menu');
            }, 1000);
        }
    }, [isAuth, navigate]);

    useEffect(() => {
        if (status && !isAuth) {
            toast.error(status)
        }
    }, [status, isAuth])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Будь ласка, виправте помилки у формі перед відправкою.');
            return;
        }

        if (isLogin) {
            dispatch(loginUser({ email, password }))
        } else {
            dispatch(registerUser({ email, password, fullName: fullName || 'Користувач' }))
        }
    }

    return (

        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                theme="light"
            />

            <form className={styles.container} onSubmit={handleSubmit}>
                <h2 className={styles.title}>
                    {isLogin ? "Вхід" : "Реєстрація"}
                </h2>

                {status && <div className={styles.error}>{status}</div>}

                {!isLogin && (
                    <div className={styles.formGroup}>
                        <input
                            className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
                            type="text"
                            placeholder="ПІБ"
                            value={fullName}
                            onChange={(e) => {
                                setFullName(e.target.value);
                                if (errors.fullName) setErrors({ ...errors, fullName: '' });
                            }}
                        />
                        {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
                    </div>
                )}

                <div className={styles.formGroup}>
                    <input
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                    />
                    {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                <div className={styles.formGroup}>
                    <input
                        className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (errors.password) setErrors({ ...errors, password: '' });
                        }}
                    />
                    {errors.password && <span className={styles.errorText}>{errors.password}</span>}
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
                            setErrors({});
                        }}
                    >
                        {isLogin ? 'Немає акаунту? Реєстрація' : 'Вже є акаунт? Вхід'}
                    </span>
                </p>
            </form>
        </>

    )

}