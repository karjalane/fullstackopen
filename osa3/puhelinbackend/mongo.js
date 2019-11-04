const mongoose = require('mongoose')

if ( process.argv.length < 3 ) {
    console.log('Please provide a password as an argument')
    process.exit(1)
}

const password = process.argv[2]

const url = 
    `mongodb+srv://noteuser:${ password }@fsonotes-wsako.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Database connected'))
    .catch(err => {
        console.log(`Database connection error: ${err.message}`)
    })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if ( process.argv.length === 3 ) {
    Contact.find({}).then(result => {
        console.log('Phonebook:')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
        console.log('Database disconnected')
    })
}

if ( process.argv.length > 3 ) {
    const contact = new Contact({
        name: process.argv[3],
        number: process.argv[4],
    })

    contact.save().then(response => {
        console.log('Contact saved');
        mongoose.connection.close();
        console.log('Database disconnected');
    })
}