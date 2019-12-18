import React from 'react'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { voteNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const handleVote = (anecdote) => {
        props.voteAnecdote(anecdote.id)
        props.voteNotification(anecdote.content)
        setTimeout(() => {
            props.resetNotification()
        }, 5000)
    }

    return (
        <div>
            { props.visibleAnecdotes
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

const anecdotesToShow = ({ anecdotes, filter}) => {
    return filter
        ? anecdotes.filter(a => 
            a.content.toLowerCase()
            .includes(filter.toLowerCase()))
        : anecdotes
}

const mapStateToProps = (state) => {
    return {
        visibleAnecdotes: anecdotesToShow(state)
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    voteNotification,
    resetNotification
}

export default connect(
    mapStateToProps
    ,mapDispatchToProps
    )(AnecdoteList)