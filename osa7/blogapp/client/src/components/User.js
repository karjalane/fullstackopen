import React from 'react'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {

    return user === undefined
        ? <div>User not found</div>
        : <div>
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>{ user.username }</Table.HeaderCell>
                        <Table.Cell>has added { user.blogs.length } blogs</Table.Cell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { user.blogs.map(b => {
                        return (
                            <Table.Row key={ b.id }>
                                <Table.Cell>
                                    <Link to={ `/blogs/${ b.id }` }>{ b.title }</Link>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </div>
}

export default User