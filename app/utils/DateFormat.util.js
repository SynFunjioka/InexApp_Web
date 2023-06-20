const NumericDate = (stringDate) => {
    const date = new Date(stringDate);
    //📌 Arreglar lo del invalid date 
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}

module.exports = {
    NumericDate
}