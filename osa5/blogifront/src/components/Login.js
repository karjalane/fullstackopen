import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({ username, setUsername
                ,password, setPassword
                ,user, setUser
                ,notification, setNotification }) => {

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
                setNotification({ message: null, isError: false})
            }, 3000)
        }
    }

    return (
        <form onSubmit={ handleLogin }>
            <h2 className="loginheader">Login</h2>
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
            <button type="submit">Log in</button>
        </form>
    )
}

export default Login