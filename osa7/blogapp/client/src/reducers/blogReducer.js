import blogService from '../services/blogs'

const byVotes = (b1, b2) => b2.likes - b1.likes

const reducer = (state = [], action) => {
    const newState = [...state]
    switch (action.type) {
        case 'NEW_BLOG':
            return [...newState, action.data]
        case 'INIT_BLOGS':
            return action.data
        case 'DELETE_BLOG':
            return action.data
        case 'LIKE_BLOG':
            return newState
                .map(b => b.id !== action.data.id ? b : action.data)
                .sort(byVotes)
        default:
            return newState
    }
}

export const createBlog = content => {
    return async dispatch => {
        const blog = {
            content,
            likes: 0
        }
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const deleteBlog = blog => {
    return async dispatch => {
        const blogToDelete = { ...blog }
        const blogs = await blogService.remove(blogToDelete)
        dispatch({
            type: 'DELETE_BLOG',
            data: blogs
        })
    }
}

export const voteBlog = blog => {
    return async dispatch => {
        const updated = {
            ...blog,
            likes: blog.likes + 1
        }
        const data = await blogService.update(updated)
        dispatch({
            type: 'LIKE_BLOG',
            data
        })
    }
}

export default reducer