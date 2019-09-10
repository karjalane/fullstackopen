import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const course = 'Half Stack application development'
    const part1 = { 
        name: 'Fundamentals of React',
        exercises: 10
    }

    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
        <>
            <Header name = {course} />
            <Content part1 = {part1.name} exercises1 = {part1.exercises}
            part2 = {part2.name} exercises2 = {part2.exercises}
            part3 = {part3.name} exercises3 = {part3.exercises} />
            <Total part1 = {part1.exercises} part2 = {part2.exercises} part3 = {part3.exercises}/>
        </>
    )
}

const Header = (props) => {
    console.log(props)
    return (
        <>
            <h1>{props.name}</h1>
        </>
    )
}

const Content = (props) => {
    console.log(props)
    return (
        <>
            <Part part = {props.part1} exercises = {props.exercises1}/>
            <Part part = {props.part2} exercises = {props.exercises2}/>
            <Part part = {props.part3} exercises = {props.exercises3}/>
        </>
    )
}

const Part = (props) => {
    console.log(props)
    return (
        <>
            <p>
                {props.part} {props.exercises}
            </p>
        </>
    )
}

const Total = (props) => {
    return (
        //This doesn't seem too sustainable
        <>
            <p>
                Number of exercises {props.part1 + props.part2 + props.part3}
            </p>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));