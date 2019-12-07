import React from 'react'

const Blog = ({ blog }) => (
    <ul>
        <li>
            <p><b>{blog.title}</b></p> 
            <p>Author: {blog.author}</p>
            <p>URL: { blog.url }</p>
            <p>Likes: { blog.likes }</p>
            <br/>
        </li>
    </ul>
)

export default Blog