const mongoose = require('mongoose');

const VacancySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,  
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },

    message: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        default: 'new',
        enum: ['new', 'reviewed', 'accepted', 'rejected']
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Vacancy', VacancySchema);