import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import userbaseReducer from './reducers/userbaseReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer,
    userbase: userbaseReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store