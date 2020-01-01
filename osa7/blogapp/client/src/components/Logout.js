import React from 'react'
import blogService from '../services/blogs'

const Logout = ({ setUser, setLoginVisible
    , setNotification, notification }) => {
    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
        blogService.setToken(null)
        setLoginVisible(false)
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
            <br/>
        </div>
    )
}

export default Logout