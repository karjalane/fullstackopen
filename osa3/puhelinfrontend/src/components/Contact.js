import React from 'react'

/* Render the list of contact */
const Contact = ({ id, name, number, toggleDelete }) => 
    <div className='contact'>
        { name } 
        { ' ' }
        <b>{ number }</b>
        { ' ' }
        <button onClick={ toggleDelete }>
            Delete
        </button>
    </div>

export default Contact