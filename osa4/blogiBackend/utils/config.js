require('dotenv').config()

let PORT = process.env.PORT
let mongoURL = process.env.MONGO_URI

if (process.env.NODE_ENV === 'test') {
    mongoURL = process.env.TEST_MONGO_URI
}

module.exports = {
    mongoURL,
    PORT
}