import React, { useState, useEffect } from 'react';
import NewContact from './components/NewContact'
import FilterContact from './components/FilterContact'
import SearchContacts from './components/SearchContacts'
import contactService from './services/contacts'
import Notification from './components/Notification'

/* Phonebook application that let's the user 
  save and view added contacts */
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  /* Notification has a message (string or null) and 
  and boolean value of isError */
  const [notification, setNotification] = useState({
    message: null,
    isError: false
  })
  
  /* Fetch data from server */
  useEffect(() => {
    contactService
      .getAll()
      .then(initContact => {
        setPersons(initContact)
      })
  }, [])

  /* Delete contact */
  const deleteHandler = (id) => {
    const contact = persons.find(c => c.id === id)
    if (window.confirm(`Delete ${contact.name}?`)) {
      contactService
      .deleteContact(id)
      .then(() => {
        setNotification({ message: `${contact.name} deleted`, isError: false})
        setTimeout(() => {
          setNotification({ ...notification, message: null})
        }, 3000)
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(() => {
        setNotification(
          { message: `${contact.name} already deleted`, isError: true}
        )
        setTimeout(() => {
          setNotification(
            { message: null, isError: false}
          )
        }, 3000)
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <SearchContacts 
        newFilter={ newFilter }
        setNewFilter={ setNewFilter } />
      <h2>Add new contact</h2>
      <div className='overlay'><Notification message={ notification } /></div>
      <NewContact 
        persons={ persons }
        setPersons={ setPersons }
        newName={ newName }
        setNewName={ setNewName }
        newNumber={ newNumber }
        setNewNumber={ setNewNumber }
        notification={ notification } 
        setNotification={ setNotification }/>
      <h2>Numbers</h2>
      <FilterContact 
        persons={ persons }
        newFilter={newFilter}
        toggleDelete={ deleteHandler }/>
    </div>
  )
}

export default App