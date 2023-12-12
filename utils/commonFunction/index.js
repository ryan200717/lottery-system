const crypto = require('node:crypto');

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getRandomNumberByCrypto = (min, max) => {
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    const randomNumber = randomBuffer[0] / (0xffffffff + 1); // relevant to 2^32 maximum value of a 32 bit unsigned integer
    const minValue = Math.ceil(min);
    const maxValue = Math.floor(max);
    return Math.floor(randomNumber * (maxValue - minValue + 1)) + minValue;
};

module.exports = {
    getRandomNumber,
    getRandomNumberByCrypto,
};
