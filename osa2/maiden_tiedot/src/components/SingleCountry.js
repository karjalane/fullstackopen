import React from 'react'
import Weather from './Weather'

/* Render single countrys details */
const SingleCountry = ({ country }) => {
    
    /* Create an array of languages */
    const languages = () => 
        country.languages.map( language =>
            <div key={ language.name }>
                    { language.name }
            </div>
        )

    return (
        <div>
            <h3><b>{ country.name }</b></h3>
            <p>Capital: {' '} { country.capital }</p>
            <p>Population: {' '} { country.population }</p>
            <br></br>
            <p><b>Spoken languages:</b></p>
            <ul>
                { languages() }
            </ul>
            <br></br>
            <p>Flag:</p>
            <img 
                src={country.flag}
                alt={country.name}
                width='100rem'
            />
            <br></br>
            <Weather
                capital={ country.capital }
            />
        </div>
    )
}

export default SingleCountry