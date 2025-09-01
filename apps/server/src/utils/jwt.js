const jwt = require('jsonwebtoken');
const { ENV } = require('./env.js');

function signData(data) {
    const token = jwt.sign(
        {
            data,
        },
        ENV.JWT_SECRET,
        {
            expiresIn: '1h',
        }
    );

    return token;
}

function decodeData(token) {
    try {
        const decodedData = jwt.verify(token, ENV.JWT_SECRET);
        return decodedData;
    } catch (error) {
        throw error;
    }
}

module.exports = { signData, decodeData };
