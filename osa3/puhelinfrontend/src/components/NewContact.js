import React from 'react'
import contactService from './../services/contacts'

/* Render a new contact
  Checks if a value is provided, it already exists 
  and if the number is numeral*/
const NewContact = ( { persons, setPersons
                    ,newName, setNewName
                    ,newNumber, setNewNumber
                    ,notification, setNotification } ) => {
    const addContact = (event) => {
        event.preventDefault()
        const contactObj = {
            name: newName,
            number: newNumber
        }
        if (newName.length < 1 || newNumber.length < 1) {
            window.alert(`Name or number is missing`)
        } else if (checkContact(newName) 
                    && window.confirm(
                    `${newName} already exists. Want to update the number?`)) {
            const id = persons.find(p => p.name === newName).id            
            updateContact(id, contactObj)
        } else if (!newNumber.match(/[0-9/+/-]/ig)) {
            window.alert(`Please provide a number`)
        } else {
            newContact(contactObj)
        }
    }
    
      /* Check if the contact exists */
    const checkContact = ( value ) => {
        const ind = persons.findIndex(x => 
            x.name.toLowerCase() === value.toLowerCase())
        if (ind >= 0) {
            return true
        } return false
    }

    /* Add new contact to server */
    const newContact = (contactObj) => {
        contactService
            .create(contactObj)
            .then(data => {
                setNotification(
                    { message: `${contactObj.name} added`, isError: false}
                )
                setTimeout(() => {
                    setNotification({ ...notification, message: null })
                }, 3000)
                setPersons(persons.concat(data))
                setNewName('')
                setNewNumber('')
            })
            .catch((error) => {
                console.log(error.response)
                setNotification(
                    { message: error.response.data.error, isError: true }
                )
                setTimeout(() => {
                    setNotification({ message: null, isError: false })
                }, 3000)
            })
    }

    /* Update contact */
    const updateContact = (id, contactObj) => {
        contactService
        .update(id, contactObj)
        .then(newContact => {
            setNotification(
                { message: `${contactObj.name} updated`, isError: false }
            )
            setTimeout(() => {
                setNotification({ ...notification, message: null})
            }, 3000)
            setPersons(persons.map(contact => 
                contact.id !== id 
                ? contact 
                : newContact))
            setNewName('')
            setNewNumber('')
            })
        .catch(() => {
            setNotification(
                { message: `${contactObj.name} already deleted`, isError: true }
            )
            setTimeout(() => {
                setNotification({ message: null, isError: false })
            }, 3000)
            setPersons(persons.filter(p => p.id !== id))
        })
    }

    const handleContactChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
    <form onSubmit={ addContact }>
        <div>
        Name: 
            <input 
                value={ newName }
                onChange={ handleContactChange } />
        </div>
        <div>
        Number: 
            <input 
                value={ newNumber }
                onChange={ handleNumberChange } />
        </div>
        <div>
            <button type="submit">Add</button>
        </div>
    </form>
    )
}

export default NewContact