import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addAnecdoteNotification, resetNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        console.log(content)
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        props.createAnecdote(newAnecdote)
        props.addAnecdoteNotification(content)
        setTimeout(() => {
            props.resetNotification()
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

const mapDispatchToProps = {
    createAnecdote
    , addAnecdoteNotification
    , resetNotification
}

export default connect(null
    , mapDispatchToProps)
    (AnecdoteForm)