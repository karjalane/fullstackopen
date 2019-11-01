import React from 'react'

/* Handle and render different types of notifications */
const Notification = ({ message }) => {
    if (message.message === null) {
        return null
    }
    if (message.isError === true) {
    return (
            <div className='error'>
                { message.message }
            </div>
    )} else {
        return (
            <div className='notification'>
                { message.message }
            </div>
        )
    }
}

export default Notification