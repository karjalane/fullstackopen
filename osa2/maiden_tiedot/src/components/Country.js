import React from 'react'

/* Render the name of country and details button
trying to figure out how to make this to a link */
const Country = ({ name, linkHandler }) =>
    <div>
        <li 
            onClick={ linkHandler }
            country={ name } >
            { name } 
            <button
                onClick={ linkHandler }
                country={ name } >
            Info
            </button>
        </li>
    </div>


export default Country