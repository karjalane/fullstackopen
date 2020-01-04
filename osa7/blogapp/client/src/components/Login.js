import React, { useState } from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import loginService from '../services/login'
import Logout from '../components/Logout'
import { initBlogs } from '../reducers/blogReducer'
import { notification } from '../reducers/notificationReducer'
import { login, logout } from '../reducers/userReducer'

const Login = (props) => {
    const [loginVisible, setLoginVisible] = useState(false)

    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    const handleLogin = async (event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value

        try {
            const user = await loginService.login({
                username,
                password
            })

            window.localStorage.setItem(
                'loggedBlogUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            props.login(user)
            props.initBlogs()
            props.notification(`Welcome ${ user.name }`, false, 3)
        } catch (exp) {
            console.log(exp)
            props.notification('Wrong username or password', true, 3)
        }
    }

    if (props.user) {
        return (
            <div>
                <p>Logged in as { props.user.name }</p>
                <Logout />
            </div>
        )
    }

    return (
        <div>
            <h2 className="loginheader">Login</h2>
            <div style={ hideWhenVisible }>
                <button onClick={() => setLoginVisible(true)}>Log in</button>
            </div>
            <div style={ showWhenVisible }>
                <form onSubmit={ handleLogin }>
                    <div>
                        Username:
                        <input name='username'/>
                    </div>
                    <div>
                        Password:
                        <input name='password'/>
                    </div>
                    <button onClick={() => setLoginVisible(true)} type="submit">Log in</button>
                </form>
                <button onClick={() => setLoginVisible(false)}>Cancel</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    initBlogs,
    login,
    logout,
    notification
}

export default connect(
    mapStateToProps
    , mapDispatchToProps
)(Login)