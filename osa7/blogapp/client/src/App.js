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
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userbaseReducer'
import { login } from './reducers/userReducer'
import Blog from './components/Blog'
import Menubar from './components/Menubar'
import { Container, Header, Segment } from 'semantic-ui-react'

const App = (props) => {

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
        <Container>
            <Router>
                <div className="overlay"><Notification /></div>
                <Menubar />
                <Segment inverted>
                    <Header
                        as='h1'
                        content='BLOGZ'
                    />
                </Segment>
                <Route exact path='/login' render={() => <Login/> } />
                <Route exact path='/' render={() => <AddBlog /> } />
                <Route exact path='/' render={() => <ShowBlogs /> } />
                <Route exact path='/users' render={() => <Userbase /> } />
                <Route exact path='/users/:id' render={({ match }) =>
                    <User user={ userById(match.params.id) }/>
                }/>
                <Route exact path='/blogs/:id' render={({ match }) =>
                    <Blog blog={ blogById(match.params.id) }/>
                }/>
            </Router>
        </Container>
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