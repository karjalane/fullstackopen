import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import blogService from './services/blogs'
import ShowBlogs from './components/ShowBlogs'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Login from './components/Login'
import Togglable from './components/Togglable'
import { initBlogs } from './reducers/blogReducer'
import { login } from './reducers/userReducer'

const App = (props) => {
    const noteFormRef = React.createRef()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            props.login(user)
            blogService.setToken(user.token)
            props.initBlogs()
        }
    }, [])

    return (
        <div>
            <h1>Blogz</h1>
            <div className="overlay"><Notification /></div>
            <Login />
            <Togglable buttonLabel='Add blog' ref={ noteFormRef }>
                <AddBlog />
            </Togglable>
            <ShowBlogs />
        </div>
    )
}

const mapDispatchToProps = {
    login,
    initBlogs
}

export default connect(
    null, mapDispatchToProps
)(App)