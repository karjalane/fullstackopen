import React, { useState } from 'react';
import NewContact from './components/NewContact'
import FilterContact from './components/FilterContact'
import SearchContacts from './components/SearchContacts'

/* Phonebook application that let's the user 
  save and view added contacts */
const App = ({ contacts }) => {
  const [persons, setPersons] = useState(contacts)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
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