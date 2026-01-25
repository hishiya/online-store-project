const Joi = require('joi');

const vacancySchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        'string.empty': 'Ім\'я є обов\'язковим.',
        'string.min': 'Ім\'я повинно містити щонайменше 3 символи.',
        'string.max': 'Ім\'я не може перевищувати 50 символів.'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email є обов\'язковим.',
        'string.email': 'Введіть коректний email.'
    }),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.empty': 'Номер телефону є обов\'язковим.',
        'string.pattern.base': 'Номер телефону повинен містити 10 цифр.'
    }),
    message: Joi.string().min(10).max(500).required().messages({
        'string.empty': 'Повідомлення є обов\'язковим.',
        'string.min': 'Повідомлення повинно містити щонайменше 10 символів.',
        'string.max': 'Повідомлення не може перевищувати 500 символів.'
    })
});

module.exports = vacancySchema;