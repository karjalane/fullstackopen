import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CurrentWeather from './CurrentWeather'

/* Fetch weather data from the api */
const Weather = ({ capital }) => {
    const [weather, setWeather] = useState('')

    useEffect(() => {
        axios
            .get('http://api.weatherstack.com/current?access_key=83b58cb767be1b9b500eb1647097d12a&query={capital}&units=m')
            .then(response => {
                setWeather(response.data)
            })
    }, [])

    console.log(weather)
    return (
        <div>
            <br></br>
            <h4>Weather in <i>{ capital }</i></h4>
            <CurrentWeather 
                weather={ weather } />
        </div>
    )
}

export default Weather