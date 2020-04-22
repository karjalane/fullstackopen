import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Notify from './Notify'

import { EDIT_AUTHOR } from '../queries'

const AuthorForm = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ changeBorn ] = useMutation(EDIT_AUTHOR
    , { onError: (err) => {
      props.setError(err.graphQLErrors[0].message)
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    changeBorn({ variables: { name, born: parseInt(born) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <Notify errorMsg={ props.errorMsg } />
      <form onSubmit={ submit }>
        <div>
          Name
          <input
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
          />
        </div>
        <div>
          Born
          <input
            value={ born }
            onChange={ ({ target }) => setBorn(target.value) }
          />
        </div>
        <button type='submit'>Update</button>
      </form>
    </div>
  )
}

export default AuthorForm