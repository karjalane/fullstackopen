import React from 'react'
import Blog from './Blog'

const ShowBlogs = ({ blogs, setBlogs, user
    , notification, setNotification }) => {
    
    const rows = () => {
        if (blogs.length < 1) {
            return <div>No blogs to show</div>
        }
        return blogs.map(blog =>
            <Blog
                key={ blog.id }
                blog={ blog }
                blogs={ blogs }
                setBlogs={ setBlogs }
                notification={ notification }
                setNotification={ setNotification }
                removeAllowed={ user.name === blog.user.name }
            />
        )
    }

    return (
    <ul className="showlist"> { rows() } </ul>
    )
}

export default ShowBlogs