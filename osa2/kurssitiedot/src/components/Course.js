import React from 'react';

const Course = ( { courses } ) => {
    return (
        <>
            <Header name={ courses.name } />
            <Content parts={ courses.parts } />
            <Total parts={ courses.parts } />
        </>
    )
}

const Header = ({ name }) => {
    return (
        <>
            <h3>{ name }</h3>
        </>
    )
}

const Content = ({ parts }) => (
    <>
        { parts.map(part => (
            <Part 
                key={ part.id }
                name={ part.name }
                exercises={ part.exercises } />
        ))}
    </>
)

const Part = ({ name, exercises }) => {
    return (
        <>
            <li>{ name } { exercises }</li>
        </>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce(function(sum,part) {
        return sum + part.exercises
    }, 0)
    
    return (
        <>
            <p>
                <b>
                    Total of { total } exercises
                </b>
            </p>
            <hr></hr>
        </>
    )
}

export default Course