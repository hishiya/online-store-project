const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPercentage: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        default: 0,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
}, {
    timestamps: true,
})

module.exports = mongoose.model('Product', ProductSchema);