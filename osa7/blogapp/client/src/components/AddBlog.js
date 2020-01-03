import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notification } from '../reducers/notificationReducer'
//import { useField } from '../hooks'

const AddBlog = (props) => {
    /*const title = useField('text')
    const author = useField('text')
    const url = useField('url')*/

    const create = async (event) => {
        try {
            event.preventDefault()
            const content = {
                title: event.target.title.value,
                author: event.target.author.value,
                url: event.target.url.value
            }
            event.target.title.value = ''
            event.target.author.value = ''
            event.target.url.value = ''
            props.createBlog(content)
            props.notification(`Added new blog: ${ content.title } by ${ content.author }`, false, 3)
        } catch(exp) {
            props.notification(exp.response.data.error, true, 3)
        }
    }

    return (
        <div>
            <h2 className="addheader">Add new blog</h2>
            <form onSubmit={ create }>
                <div>
                    Title:
                    <input name='title'/>
                </div>
                <div>
                    Author:
                    <input name='author'/>
                </div>
                <div>
                    URL:
                    <input name='url'/>
                </div>
                <div>
                    <button>Add</button>
                </div>
            </form>
        </div>
    )
}

export default connect(null, {
    createBlog
    , notification
})(AddBlog)