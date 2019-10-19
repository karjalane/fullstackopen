import React from 'react'

/* Search for countries */
const Search = ( { filter, setFilter } ) => {

    /* Set the filter hook to a current typed value */
    const handleFilter = (event) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            Search: {' '}
            <input placeholder='Country name...'
                value={ filter }
                onChange={ handleFilter } />
        </div>
    )
}

export default Search