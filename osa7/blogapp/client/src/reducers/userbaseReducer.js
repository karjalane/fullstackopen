import userService from '../services/users'

const initState = []

const reducer = (state = initState, action) => {
    const updatedState = [...state]

    switch (action.type) {
        case 'INIT_USERS':
            return action.data
        case 'CONNECT': {
            const { username, blog } = action.data
            const userToUpdate = updatedState.find(user => user.username === username)

            userToUpdate.blogs.push(blog)
            return updatedState.map(user =>
                user.username === username
                    ? userToUpdate
                    : user)
        }
        default: return state
    }
}

export const initUsers = () => {
    return async dispatch => {
        const data = await userService.getUsers()
        dispatch({
            type: 'INIT_USERS',
            data
        })
    }
}

export const connectToUser = (username, blog) => {
    return async dispatch => {
        dispatch({
            type: 'CONNECT',
            data: { username, blog }
        })
    }
}

export default reducer