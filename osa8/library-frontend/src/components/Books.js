import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>Books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              Author
            </th>
            <th>
              Published
            </th>
          </tr>
          { books.map(b => 
            <tr key={ b.title }>
              <td>{ b.title }</td>
              <td>{ b.author }</td>
              <td>{ b.published }</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books