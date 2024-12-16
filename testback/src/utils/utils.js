const { createCart } = require('../controllers/cartController');

function createUserCart() {
    createCart()
}



const generateOrderNumber = (length = 10) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let orderNumber = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        orderNumber += characters[randomIndex];
    }
    return orderNumber;
}

module.exports = {
    generateOrderNumber
};
