import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
    BrowserRouter as Router
    , Route
} from 'react-router-dom'
import blogService from './services/blogs'
import ShowBlogs from './components/ShowBlogs'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Login from './components/Login'
import Userbase from './components/Userbase'
import Togglable from './components/Togglable'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userbaseReducer'
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
            props.initUsers()
        }
    }, [])

    return (
        <Router>
            <h1>Blogz</h1>
            <div className="overlay"><Notification /></div>
            <Route exact path='/' render={() => <Login/> } />
            <Route exact path='/' render={() => <Togglable buttonLabel='Add blog' ref={ noteFormRef }>
                <Route exact path='/' render={() => <AddBlog /> } />
            </Togglable>} />
            <Route exact path='/' render={() => <ShowBlogs /> } />
            <Route exact path='/users' render={() => <Userbase /> } />
        </Router>
    )
}

const mapDispatchToProps = {
    login,
    initBlogs,
    initUsers
}

export default connect(
    null, mapDispatchToProps
)(App)