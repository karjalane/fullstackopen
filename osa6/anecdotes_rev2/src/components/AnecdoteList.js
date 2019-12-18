import React from 'react'
import Anecdote from './Anecdote'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { voteNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {

    const handleVote = (anecdote) => {
        store.dispatch(voteAnecdote(anecdote.id))
        store.dispatch(voteNotification(anecdote.content))
        setTimeout(() => {
            store.dispatch(resetNotification())
        }, 5000)
    }

    const anecdotesToShow = (anecdotes) => {
        return store.getState().filter
            ? anecdotes.filter(a => 
                a.content.toLowerCase()
                .includes(store.getState().filter.toLowerCase()))
            : anecdotes
    }

    return (
        <div>
            { anecdotesToShow(store.getState().anecdotes)
                .sort((a,b) => b.votes - a.votes)
                .map(anecdote =>
                <div key ={ anecdote.id }>
                    <br></br>
                    <Anecdote
                        anecdote={ anecdote }
                        handleClick={() =>
                            handleVote(anecdote)
                        }
                    />
                </div>
            )}
        </div>
    )
}

export default AnecdoteList