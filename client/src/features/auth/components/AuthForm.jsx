import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../model/authSlice";
import styles from "./AuthForm.module.css";
import clsx from "clsx";

export const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const dispatch = useDispatch();
    const { status, isLoading } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLogin) {
            dispatch(loginUser({email, password}))
        } else {
            dispatch(registerUser({email, password, fullName: 'New User'}))
        }
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h2 className={styles.title}>
                {isLogin ? "Login" : "Register"}
            </h2>

            {status && <div className={styles.error}>{status}</div>}

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
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? 'Немає акаунту? Реєстрація' : 'Вже є акаунт? Вхід'}
                </span>
            </p>
        </form>
    )

}