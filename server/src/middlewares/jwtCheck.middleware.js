require('dotenv').config()
const { verify } = require('jsonwebtoken')

const checkJWTSign = (req, res, next) => {
    const { headers: { authorization } } = req

    if (authorization) {
        const token = authorization.split(' ')[1]

        verify(token, process.env.JWT_SECRET, (e) => {
            if (e) {
                return res.status(403).send({
                    message: 'Not authorized!',
                    e
                })
            }
        })
        return next()
    }

    return res.status(403).send({
        message: 'Not authorized!'
    })
}

module.exports = { checkJWTSign }