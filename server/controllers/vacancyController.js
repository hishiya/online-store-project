const VacancyModel = require('../models/Vacancy');
const vacancySchema = require('../validators/vacancyValidator');

exports.create = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        
        const { error } = vacancySchema.validate({ name, email, phone, message });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const doc = new VacancyModel({
            name,
            email,
            phone,
            message
        });

        const vacancy = await doc.save();
        res.status(201).json({
            success: true,
            message: 'Ми отримали вашу заявку. Дякуємо за інтерес до нашої команди!',
            vacancy
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Помилка сервера. Спробуйте ще раз пізніше.'
        })
    }
}

exports.getAll = async (req, res) => {
    try {
        const vacancies = await VacancyModel.find().sort({ createdAt: -1 });
        res.json(vacancies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Не вдалося отримати заявки.' });
    }
}

exports.getOne = async (req, res) => {
    try {
        const vacancyId = req.params.id;
        const vacancy = await VacancyModel.findById(vacancyId);

        if (!vacancy) {
            return res.status(404).json({ message: 'Заявка не знайдена.' });
        }

        res.json(vacancy);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Помилка сервера. Не вдалося отримати заявку.' });
    }
}

exports.updateStatus = async (req, res) => {
    try {
        const vacancyId = req.params.id;
        const { status } = req.body;

        const vacancy = await VacancyModel.findByIdAndUpdate(
            vacancyId,
            { status },
            { new: true }
        );

        if (!vacancy) {
            return res.status(404).json({ message: 'Заявка не знайдена.' });
        }

        res.json({
            success: true,
            message: 'Статус заявки оновлено.',
            vacancy
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Помилка сервера. Не вдалося оновити статус заявки.' });
    }
}

exports.remove = async (req, res) => {
    try {
        const vacancyId = req.params.id;
        const vacancy = await VacancyModel.findByIdAndDelete(vacancyId);
        
        if (!vacancy) {
            return res.status(404).json({ message: 'Заявка не знайдена.' });
        }

        res.json({
            success: true,
            message: 'Заявка успішно видалена.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Помилка сервера. Не вдалося видалити заявку.' });
    }
}