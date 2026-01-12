const OrderModel = require('../models/Order');
const UserModel = require('../models/User');

exports.createOrder = async (req, res) => {
    try {
        const { fullName, phone, address, comment } = req.body;
        const user = await UserModel.findById(req.userId).populate('cart.product');
        if (!user) {
            return res.status(404).json({ message: 'User not found'})
        }

        if (user.cart.length === 0) {
            return res.status(400).json({ message: 'Cart is empty'})
        }

        let totalPrice = 0;
        const orderItems = user.cart.map(item => {
            const productPrice = item.product.price;
            const itemTotal = productPrice * item.count;
            totalPrice += itemTotal;
            return {
                product: item.product._id,
                count: item.count,
                price: productPrice,
            }
        })

        const doc = new OrderModel({
            user: user._id,
            items: orderItems,
            totalPrice,
            fullName,
            phone,
            address,
            comment,
        })

        const order = await doc.save();
        user.cart = [];
        await user.save();
        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to create order'})
    }
}

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({ user: req.userId }).populate('user').populate('items.product').sort({ createdAt: -1 }).exec();
        res.json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to get orders'})
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find()
        .populate('user')
        .populate('items.product')
        .sort({ createdAt: -1 })
        .exec();
        res.json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to get orders'})
    }
}

exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await OrderModel.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        )

        if (!order) {
            return res.status(404).json({ message: 'Замовлення не знайдено'})
        }
        res.json(order)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Не вдалося оновити статус'})
    }
}

