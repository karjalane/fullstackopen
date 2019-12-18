const initialState = null

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'VOTE_NOTIFICATION':
            return `Vote cast for: ${action.content}`
        case 'ADD_ANECDOTE_NOTIFICATION':
            return `Successfully added: ${action.content}`
        case 'RESET_NOTIFICATION':
            return null
        default:
            return state
    }
}

export const voteNotification = content => {
    return {
        type: 'VOTE_NOTIFICATION',
        content
    }
}

export const addAnecdoteNotification = content => {
    return {
        type: 'ADD_ANECDOTE_NOTIFICATION',
        content
    }
}

export const resetNotification = content => {
    return {
        type: 'RESET_NOTIFICATION',
        content: null
    }
}

export default notificationReducer