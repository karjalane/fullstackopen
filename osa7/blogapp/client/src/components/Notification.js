import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
    return props.notification === null
        ? null
        : props.notification.isError === true
            ? <div className="error">
                { props.notification.message }
            </div>
            : <div className="notification">
                { props.notification.message }
            </div>
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

export default connect(
    mapStateToProps
)(Notification)