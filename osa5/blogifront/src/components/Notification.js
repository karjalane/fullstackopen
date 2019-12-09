import React from 'react'

const Notification = ({ message }) => {
    return message.message === null
        ? null
        : message.isError === true
            ? <div className="error">
                { message.message }
            </div>
            : <div className="notification">
                { message.message }
            </div>
}

export default Notification