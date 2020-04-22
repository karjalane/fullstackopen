import React, { useState } from 'react'
import { AppBar, Tab, Tabs } from '@material-ui/core'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

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
        <Tabs value={ false }>
          <Tab label='Authors' onClick={ () => setPage('authors') } />
          <Tab label='Books' onClick={ () => setPage('books') } />
          <Tab label='Add book' onClick={ () => setPage('add') } />
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
    </div>
  )
}

export default App