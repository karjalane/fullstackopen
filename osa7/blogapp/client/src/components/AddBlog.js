import React from 'react'
import blogService from '../services/blogs'

const AddBlog = ({ blogs, setBlogs
    ,newTitle
    ,newAuthor
    ,newURL
    ,notification, setNotification
    ,noteFormRef }) => {

    const addBlog = (event) => {
        event.preventDefault()
        noteFormRef.current.toggleVisibility()
        const blogObj = {
            title: newTitle.value,
            author: newAuthor.value,
            url: newURL.value,
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
                setBlogs(blogs
                    .concat(data)
                    .sort((x,y) => y.likes - x.likes))
                newTitle.reset()
                newAuthor.reset()
                newURL.reset()
            })
            .catch((err) => {
                setNotification(
                    { message: err.response.data.error, isError: true }
                )
                setTimeout(() => {
                    setNotification({ message: null, isError: false })
                }, 3000)
            })
    }

    /*const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }

    const handleURLChange = (event) => {
        setNewURL(event.target.value)
    }*/

    return (
        <div>
            <h2 className="addheader">Add new blog</h2>
            <form onSubmit={ addBlog }>
                <div>
                    Title:
                    <input
                        { ...newTitle }
                        reset={ null } />
                </div>
                <div>
                    Author:
                    <input
                        { ...newAuthor }
                        reset={ null } />
                </div>
                <div>
                    URL:
                    <input
                        { ...newURL }
                        reset={ null } />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddBlog