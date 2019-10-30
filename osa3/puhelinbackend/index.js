const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
app.use(morgan('tiny'))


/*
const requestLogger = (req, res, next) => {
    console.log('Method:', req.method)
    console.log('Path:  ', req.path)
    console.log('Body:  ', req.body)
    console.log('---------')
    next()
}
 
app.use(requestLogger)
*/

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

app.get('/', (reg, res) => {
    res.send('<h1>poop</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(contacts)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const contact = contacts.find(c => c.id === id)
    if (contact) {
        res.json(contact) 
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    const amount = contacts.length
    const date = new Date()

    res.send(`
        <div>Phonebook has info for ${amount} people</div>
        <br />
        <div>${date}</div>`)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    contacts = contacts.filter(c => c.id !== id)
    
    res.status(204).end()
})

const generateID = () => {
    const newID = contacts.length > 0 
        ? Math.floor(Math.random() * 9999)
        : 0
    return newID
}

const checkContact = ( value ) => {
    const ind = contacts.findIndex(x => 
        x.name.toLowerCase() === value.toLowerCase())
    if (ind >= 0) {
        return true
    } return false
}

app.post('/api/persons', (req, res) => {
    const body = req.body

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
    if (checkContact(body.name)) {
        return res.status(400).json({
            error: 'Name needs to be unique'
        })
    }

    const contact = {
        name: body.name,
        number: body.number,
        id: generateID()
    }

    contacts = contacts.concat(contact)

    res.json(contact)
})

/*
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
*/

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
