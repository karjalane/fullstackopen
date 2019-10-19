import React from 'react';

/* Render weather data of the selected capital */
const CurrentWeather = ({ weather }) => {
    if ( !weather ) {
        return (
            <div>
                'No weather data'
            </div>
        )
    }

    return (
        <div>
            <p>
                Temperature: {' '}
                <strong>{ weather.current.temperature }</strong>
                °C
            <br></br>
            <br></br>
            <img src={ weather.current.weather_icons[0] }
                    alt={ weather.current.weather_descriptions[0] } />
            </p>
            <p>
                Wind speed: {' '}
                <strong>{ weather.current.wind_speed }</strong>
                m/s
            </p>
        </div>
    )
}

export default CurrentWeather