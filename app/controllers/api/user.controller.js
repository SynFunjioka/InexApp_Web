const { GetByID } = require('../../services/user.service');

const userController = {
    async getUser(req, res) {
        try {
            const userRes = await GetByID(req.params.id);
            res.json(userRes);
        } catch (error) {
            res.status(500).json({ message: "Error al crear transaccion", error })
        }
    },
}

module.exports = userController;