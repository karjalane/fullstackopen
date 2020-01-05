import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = (props) => {
    return props.notification === null
        ? null
        : props.notification.isError === true
            ? <Message warning>
                { props.notification.message }
            </Message>
            : <Message className="notification">
                { props.notification.message }
            </Message>
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

export default connect(
    mapStateToProps
)(Notification)