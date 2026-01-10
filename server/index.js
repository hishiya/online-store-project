require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const ProductController = require('./controllers/productController');
const checkAuth = require('./utils/checkAuth');
const UserController = require('./controllers/userController');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post('/auth/register', UserController.register);
app.post('/auth/login', UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/products', ProductController.getAll);
app.get('/products/:id', ProductController.getOne);
app.post('/products', checkAuth, ProductController.create);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL,);
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

start();    