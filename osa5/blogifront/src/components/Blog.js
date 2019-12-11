import React, { useState } from 'react'
import blogService from '../services/blogs'
//import PropTypes from 'prop-types'

const Blog = ({ blog
    , blogs, setBlogs
    , notification, setNotification
    , removeAllowed }) => {

    const [detailsVisible, setDetailsVisible] = useState(false)
    const [addLike, setAddLike] = useState(blog.likes)
    const showWhenVisible = { display: detailsVisible ? '' : 'none' }

    // Handle push on like button
    const handleLike = (event) => {
        event.preventDefault()
        const updtObj = {
            user: {
                id: blog.user.id,
                name: blog.user.name,
                username: blog.user.username },
            likes: addLike + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url
        }
        blogService
            .update(updtObj, blog.id)
            .then((data) => {
                setNotification(
                    { message: `You liked ${ updtObj.title } by ${ updtObj.author }`, isError: false }
                )
                setTimeout(() => {
                    setNotification({ ...notification, message: null })
                }, 2000)
                setAddLike(updtObj.likes)
                blog.likes = data.likes
                setBlogs(blogs
                    .filter(x => x.id !== blog.id)
                    .concat(blog)
                    .sort((x,y) => y.likes - x.likes))
            })
    }

    const handleRemove = (event) => {
        event.preventDefault()
        if (window.confirm(`Delete ${blog.title} by ${blog.author} permanently?`)) {
            blogService
                .remove(blog.id)
                .then(() => {
                    setNotification(
                        { message: `${ blog.title } by ${ blog.author } deleted`, isError: false }
                    )
                    setTimeout(() => {
                        setNotification({ ...notification, message: null })
                    }, 3000)
                    setBlogs(blogs
                        .filter(x => x.id !== blog.id)
                        .sort((x,y) => y.likes - x.likes))
                })
        }
    }

    return (
        <div className='bloglist'>
            <div
                onClick={ () => setDetailsVisible(!detailsVisible) }
                className='singleblog'>
                <p><b>{ blog.title }</b></p>
                <p>Author: { blog.author }</p>
            </div>
            <div style={ showWhenVisible } className='reveal'>
                <p>URL: { blog.url }</p>
                <p>Likes: { blog.likes }</p>
                <button className='likebutton'
                    onClick={ handleLike }>Like</button>
                { removeAllowed && <button onClick={ handleRemove }>Remove</button> }
                { removeAllowed
                    ? <p className='addedby'>Added by: you </p>
                    : <p className='addedby'>Added by: { blog.user.username } </p>}
            </div>
        </div>
    )
}

/*Blog.propTypes = {
    removeAllowed: PropTypes.bool.isRequired
}*/

export default Blog