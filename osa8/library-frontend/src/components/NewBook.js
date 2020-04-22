import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Notify from './Notify'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(ADD_BOOK
    , { refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS }]
    , onError: (err) => {
      props.setError(err.graphQLErrors[0].message)
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({ variables: { title
      , author
      , published: parseInt(published)
      , genres 
    } })

    console.log('add book...')
  
    setTitle('')
    setAuthor('')
    setPublished('')
    setGenre('')
    setGenres([])
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }
  
  return (
    <div>
      <Notify errorMsg={ props.errorMsg } />
      <form onSubmit={ submit }>
        <div>
          Title
          <input
            value={ title }
            onChange={ ({ target }) => setTitle(target.value) }
          />
        </div>
        <div>
          Author
          <input
            value={ author }
            onChange={ ({ target }) => setAuthor(target.value) }
          />
        </div>
        <div>
          Published
          <input
            value={ published }
            onChange={ ({ target }) => setPublished(target.value) }
          />
        </div>
        <div>
          Genre
          <input
            value={ genre }
            onChange={ ({ target }) =>  setGenre(target.value) }
          />
          <button onClick={ addGenre } type='button'>
            Add genre
          </button>
        </div>
        <div>
          Genres: { genres.join(' ') }
        </div>
        <button type='submit'>Create book</button>
      </form>
    </div>
  )
}

export default NewBook