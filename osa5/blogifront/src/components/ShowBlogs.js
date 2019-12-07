import React from 'react'
import Blog from './Blog'

const ShowBlogs = ({ blogs }) => {
    
    const rows = () => {
        if (blogs.length < 1) {
            return <div>No blogs to show</div>
        }
        return blogs.map(blog =>
            <Blog
                key={ blog.id }
                blog={ blog }
            />
        )
    }

    return (
    <ul className="showlist"> { rows() } </ul>
    )
}

export default ShowBlogs