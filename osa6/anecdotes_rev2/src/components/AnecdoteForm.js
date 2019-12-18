import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addAnecdoteNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        props.store.dispatch(
            createAnecdote(content)
        )
        props.store.dispatch(
            addAnecdoteNotification(content)
        )
        event.target.anecdote.value = ''
        setTimeout(() => {
            props.store.dispatch(resetNotification())
        }, 5000)
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

export default AnecdoteForm