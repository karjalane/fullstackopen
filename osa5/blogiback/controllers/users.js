const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User
        .find({}).populate('blogs', { title: 1, author: 1, url: 1 })

    res.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (req, res, next) => {
    try {
        const body = req.body

        if (body.username === undefined || body.username.length < 3) {
            return res.status(400).json({ error: 'Provide a longer username' })
        } else if (body.password === undefined || body.password.length < 3) {
            return res.status(400).json({ error: 'Provide a longer password' })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        })

        const savedUser = await user.save()

        res.json(savedUser)
    } catch (exp) {
        next(exp)
    }
})

module.exports = usersRouter