import React, { useState, useEffect } from 'react';
import axios from 'axios'
import NewContact from './components/NewContact'
import FilterContact from './components/FilterContact'
import SearchContacts from './components/SearchContacts'

/* Phonebook application that let's the user 
  save and view added contacts */
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  useEffect(() => {
    axios
      .get("http://localhost:3001/contacts")
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <SearchContacts 
        newFilter={ newFilter }
        setNewFilter={ setNewFilter } />
      <h2>Add new contact</h2>
      <NewContact 
        persons={ persons }
        setPersons={ setPersons }
        newName={ newName }
        setNewName={ setNewName }
        newNumber={ newNumber }
        setNewNumber={ setNewNumber }/>
      <h2>Numbers</h2>
      <FilterContact 
        persons={ persons }
        newFilter={newFilter}/>
    </div>
  )
}

export default App