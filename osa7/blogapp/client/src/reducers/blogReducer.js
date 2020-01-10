/* eslint-disable no-case-declarations */
import blogService from '../services/blogs'
import commentService from '../services/comments'

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
        case 'COMMENT':
            const blogId = action.data.blog
            const blogToUpdate = newState.find(b => b.id === blogId)
            console.log(blogToUpdate)
            blogToUpdate.comments.push(({ content: action.data.content, id: action.data.id }))
            return newState.map(b => b.id === blogToUpdate.id ? blogToUpdate : b)
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
        await blogService.remove(blogToDelete)
        const blogs = await blogService.getAll()
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

export const comment = (content, id) => {
    return async dispatch => {
        const comment = await commentService.create(content, id)
        dispatch({
            type: 'COMMENT',
            data: comment
        })
    }
}

export default reducer