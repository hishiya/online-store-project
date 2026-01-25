# 🍖 Шашлик Онлайн — Інтернет-магазин

Повнофункціональний інтернет-магазин для замовлення страв з мангалу, салатів, супів та напоїв. Проект побудований на стеку MERN (MongoDB, Express, React, Node.js).

## 🚀 Демо

**[Переглянути демо-версію](https://online-store-project-bice.vercel.app/)**

## 📋 Функціонал

- 🛒 Перегляд каталогу товарів з фільтрацією за категоріями
- 🔍 Пошук товарів
- 📦 Додавання товарів у кошик
- 👤 Реєстрація та авторизація користувачів
- 📝 Оформлення замовлень
- 👨‍💼 Адмін-панель для управління товарами та замовленнями
- 💼 Сторінка вакансій з можливістю подачі резюме

## 🛠️ Технології

### Frontend
- React 18
- Redux Toolkit
- React Router
- Axios
- Vite
- CSS Modules

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT авторизація
- Multer (завантаження файлів)

### Хостинг
- Frontend: Vercel
- Backend: Render
- База даних: MongoDB Atlas
- Зображення: Cloudinary

## ⚙️ Встановлення та запуск

### Передумови
- Node.js (v18 або вище)
- npm або yarn
- MongoDB Atlas акаунт (або локальна MongoDB)

### 1. Клонування репозиторію

```bash
git clone https://github.com/hishiya/online-store-project.git
cd online-store-project
```

### 2. Налаштування сервера (Backend)

```bash
cd server
npm install
```

Створіть файл `.env` в папці `server/`:

```env
DB_URL=mongodb+srv://your-username:your-password@cluster.mongodb.net/your-database
PORT=5000
```

Запуск сервера:

```bash
node index.js
```

Сервер буде доступний на `http://localhost:5000`

### 3. Налаштування клієнта (Frontend)

```bash
cd client
npm install
```

Створіть файл `.env` в папці `client/`:

```env
VITE_API_URL=http://localhost:5000
```

Запуск клієнта:

```bash
npm run dev
```

Клієнт буде доступний на `http://localhost:5173`

## 📁 Структура проекту

```
online-store-project/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── app/           # Redux store, Router
│   │   ├── components/    # Загальні компоненти
│   │   ├── features/      # Функціональні модулі
│   │   │   ├── auth/      # Авторизація
│   │   │   ├── cart/      # Кошик
│   │   │   └── products/  # Товари
│   │   ├── pages/         # Сторінки
│   │   └── services/      # API сервіси
│   └── public/            # Статичні файли
│
└── server/                 # Backend (Node.js + Express)
    ├── controllers/       # Контролери
    ├── models/            # Mongoose моделі
    ├── utils/             # Утиліти (middleware)
    └── validators/        # Валідатори
```

## 👨‍💻 Автор

**Данило Колковський**

## 📄 Ліцензія

Цей проект створено в навчальних цілях.
