const initialState = null

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return action.data
        default:
            return state
    }
}

export const notification = (content, time) => {
    return async dispatch => {
        await dispatch({
            type: 'NOTIFICATION',
            data: content
        })
        setTimeout(() => {
            dispatch({
                type: 'NOTIFICATION',
                data: null
            })
        }, time * 1000)
    }
    
}

export default notificationReducer