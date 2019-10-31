import React from 'react'
import Contact from './Contact'

/* Render the added contacts to screen */
const FilterContact = ( { persons, newFilter, toggleDelete } ) => {

    const contactsToShow = () =>  
      persons.filter(person => {
        let theFilter = person.name.toLowerCase()
        let theSearch = newFilter.toLowerCase()
        return theFilter.includes(theSearch)
      })
  
    const rows = () => {
      if(contactsToShow().length < 1) {
        return <div>No contacts matching the criteria</div>
      }
      return contactsToShow().map(contact =>
        <Contact 
          key={ contact.id }
          id={ contact.id }
          name={ contact.name }
          number={ contact.number }
          toggleDelete={ () => toggleDelete(contact.id) } />
      )
    }

    return (
        <ul> { rows() } </ul>
    )
}

export default FilterContact