require('dotenv').config()
const jwt = require('jsonwebtoken')
const { omit } = require('ramda')
const { User, Token } = require('../model')

module.exports = {
    async logout({ body: { refreshToken } }, res) {
        const foundToken = await Token.findOne({ token : refreshToken })

        if (!foundToken) {
            return res.status(403).send({
                message: 'Token error!'
            })
        }

        await Token.findByIdAndDelete(foundToken._id)

        return res.status(200).send({
            message: 'Unlogin success!'
        })
    },

    async refreshToken({ body: { refreshToken } }, res) {
        if (!refreshToken) {
            return res.status(403).send({
                message: 'Token expired!'
            })
        }

        const currentToken = await Token.find({token: refreshToken})

        if (!currentToken) {
            return res.status(403).send({
                message: 'Token expired!'
            })
        }

        jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (e, user) => {
            if (e) {
                return res.status(403).send({
                    message: 'Token expired!',
                    e
                })
            }

            const accessToken = jwt.sign({
                userId: user._id,
                email: user.email,
            }, process.env.JWT_SECRET, {
                expiresIn: '7days'
            })

            return res.status(200).send({
                accessToken,
                email: user.email
            })
        })
    },

    async login({body: {email, password}}, res) {
        try {
            const foundUser = await User.findOne({email})

            if (!foundUser) {
                return res.status(403).send({
                    message: 'Login or password invalid!'
                })
            }

            // Расшифровать пароль из БД и сравнить
            const isPasswordCorrect = foundUser.password === password

            if (!isPasswordCorrect) {
                return res.status(403).send({
                    message: 'Login or password invalid!'
                })
            }

            const accessToken = jwt.sign({
                userId: foundUser._id,
                email: foundUser.email,
            }, process.env.JWT_SECRET, {
                expiresIn: '7days'
            })

            const refreshToken = jwt.sign({
                userId: foundUser._id,
                email: foundUser.email,
            }, process.env.JWT_SECRET_REFRESH)

            const foundToken = await Token.findOne({
                user: foundUser._id
            })

            if (foundToken) {
                await Token.findByIdAndUpdate(foundToken._id, { token: refreshToken })
                return res.status(200).send({
                    accessToken,
                    refreshToken,
                    email: foundUser.email,
                })

            }

            const item = new Token({token: refreshToken, user: foundUser._id });
            await item.save();

            return res.status(200).send({
                accessToken,
                refreshToken,
                email: foundUser.email,
            })

        } catch (e) {
            return res.status(403).send({
                message: 'Login or password invalid!',
                e
            })
        }
    },

    async signUp({ body: {email, password}}, res) {
        try {
            const foundUser = await User.findOne({ email })
            if (foundUser) {
                return res.status(403).send({
                    message: 'Email already exist!'
                })
            }
            const createdUser = await new User({ email, password});
            await createdUser.save();

            // create success reg email
            return res.status(200).send({
                message: 'User created!'
            })

        } catch (e) {
            return res.status(403).send({
                message: 'Login or password invalid!',
                e
            })
        }
    },
}