import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notification } from '../reducers/notificationReducer'
import { Form, Input, Button, Icon, Container, Segment } from 'semantic-ui-react'

const AddBlog = (props) => {
    /*const title = useField('text')
    const author = useField('text')
    const url = useField('url')*/

    const create = async (event) => {
        try {
            event.preventDefault()
            const content = {
                title: event.target.title.value,
                author: event.target.author.value,
                url: event.target.url.value
            }
            event.target.title.value = ''
            event.target.author.value = ''
            event.target.url.value = ''
            props.createBlog(content)
            props.notification(`Added new blog: ${ content.title } by ${ content.author }`, false, 3)
        } catch(exp) {
            props.notification(exp.response.data.error, true, 3)
        }
    }

    return (
        <div>
            <Container>
                <Segment>
                    <Form onSubmit={ create }>
                        <h4 className="addheader">Add new blog</h4>
                        <Form.Field>
                            <label>Title:</label>
                            <Input type='text' name='title'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Author:</label>
                            <Input type='text' name='author'/>
                        </Form.Field>
                        <Form.Field>
                            <label>URL:</label>
                            <Input label='http://' type='text' name='url'/>
                        </Form.Field>
                        <Button
                            disabled={ props.user ? false : true }
                            color='green'>
                            <Icon name='add' />
                                Add
                        </Button>
                    </Form>
                </Segment>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    createBlog
    , notification
}

export default connect(
    mapStateToProps
    , mapDispatchToProps
)(AddBlog)