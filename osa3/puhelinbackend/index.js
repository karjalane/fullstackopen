const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(bodyParser.json())
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

// Data
let contacts = [
    {
        id: 1,
        name: 'Santeri Kinnunen',
        number: 123123
    },
    {
        id: 2,
        name: 'Timo Jutila', 
        number: 555555
    },
    {
        id: 3,
        name: 'Sami Kapanen',
        number: 242424
    }
]

// Get base url
app.get('/', (req, res) => {
    res.send('<h1>poop</h1>')
})

// Get all contacts
app.get('/api/persons', (req, res) => {
    res.json(contacts)
})

// Get single contact
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const contact = contacts.find(c => c.id === id)
    if (contact) {
        res.json(contact) 
    } else {
        res.status(404).end()
    }
})

// Get info
app.get('/info', (req, res) => {
    const amount = contacts.length
    const date = new Date()

    res.send(`
        <div>Phonebook has info for ${amount} people</div>
        <br />
        <div>${date}</div>`)
})

// Delete single contact
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    contacts = contacts.filter(c => c.id !== id)
    
    res.status(204).end()
})

const checkID = ( ID ) => {
    const ind = contacts.findIndex(x =>
        x.id === ID)
    if (ind >= 0) {
        return true
    } return false
}

// Generate unique ID
const generateID = () => {
    const newID = contacts.length > 0 
        ? Math.floor(Math.random() * 5)
        : 0
    if (contacts.length > 4) {
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
}

// Add new contact
app.post('/api/persons', (req, res) => {
    const body = req.body
    const id = generateID()

    if (!body.name) {
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
    }

    const contact = {
        name: body.name,
        number: body.number,
        id: id
    }

    contacts = contacts.concat(contact)

    res.json(contact)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
