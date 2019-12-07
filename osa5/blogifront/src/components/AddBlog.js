import React from 'react'
import blogService from '../services/blogs'

const AddBlog = ({ blogs, setBlogs
                ,newTitle, setNewTitle
                ,newAuthor, setNewAuthor
                ,newURL, setNewURL
                ,newLikes, setNewLikes
                ,notification, setNotification }) => {

    const addBlog = (event) => {
        event.preventDefault()
        const blogObj = {
            title: newTitle,
            author: newAuthor,
            url: newURL,
        }
        blogService
            .create(blogObj)
            .then(data => {
                setNotification(
                    { message: `${ blogObj.title } by ${ blogObj.author } added`, isError: false }
                )
                setTimeout(() => {
                    setNotification({ ...notification, message: null })
                }, 3000)
                setBlogs(blogs.concat(data))
                setNewTitle('')
                setNewAuthor('')
                setNewURL('')
                setNewLikes('')
            })
            .catch((err) => {
                setNotification(
                    { message: err.response.data.error, isError: true }
                )
                setTimeout(() => {
                    setNotification({ message: null, isError: false})
                }, 3000)
            })
    }
    
    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }

    const handleURLChange = (event) => {
        setNewURL(event.target.value)
    }

    return (
        <div>
            <h2 className="addheader">Add new blog</h2>
            <form onSubmit={ addBlog }>
                <div>
                    Title:
                        <input
                            value={ newTitle }
                            onChange={ handleTitleChange } />
                </div>
                <div>
                    Author:
                        <input
                            value={ newAuthor }
                            onChange={ handleAuthorChange } />
                </div>
                <div>
                    URL:
                        <input
                            value={ newURL }
                            onChange={ handleURLChange } />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddBlog