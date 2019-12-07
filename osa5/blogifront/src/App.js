import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import ShowBlogs from './components/ShowBlogs'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Login from './components/Login'
import Logout from './components/Logout'

function App() {
    const [blogs, setBlogs] = useState([])
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newURL, setNewURL] = useState('')
    const [newLikes, setNewLikes] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState({
        message: null,
        isError: false
    })

    useEffect(() => {
        blogService
            .getAll()
            .then(initBlog => {
                setBlogs(initBlog)
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
                        setUsername={ setUsername }
                        password={ password }
                        setPassword={ setPassword }
                        user={ user }
                        setUser={ setUser }
                        notification={ notification }
                        setNotification={ setNotification }
                    />
                : <div>
                    <p>Logged in as { user.name }</p>
                    <Logout
                        setUser={ setUser }
                        notification={ notification }
                        setNotification={ setNotification }
                    />
                    <AddBlog
                        blogs={ blogs }
                        setBlogs={ setBlogs }
                        newTitle={ newTitle }
                        setNewTitle={ setNewTitle }
                        newAuthor={ newAuthor }
                        setNewAuthor={ setNewAuthor }
                        newURL={ newURL }
                        setNewURL={ setNewURL }
                        newLikes={ newLikes }
                        setNewLikes={ setNewLikes }
                        notification={ notification }
                        setNotification={ setNotification }
                    />                
                    <ShowBlogs
                        blogs={ blogs }
                    />
                </div>
                }
        </div>
    )
}

export default App
