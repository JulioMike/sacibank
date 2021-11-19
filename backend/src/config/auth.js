const jwt = require('jsonwebtoken')

const secret = 'julio-secret-key';

module.exports = {
    Sign: payload => jwt.sign(payload, secret, { expiresIn:3600}),
    Decode: token => jwt.verify(token, secret)
}
