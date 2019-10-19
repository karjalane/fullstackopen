import React from 'react'
import Country from './Country'
import SingleCountry from './SingleCountry'

/* Render a list of countries or give 
additional directions */
const Display = ( { countries, filter, setFilter } ) => {

    const countriesShow = () =>
        countries.filter(country => {
            let theCountry = country.name.toLowerCase()
            let theFilter = filter.toLowerCase()
            return theCountry.includes(theFilter)
        })

    /* Handle the button press */
    const countryLinkHandler = (event) => {
        setFilter(event.target.attributes.country.value)
    }
    
    let countryList = countriesShow()

    /* Render the rows of data
    Maximum of 10 entries shown */
    const rows = () => {
        if(countriesShow().length < 1) {
            return <div>No countries matching the criteria</div>
        }
        if(countriesShow().length === 1) {
            return ( <SingleCountry
                        country={ countryList[0] }
                         />)
        }
        if(!filter) {
            return <div>Type in the above box to search</div>
        }
        if(countriesShow().length > 10) {
            return <div>Please refine the search</div>
        }
        return countriesShow().map(country =>
            <Country 
                key={ country.name }
                name={ country.name } 
                linkHandler={ countryLinkHandler }/>
            )
    }

    return (
        <>
            <h4>Search results</h4>
            <ul>
                { rows() }
            </ul>
        </>
    )
}

export default Display