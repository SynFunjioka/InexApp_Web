const { login } = require('../../services/auth.service');

const authController = {
    async loginUser(req, res) {
        try {
            const loginRes = await login(req.body);
            res.json(loginRes);
        } catch (error) {
            res.status(500).json({ message: "Error al crear transaccion", error })
        }
    },
}

module.exports = authController;