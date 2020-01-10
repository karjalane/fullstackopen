import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Container, Divider, Icon } from 'semantic-ui-react'

// Render bloglist to UI
const ShowBlogs = (props) => {

    return (
        <Container>
            <Divider>
                <Table>
                    <Table.Body>
                        { props.visibleBlogs
                            .sort((a,b) => b.likes - a.likes)
                            .map(blog =>
                                <React.Fragment key={ blog.id }>
                                    <Table.Row>
                                        <Table.Cell verticalAlign='top'>
                                            <Link to={ `/blogs/${ blog.id }` }>
                                                { blog.title }
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell verticalAlign='bottom'><Icon name='heart' color='red' />{ blog.likes }</Table.Cell>
                                    </Table.Row>
                                </React.Fragment>
                            )
                        }
                    </Table.Body>
                </Table>
            </Divider>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        visibleBlogs: state.blogs
    }
}

export default connect(
    mapStateToProps
)(ShowBlogs)