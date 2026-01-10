const OrderModel = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        const { items, totalPrice } = req.body;

        const doc = new OrderModel({
            user: req.userId,
            items,
            totalPrice,
        })

        const order = await doc.save();
        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося створити замовлення'
        })
    }
}

exports.getAll = async (req, res) => {
    try {
        const orders = await OrderModel.find({ user: req.userId }).populate('user').populate('items.product').exec();
        res.json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не вдалося отримати замовлення'
        })
    }
}