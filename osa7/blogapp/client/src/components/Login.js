import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Login = ({ username
    ,password
    ,setUser
    ,setNotification
    ,setLoginVisible
    ,hideWhenVisible, showWhenVisible }) => {

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: username.value, password: password.value
            })

            window.localStorage.setItem(
                'loggedBlogUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            username.reset()
            password.reset()
        } catch (exp) {
            password.reset()
            setNotification(
                { message: exp.response.data.error, isError: true }
            )
            setTimeout(() => {
                setNotification({ message: null, isError: false })
            }, 3000)
        }
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
                        <input
                            { ...username}
                            reset={ null }
                        />
                    </div>
                    <div>
                        Password:
                        <input
                            { ...password }
                            reset={ null }
                        />
                    </div>
                    <button onClick={() => setLoginVisible(true)} type="submit">Log in</button>
                </form>
                <button onClick={() => setLoginVisible(false)}>Cancel</button>
            </div>
        </div>
    )
}

Login.propTypes = {
    username: PropTypes.object.isRequired,
    password: PropTypes.object.isRequired
}

export default Login