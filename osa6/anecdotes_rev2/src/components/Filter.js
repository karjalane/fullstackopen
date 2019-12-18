import React from 'react'
import { filterChange } from '../reducers/filterReducer'

const Filter = ({ store }) => {
    const handleChange = (event) => {
        store.dispatch(filterChange(event.target.value))
    }
    const style = {
        marginBottom: 10,
        marginTop: 10
    }

    return (
        <div style={ style }>
            Filter anecdotes <input onChange={ handleChange } />
        </div>
    )
}

export default Filter