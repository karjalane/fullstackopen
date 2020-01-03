import React from 'react'

const Blog = ({ blog, handleClick }) => {

    return (
        <div className='bloglist'>
            <a href={ blog.url }>{ blog.title }</a> by { blog.author }
            <div>{ blog.likes } likes</div>
            <button onClick={ handleClick }>Like</button>
            <div className='addedby'>Added by { blog.user.name }</div>
        </div>
    )
}

export default Blog