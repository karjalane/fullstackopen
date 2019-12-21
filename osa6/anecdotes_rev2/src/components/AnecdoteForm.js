import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.notification(`Added: '${content}'`, 5)
    }

    return (
        <div>
            <h3>Create new anecdote</h3>
            <form onSubmit={ addAnecdote }>
                <input name='anecdote' />
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    createAnecdote
    , notification
}

export default connect(null
    , mapDispatchToProps)
    (AnecdoteForm)