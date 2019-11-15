const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

logger.info('connecting to', config.mongoURL)

mongoose.connect(config.mongoURL, { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch((error) => {
        logger.error('Error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app