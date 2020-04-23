import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { FormControl, Select, InputLabel, MenuItem, makeStyles } from '@material-ui/core'
import Notify from './Notify'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}))

const AuthorForm = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ changeBorn ] = useMutation(EDIT_AUTHOR
    , { onError: (err) => {
      props.setError(err.graphQLErrors[0].message)
    }
  })

  const classes = useStyles()

  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    changeBorn({ variables: { name, born: parseInt(born) } })

    setName('')
    setBorn('')
  }

  const handleName = (event) => {
    setName(event.target.value)
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <Notify errorMsg={ props.errorMsg } />
      <form onSubmit={ submit }>
        <div>
          <FormControl className={ classes.formControl }>
            <InputLabel>
              Name
            </InputLabel>
            <Select
              id="select"
              value={ name }
              onChange={ handleName }
            >
              { authors.map(a =>
                <MenuItem key={ a.id } value={ a.name }>{ a.name }</MenuItem>
              ) }
            </Select>
          </FormControl>
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