import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Login = ({ username, setUsername
    ,password, setPassword
    ,setUser
    ,setNotification
    ,setLoginVisible
    ,hideWhenVisible, showWhenVisible }) => {

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(
                'loggedBlogUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exp) {
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
                            type="text"
                            value={ username }
                            name="username"
                            onChange={({ target }) => setUsername(target.value) }
                        />
                    </div>
                    <div>
                        Password:
                        <input
                            type="password"
                            value={ password }
                            name="password"
                            onChange={({ target }) => setPassword(target.value) }
                        />
                    </div>
                    <button onClick={() => setLoginVisible(false)} type="submit">Log in</button>
                </form>
                <button onClick={() => setLoginVisible(false)}>Cancel</button>
            </div>
        </div>
    )
}

Login.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default Login