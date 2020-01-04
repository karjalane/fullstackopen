const initState = null

const userReducer = (state = initState, action) => {
    return action.type === 'USER'
        ? action.data
        : state
}

export const login = (data) => {
    return async dispatch => {
        dispatch({
            type: 'USER',
            data
        })
    }
}

export const logout = () => {
    return async dispatch => {
        dispatch({
            type: 'USER',
            data: null
        })
    }
}

export default userReducer