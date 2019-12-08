import React, { useState } from 'react'

const Blog = ({ blog }) => {
    
    const [detailsVisible, setDetailsVisible] = useState(false)
    const showWhenVisible = { display: detailsVisible ? '' : 'none'}

    return (
        <div className='bloglist'
            onClick={ () => setDetailsVisible(!detailsVisible) }>
            <p><b>{ blog.title }</b></p> 
            <p>Author: { blog.author }</p>
            <div style={ showWhenVisible }>
                <p>URL: { blog.url }</p>
                <p>Likes: { blog.likes }</p>
                <button className='likebutton' 
                    onClick={ console.log(blog)}>Like</button>
                <p className='addedby'>Added by: { blog.user.username } </p>
            </div>
        </div>
    )
}

export default Blog