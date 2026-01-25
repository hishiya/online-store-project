require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer')

const OrderController = require('./controllers/orderController');
const ProductController = require('./controllers/productController');
const checkAuth = require('./utils/checkAuth');
const UserController = require('./controllers/userController');
const VacancyController = require('./controllers/vacancyController');
const { register, login, getMe, updateCart } = require('./controllers/userController')
const checkAdmin = require('./utils/checkAdmin');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.post('/auth/register', UserController.register);
app.post('/auth/login', UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/vacancies', VacancyController.create);
app.get('/vacancies', checkAuth, checkAdmin, VacancyController.getAll);
app.get('/vacancies/:id', checkAuth, checkAdmin, VacancyController.getOne);
app.patch('/vacancies/:id', checkAuth, checkAdmin, VacancyController.updateStatus);
app.delete('/vacancies/:id', checkAuth, checkAdmin, VacancyController.remove);  

app.get('/products', ProductController.getAll);
app.get('/products/:id', ProductController.getOne);

app.post('/products', checkAuth, checkAdmin, ProductController.create);
app.delete('/products/:id', checkAuth, checkAdmin, ProductController.remove);
app.patch('/products/:id', checkAuth, checkAdmin, ProductController.update);

app.post('/api/orders', checkAuth, OrderController.createOrder);
app.get('/api/orders', checkAuth, OrderController.getMyOrders);

app.put('/api/cart', checkAuth, updateCart);

app.get('/api/admin/orders', checkAuth, checkAdmin, OrderController.getAllOrders);

app.patch('/api/admin/orders/:id', checkAuth, checkAdmin, OrderController.updateOrderStatus);

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