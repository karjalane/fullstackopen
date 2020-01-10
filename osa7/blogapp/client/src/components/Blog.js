import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { voteBlog, deleteBlog, comment } from '../reducers/blogReducer'
import { notification } from '../reducers/notificationReducer'
import { Segment, Button, Header, Label, Icon, Container, Form, Table, TextArea } from 'semantic-ui-react'

const Blog = (props) => {
    if (props.blog === undefined) {
        return <div></div>
    }

    const { title, author, url, likes, user, comments } = props.blog
    console.log('Blog', comments)

    const handleLike = () => {
        props.voteBlog(props.blog)
        props.notification(`You liked '${ title }'`, false, 3)
    }

    const handleRemove = () => {
        if (window.confirm(`Confirm to delete: ${ title }`)) {
            props.deleteBlog(props.blog)
            props.notification(`'${ title }' deleted`, false, 3)
            props.history.push('/')
        }
    }

    const handleComment = (event) => {
        const content = event.target.comment.value
        props.comment(content, props.blog.id)
        event.target.comment.value = ''
    }

    return user.id === props.loggedUser.id
        ? <div>
            <Segment>
                <Header>{ title }</Header>
                <Container as='h5'>by { author }</Container>
                <p><Container fluid href={ url }>{ url }</Container></p>
                <p className='addedby'>Added by you</p>
                <Button as='div' labelPosition='right'>
                    <Button onClick={ handleLike } color='red'>
                        <Icon name='heart' />
                        Like
                    </Button>
                    <Label as='a' basic color='red' pointing='left'>
                        { likes }
                    </Label>
                </Button>
                <Button onClick={ handleRemove } color='grey'>
                    <Icon name='trash alternate' />
                    Remove
                </Button>
                <Header sub>Comments</Header>
                <Table striped>
                    <Table.Body>
                        { comments.map(c =>
                            <Table.Row key={ c.id }>
                                <Table.Cell>{ c.content }</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
                <Form header='Add a comment' onSubmit={ handleComment }>
                    <Form.Field>
                        <TextArea name='comment' />
                    </Form.Field>
                    <Button type='submit'>Post</Button>
                </Form>
            </Segment>
        </div>
        : <div>
            <Segment>
                <Header>{ title }</Header>
                <Container as='h5'>by { author }</Container>
                <p><Container fluid href={ url }>{ url }</Container></p>
                <p className='addedby'>Added by { user.username }</p>
                <Button as='div' labelPosition='right'>
                    <Button onClick={ handleLike } color='red'>
                        <Icon name='heart' />
                        Like
                    </Button>
                    <Label as='a' basic color='red' pointing='left'>
                        { likes }
                    </Label>
                </Button>
                <Header sub>Comments</Header>
                <Table striped>
                    <Table.Body>
                        { comments.map(c =>
                            <Table.Row key={ c.id }>
                                <Table.Cell>{ c.content }</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
                <Form header='Add a comment' onSubmit={ handleComment }>
                    <Form.Field>
                        <TextArea name='comment' />
                    </Form.Field>
                    <Button type='submit'>Post</Button>
                </Form>
            </Segment>
        </div>
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        loggedUser: state.user
    }
}

const mapDispatchToProps = {
    voteBlog,
    deleteBlog,
    notification,
    comment
}

export default connect(
    mapStateToProps
    , mapDispatchToProps
)(withRouter(Blog))