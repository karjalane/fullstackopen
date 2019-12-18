const initState = ''

const filterReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.data
        default:
            return state
    }
}

export const filterChange = filter => {
    return {
        type: 'SET_FILTER',
        data: filter
    }
}

export default filterReducer