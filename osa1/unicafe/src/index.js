import React, {useState} from 'react';
import ReactDOM from 'react-dom';

/// Render statistics
const Statistics = (props) => {
    if (props.total < 1) {
        return (
            <div>
                No feedback given
            </div>
        )
    }
        return ( 
                <div>
                    <Statistic value={ props.good } text='Good' />
                    <Statistic value={ props.neutral } text='Neutral' />
                    <Statistic value={ props.bad } text='Bad'/>
                    <Statistic value={ props.total } text='total' />
                    <Statistic value={ props.average/props.total } text='Average' />
                    <Statistic value={ (props.good/props.total)*100 } text='Positive' />
                </div>
        )
}

/// Render single row of statistic
const Statistic = ({ value, text }) => {
    if (text === 'Positive') {
        return (
            <p>{text}: {value} % </p>
        )
    }
        return (
            <p>{text}: {value} </p>
        )
}

/// Render single button
const Button = ({ onClick, text}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const App = (props) => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [average, setAverage] = useState(0)
    const total = (good + neutral + bad)

    const handleGoodFeedback = () => {
        setGood(good + 1)
        setAverage(average + 1)
    }
    const handleNeutralFeedback = () => {
        setNeutral(neutral + 1)
    }
    const handleBadFeedback = () => {
        setBad(bad + 1)
        setAverage(average - 1)
    }

    return (
        <div>
            <h2>Give Feedback</h2>
            <div>
                <Button onClick={ handleGoodFeedback } text='Good' />
                <Button onClick={ handleNeutralFeedback } text='Neutral' />
                <Button onClick={ handleBadFeedback } text='Bad' />
            </div>
            <h2>Statistics</h2>
                <Statistics good={ good } 
                neutral={ neutral } bad={ bad } 
                average = { average } total={ total }/>
        </div>
        
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root'));
