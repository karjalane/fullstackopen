import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'NEW_ANECDOTE':
            return [...state, action.data]
        case 'INIT_ANECDOTES':
            return action.data
        case 'VOTE':
            const id = action.data.id
            const anecdoteToChange = state.find(a => a.id === id)
            
            return state.map(anecdote =>
                anecdote.id !== id ? anecdote : anecdoteToChange
            )
            default:
                return state
    }  
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch({
            type: 'NEW_ANECDOTE',
            data: newAnecdote
        })
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        })
    }
}

export const voteAnecdote = content => {
    return async dispatch => {
        const updatedContent = await anecdoteService.update(content)
        dispatch({
            type: 'VOTE',
            data: updatedContent
        })
    }
}
  
export default reducer