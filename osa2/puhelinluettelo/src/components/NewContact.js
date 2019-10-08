import React from 'react';

/* Render a new contact
  Checks if a value is provided, it already exists 
  and if the number is numeral*/
const NewContact = ( { persons, setPersons
                    ,newName, setNewName
                    ,newNumber, setNewNumber } ) => {
    const addContact = (event) => {
        event.preventDefault()
        const contactObj = {
          id: persons.length +1,
          name: newName,
          number: newNumber
        }
        if (newName.length < 1 || newNumber.length < 1) {
          window.alert(`Name or number is missing`)
        } else if (checkContact(newName)) {
          window.alert(`${ newName } is already added. 
          Try the search function`)
        } else if (!newNumber.match(/[0-9/+/-]/ig)) {
          window.alert(`Please provide a number`)
        } else {
          setPersons(persons.concat(contactObj))
          setNewName('')
          setNewNumber('')
        }
      }
    
      const checkContact = ( value ) => {
        const ind = persons.findIndex(x => 
          x.name.toLowerCase() === value.toLowerCase())
        if (ind >= 0) {
          return true
        } return false
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