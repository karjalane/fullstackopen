const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const morgan = require('morgan')

const Contact = require('./models/contact')

app.use(bodyParser.json())
const cors = require('cors')

app.use(cors())

// Morgan spec
morgan.token('body', (req, res) => {
    if (req.method === 'POST') { 
        return JSON.stringify(req.body)
    } else {
        return ''
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// app.use(morgan('tiny'))
// app.use(morgan(':body'))

/*
// Data
let contacts = [
    {
        name: 'Santeri Kinnunen',
        number: '123123',
        id: 1
    },
    {
        name: 'Timo Jutila', 
        number: '555555',
        id: 2
    },
    {
        name: 'Sami Kapanen',
        number: '242424',
        id: 3
    }
]
*/

app.use(express.static('build'))

// Get base url
app.get('/', (req, res) => {
    res.send('<h1>poop</h1>')
})

/*const checkID = ( ID ) => {
    const ind = contacts.findIndex(x =>
        x.id === ID)
    if (ind >= 0) {
        return true
    } return false
}

// Generate unique ID
const generateID = () => {
    const newID = contacts.length > 0 
        ? Math.floor(Math.random() * 9999)
        : 0
    if (contacts.length > 9998) {
        return -1
        }
    if (checkID(newID)) {
        return generateID()
    } else { return newID }
}

// Check if name exists in database
const checkContact = ( value ) => {
    const ind = contacts.findIndex(x => 
        x.name.toLowerCase() === value.toLowerCase())
    if (ind >= 0) {
        return true
    } return false
}*/

// Add new contact
app.post('/api/persons', (req, res) => {
    const body = req.body
    //const id = generateID()

    /*if (!body.name) {
        return res.status(400).json({
            error: 'Name missing'
        })
    }
    if (!body.number) {
        return res.status(400).json({
            error: 'Number missing'
        })
    }
    if (id < 0) {
        return res.status(400).json({
            error: 'Database full'
        })
    }
    if (checkContact(body.name)) {
        return res.status(400).json({
            error: 'Name needs to be unique'
        })
    }*/

    const contact =  new Contact({
        name: body.name,
        number: body.number,
    })

    contact.save().then(savedContact => {
        res.json(savedContact.toJSON())
    })
})

// Get all contacts
app.get('/api/persons', (req, res) => {
    Contact.find( {} ).then(contacts => {
        res.json(contacts.map(contact => contact.toJSON()))
    })
})

// Get single contact
app.get('/api/persons/:id', (req, res, next) => {
    Contact.findById(req.params.id)
        .then(contact => {
            if (contact) {
                res.json(contact.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const contact = {
        name: body.name,
        number: body.number
    }

    Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
        .then(updatedContact => {
            res.json(updatedContact.toJSON())
        })
        .catch(error => next(error))
})

// Delete single contact
app.delete('/api/persons/:id', (req, res, next) => {
    Contact.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

// Get info
app.get('/info', (req, res) => {
    const date = new Date()
    
    Contact.countDocuments().then((a) => {
        res.status(200).send(
            `<div>Phonebook has info for ${a} people</div>
            <br />
            <div>${date}</div>`)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'Malformatted ID' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
