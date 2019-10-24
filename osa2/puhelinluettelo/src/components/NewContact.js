import React from 'react'
import contactService from './../services/contacts'

/* Render a new contact
  Checks if a value is provided, it already exists 
  and if the number is numeral*/
const NewContact = ( { persons, setPersons
                    ,newName, setNewName
                    ,newNumber, setNewNumber } ) => {
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
          contactService
            .create(contactObj)
            .then(data => {
              setPersons(persons.concat(data))
              setNewName('')
              setNewNumber('')
            })
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
      
      /* Update contact */
      const updateContact = (id, contactObj) => {
        contactService
        .update(id, contactObj)
        .then(newContact => {
          setPersons(persons.map(contact => 
            contact.id !== id 
            ? contact 
            : newContact))
          setNewName('')
          setNewNumber('')
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
    )}

export default NewContact