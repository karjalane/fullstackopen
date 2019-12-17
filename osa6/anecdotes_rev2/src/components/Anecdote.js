import React from 'react'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            { anecdote.content }
            <div>
                has { anecdote.votes } votes
            </div>
            <button onClick={ handleClick }>
                Vote
            </button>
        </div>
    )
}

export default Anecdote