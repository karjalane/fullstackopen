import React from 'react'
import Anecdote from './Anecdote'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdotes = ({ store }) => {
    return (
        <div>
            <h2>Anecdotes</h2>
            {store.getState()
                .sort((a,b) => b.votes - a.votes)
                .map(anecdote =>
                <div key ={ anecdote.id }>
                    <br></br>
                    <Anecdote
                        anecdote={ anecdote }
                        handleClick={() =>
                            store.dispatch(voteAnecdote(anecdote.id))
                        }
                    />
                </div>
            )}
        </div>
    )
}

export default Anecdotes