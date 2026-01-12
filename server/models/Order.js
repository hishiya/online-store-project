const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            count: {
                type: Number,
                default: 1,
            },
            price: {
                type: Number,
                required: true,
            }
        }
    ],

    totalPrice: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        default: 'pending',
    },

    fullName: { 
        type: String, 
        required: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    comment: { 
        type: String 
    },

}, {
    timestamps: true,
});

module.exports = mongoose.model('Order', OrderSchema);