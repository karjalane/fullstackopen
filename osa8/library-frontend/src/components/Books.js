import React from 'react'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const books = []

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