import React from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { login, logout } from '../reducers/userReducer'
import { notification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { Menu, Container } from 'semantic-ui-react'


const Menubar = (props) => {

    const handleLogout = () => {
        window.localStorage.clear()
        props.logout()
        blogService.setToken(null)
        props.notification(
            'Logged out', false, 3
        )
    }

    return (
        <Menu inverted size='large'>
            <Container>
                <Menu.Item as={ Link } to='/'>
                    Blogs
                </Menu.Item>
                <Menu.Item as={ Link } to='/users'>
                    Users
                </Menu.Item>
                <Menu.Menu position='right'>
                    { props.user
                        ? (
                            <>
                                <Menu.Item as={ Link } to={ `/users/${ props.user.id }` }>
                                    { props.user.username }
                                </Menu.Item>
                                <Menu.Item onClick={ handleLogout }>
                                    Logout
                                </Menu.Item>
                            </>
                        )
                        : (
                            <Menu.Item as={ Link } to='/login'>
                                Log in
                            </Menu.Item>
                        )}
                </Menu.Menu>
            </Container>
        </Menu>
    )
}

const mapSteteToProps = (state) => {
    return {
        user: state.user,
        userbase: state.userbase
    }
}

const mapDispatchToProps = {
    login,
    logout,
    notification
}

export default connect(
    mapSteteToProps
    , mapDispatchToProps
)(Menubar)