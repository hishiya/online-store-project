const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,  
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    },

    avatarUrl: String,

    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
}, {
    timestamps: true,
})

module.exports = mongoose.model('User', UserSchema);