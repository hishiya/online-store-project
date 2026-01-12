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

exports.remove = async (req, res) => {
    try {
        const productId = req.params.id;

        const doc = await ProductModel.findOneAndDelete({ _id: productId });

        if (!doc) {
            return res.status(404).json({ message: 'Товар не знайдено' });
        }

        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Не вдалося видалити товар' });
    }
};

exports.update = async (req, res) => {
    try {
        const productId = req.params.id;

        await ProductModel.updateOne(
            { _id: productId },
            {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                imageUrl: req.body.imageUrl,
                category: req.body.category,
                weight: req.body.weight,
            }
        );

        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Не вдалося оновити товар' });
    }
};