import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import ShowBlogs from './components/ShowBlogs'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Login from './components/Login'
import Logout from './components/Logout'
import Togglable from './components/Togglable'
import { useField } from './hooks'

function App() {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [loginVisible, setLoginVisible] = useState(false)
    const [notification, setNotification] = useState({
        message: null,
        isError: false
    })

    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    const username = useField('text')
    const password = useField('password')
    const newTitle = useField('text')
    const newAuthor = useField('text')
    const newURL = useField('url')

    const noteFormRef = React.createRef()

    useEffect(() => {
        blogService
            .getAll()
            .then(initBlog => {
                setBlogs(initBlog.sort((x,y) => y.likes - x.likes))
            })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    return (
        <div>
            <h1>Blogz</h1>
            <div className="overlay"><Notification message={ notification }/></div>

            { user === null
                ?    <Login
                    username={ username }
                    password={ password }
                    setUser={ setUser }
                    setNotification={ setNotification }
                    setLoginVisible={ setLoginVisible }
                    hideWhenVisible={ hideWhenVisible }
                    showWhenVisible={ showWhenVisible }
                />
                : <div>
                    <p>Logged in as { user.name }</p>
                    <Logout
                        setUser={ setUser }
                        setLoginVisible={ setLoginVisible }
                        notification={ notification }
                        setNotification={ setNotification }
                    />
                    <br />
                    <Togglable buttonLabel='Add blog' ref={ noteFormRef }>
                        <AddBlog
                            blogs={ blogs }
                            setBlogs={ setBlogs }
                            newTitle={ newTitle }
                            newAuthor={ newAuthor }
                            newURL={ newURL }
                            notification={ notification }
                            setNotification={ setNotification }
                            noteFormRef={ noteFormRef }
                        />
                    </Togglable>
                    <ShowBlogs
                        blogs={ blogs }
                        setBlogs={ setBlogs }
                        user={ user }
                        notification={ notification }
                        setNotification={ setNotification }
                    />
                </div>
            }
        </div>
    )
}

export default App
