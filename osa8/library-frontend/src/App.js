import React, { useState } from 'react'
import { AppBar, Tab, Tabs } from '@material-ui/core'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import AuthorForm from './components/AuthorForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMsg, setErrorMsg] = useState(null)

  const notify = (msg) => {
    setErrorMsg(msg)
    setTimeout(() => {
      setErrorMsg(null)
    }, 5000)
  }

  return (
    <div>
      <AppBar position='static'>
        <Tabs value={ false } centered>
          <Tab label='Authors' onClick={ () => setPage('authors') } />
          <Tab label='Books' onClick={ () => setPage('books') } />
          <Tab label='Add book' onClick={ () => setPage('add') } />
          <Tab label='Edit author' onClick={ () => setPage('edit') } />
        </Tabs>
      </AppBar>

      <Authors
        show={ page === 'authors' }
      />
      <Books
        show={ page === 'books' }
      />
      <NewBook
        show={ page === 'add' }
        errorMsg={ errorMsg }
        setError={ notify }
      />
      <AuthorForm
        show={ page === 'edit' }
        errorMsg={ errorMsg }
        setError={ notify }
      />
    </div>
  )
}

export default App