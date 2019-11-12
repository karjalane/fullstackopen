require('dotenv').config()

let PORT = process.env.PORT
let mongoURL = process.env.MONGO_URI

module.exports = {
    mongoURL,
    PORT
}