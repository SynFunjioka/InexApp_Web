const {NumericDate} = require('../utils/DateFormat.util');

class Transaction {
    constructor(id, description, type, mount, date){
        this.id = id;
        this.description = description;
        this.type = type;
        this.mount = mount;
        this.date = NumericDate(date);
    }
}

/**
 * @param res The response value given from the InexAPI
 */
module.exports.ResToTransaction = (res) => {
    const { _id, description, type, mount, date } = res;
    return new Transaction(_id, description, type, mount, date);
}