import React from 'react';

/* Render the search function */
const SearchContacts = ( { newFilter, setNewFilter } ) => {
    
    const handleFilter = (event) => {
        console.log(event.target.value)
        setNewFilter(event.target.value)
      }
    
    return (
        <>
        Search:
        <input placeholder='Type to search...'
          value={ newFilter }
          onChange={ handleFilter } />
          </>
    )
}

export default SearchContacts