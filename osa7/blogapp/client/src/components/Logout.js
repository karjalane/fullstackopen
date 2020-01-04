import React from 'react'
import blogService from '../services/blogs'
import { logout } from '../reducers/userReducer'
import { notification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Logout = (props) => {

    const handleLogout = () => {
        window.localStorage.clear()
        props.logout(null)
        blogService.setToken(null)
        props.notification(
            'Logged out', false, 3
        )
    }

    return (
        <div>
            <button onClick={ () => handleLogout() }>Log out</button>
            <br/>
        </div>
    )
}

const mapDispatchToProps = {
    logout,
    notification
}

export default connect(
    null
    , mapDispatchToProps
)(Logout)