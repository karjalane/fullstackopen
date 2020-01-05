import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { initBlogs } from '../reducers/blogReducer'
import { notification } from '../reducers/notificationReducer'
import { login, logout } from '../reducers/userReducer'
import { Form, Grid, Header, Button, Segment, GridColumn } from 'semantic-ui-react'

const Login = (props) => {

    const handleLogin = async (event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value

        try {
            const user = await loginService.login({
                username,
                password
            })

            window.localStorage.setItem(
                'loggedBlogUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            props.login(user)
            props.initBlogs()
            props.notification(`Welcome ${ user.name }`, false, 3)
            props.history.push('/')
        } catch (exp) {
            console.log(exp)
            props.notification('Wrong username or password', true, 3)
        }
    }

    return (
        <Grid textAlign='center' style={ { height: '100%' } } verticalAlign='middle'>
            <GridColumn style={ { maxWidth: 450 } }>
                <Header as='h2' color='grey' textAlign='center'>
                    Log in to Blogz
                </Header>
                <Form onSubmit={ handleLogin } size='large'>
                    <Segment stacked>
                        <Form.Input
                            fluid
                            name='username' 
                            icon='user'
                            iconPosition='left'
                            placeholder='Username'
                        />
                        <Form.Input
                            fluid
                            name='password'
                            icon='lock'
                            iconPosition='left'
                            placeholder='password'
                            type='password'
                        />
                        <Button
                            fluid
                            type='submit'
                            color='pink'
                            size='large'
                        >
                            Log in
                        </Button>
                    </Segment>
                </Form>
            </GridColumn>
        </Grid>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    initBlogs,
    login,
    logout,
    notification
}

const LoginHistory = withRouter(Login)

export default connect(
    mapStateToProps
    , mapDispatchToProps
)(LoginHistory)