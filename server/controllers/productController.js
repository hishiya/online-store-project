const ProductModel = require('../models/Product');

exports.getAll = async (req, res) => {
    try {
        const products = await ProductModel.find().exec();
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося отримати товари'
        });
    }
};


exports.getOne = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await ProductModel.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Товар не знайдено' });
        }
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося отримати товар'
        });
    }
};


exports.create = async (req, res) => {
    try {
        const { title, description, price, imageUrl, category, weight } = req.body;

        const doc = new ProductModel({
            title,
            description,
            price,
            imageUrl, 
            category,
            weight,   
        });

        const product = await doc.save();
        res.json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося створити товар',
            error: err.message
        });
    }
};