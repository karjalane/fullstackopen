const initialState = null

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return {
                message: action.data.message,
                isError: action.data.isError
            }
        case 'CLEAR_NOTIFICATION':
            return null
        default:
            return state
    }
}

export const notification = (message, isError, time) => {
    return async dispatch => {
        await dispatch({
            type: 'NOTIFICATION',
            data: {
                message,
                isError
            }
        })
        setTimeout(() => {
            dispatch({
                type: 'CLEAR_NOTIFICATION',
                data: null
            })
        }, time * 1000)
    }
}

export default notificationReducer