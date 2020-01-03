import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import ShowBlogs from './components/ShowBlogs'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Login from './components/Login'
import Logout from './components/Logout'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { initBlogs } from './reducers/blogReducer'

const App = (props) => {
    const [user, setUser] = useState(null)
    const [loginVisible, setLoginVisible] = useState(false)

    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    const username = useField('text')
    const password = useField('password')

    const noteFormRef = React.createRef()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
            props.initBlogs()
        }
    }, [])

    return (
        <div>
            <h1>Blogz</h1>
            <div className="overlay"><Notification /></div>

            { user === null
                ?    <Login
                    username={ username }
                    password={ password }
                    setUser={ setUser }
                    setLoginVisible={ setLoginVisible }
                    hideWhenVisible={ hideWhenVisible }
                    showWhenVisible={ showWhenVisible }
                />
                : <div>
                    <p>Logged in as { user.name }</p>
                    <Logout
                        setUser={ setUser }
                        setLoginVisible={ setLoginVisible }
                    />
                    <br />
                    <Togglable buttonLabel='Add blog' ref={ noteFormRef }>
                        <AddBlog />
                    </Togglable>
                    <ShowBlogs />
                </div>
            }
        </div>
    )
}

export default connect(
    null, { initBlogs }
)(App)