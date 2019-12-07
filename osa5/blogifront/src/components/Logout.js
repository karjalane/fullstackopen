import React from 'react'
import blogService from '../services/blogs'

const Logout = ({ setUser, setNotification, notification }) => {
    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
        blogService.setToken(null)
        setNotification(
            { message: 'Logged out', isError: false }
        )
        setTimeout(() => {
            setNotification({ ...notification, message: null })
        }, 3000)
    }

    return (
        <div>
            <button onClick={ () => handleLogout() }>Log out</button>
        </div>
    )
}

export default Logout