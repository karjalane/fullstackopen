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
import User from './components/User'
import Togglable from './components/Togglable'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userbaseReducer'
import { login } from './reducers/userReducer'
import Blog from './components/Blog'

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

    const userById = (id) => {
        return props.userbase.find(u => u.id === id)
    }

    const blogById = (id) => {
        return props.blogs.find(b => b.id === id)
    }

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
            <Route exact path='/users/:id' render={({ match }) =>
                <User user={ userById(match.params.id) }/>
            }/>
            <Route exact path='/blogs/:id' render={({ match }) =>
                <Blog blog={ blogById(match.params.id) }/>
            }/>
        </Router>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user,
        userbase: state.userbase
    }
}

const mapDispatchToProps = {
    login,
    initBlogs,
    initUsers
}

export default connect(
    mapStateToProps
    , mapDispatchToProps
)(App)