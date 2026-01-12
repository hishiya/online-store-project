const UserModel = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (user.role !== 'admin') { 
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error checking permissions' });
    }
}