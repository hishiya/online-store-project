const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { email, password, fullName, avatarUrl } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email,
            fullName,
            avatarUrl,
            password: passwordHash,
            cart: [],
        });

        const user = await doc.save();

        const token = jwt.sign({ _id: user._id }, 'secret123', { expiresIn: '30d' });
        const { password: hash, ...userData } = user._doc;

        res.json({ ...userData, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Registration failed." });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email }).populate('cart.product');

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isValidPass = await bcrypt.compare(password, user.password);
        if (!isValidPass) {
            return res.status(400).json({ message: "Invalid login or password." });
        }

        const token = jwt.sign({ _id: user._id }, 'secret123', { expiresIn: '30d' });
        const { password: hash, ...userData } = user._doc;

        res.json({ ...userData, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Login failed." });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId).populate('cart.product');

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const { password: hash, ...userData } = user._doc;
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "No access." });
    }
};


exports.updateCart = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(
            req.userId,
            {
                cart: req.body 
            },
            {
                new: true 
            }
        ).populate('cart.product'); 

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json({ success: true, cart: user.cart });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to update cart." });
    }
};