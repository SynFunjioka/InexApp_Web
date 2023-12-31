const { getAll, create, logicDelete } = require('../../services/transaction.service');

const transactionController = {
    async getTransactions(req, res){
        if (!req.user) {
            return res.status(401).json({ messagge: 'No authorization' });
        }

        try {
            const transactions = await getAll(req.query);
            console.log('transaction in controler', transactions);
            
            res.json(transactions);
        } catch (error) {
            // console.log('My error', error);
            res.status(500).json({ message: "Error al obtener las transacciones", error })
        }
    },

    async createTransaction(req, res){
        if (!req.user) {
            return res.status(401).json({ messagge: 'No authorization' });
        }
        try {
            const newTransaction = await create(req.body);
            res.json(newTransaction)
        } catch (error) {
            res.status(500).json({message: "Error al crear transaccion", error})
        }
    },

    async deleteTransaction(req, res) {
        if (!req.user) {
            return res.status(401).json({messagge: 'No authorization'});
        }
        try {
            console.log('req.id', req.params.id)
            const deletedTransaction = await logicDelete(req.params.id);
            res.json(deletedTransaction)
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar transaccion", error })
        }
    }

}

module.exports = transactionController;