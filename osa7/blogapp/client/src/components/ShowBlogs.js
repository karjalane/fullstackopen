import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { voteBlog, deleteBlog } from '../reducers/blogReducer'
import { notification } from '../reducers/notificationReducer'

// Render blogs to UI
const ShowBlogs = (props) => {

    const handleLike = (blog) => {
        props.voteBlog(blog)
        props.notification(`You liked '${ blog.title }'`, false, 3)
    }

    const handleRemove = (blog) => {
        if (window.confirm(`Confirm to delete: ${ blog.title }`)) {
            props.deleteBlog(blog)
            props.notification(`'${ blog.title }' deleted`, false, 3)
        }
    }

    return (
        <div className="showlist">
            { props.visibleBlogs
                .sort((a,b) => b.likes - a.likes)
                .map(blog =>
                    <div key={ blog.id }>
                        <br />
                        <Blog
                            blog={ blog }
                            handleClick={() =>
                                handleLike(blog)}
                            handleRemove={() =>
                                handleRemove(blog)}
                        />
                    </div>
                )
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        visibleBlogs: state.blogs
    }
}

const mapDispatchToProps = {
    voteBlog,
    deleteBlog,
    notification
}

export default connect(
    mapStateToProps
    , mapDispatchToProps
)(ShowBlogs)