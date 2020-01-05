import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const Userbase = (props) => {
    return (
        <Table celled striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Users in Blogz</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                { props.userbase.map(u => {
                    return (
                        <Table.Row key={ u.id }>
                            <Table.Cell><Link to={ `/users/${u.id}` }>{ u.username }</Link></Table.Cell>
                            <Table.Cell>has added { u.blogs.length } blogs</Table.Cell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
    )
}

const mapStateToProps = (state) => {
    return {
        userbase: state.userbase
    }
}

export default connect(mapStateToProps)(Userbase)