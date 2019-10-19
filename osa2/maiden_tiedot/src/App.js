import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Display from './components/Display'
import './App.css';

/* Application shown basic info of countries
    Chrome browser throws a warning about the
    samesite -cookie */
const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios
        .get('https://restcountries.eu/rest/v2/all' )
        .then(response => {
            setCountries(response.data)
        })
    }, [])

    return (
        <div>
            <h2>Countries of the world</h2>
            <Search 
                filter = { filter }
                setFilter = { setFilter }/>
            <br></br>
            <Display
                countries={ countries }
                filter={ filter } 
                setFilter={ setFilter }
            />
        </div>
    )
}

export default App