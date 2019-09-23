import React, {useState} from 'react';
import ReactDOM from 'react-dom';


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
            <div>
                <h2>Statistics</h2>
                <div>
                    <p>Good: { good }</p>
                    <p>Neutral: { neutral }</p>
                    <p>Bad: { bad }</p>
                    <p>Total: { total }</p>
                    <p>Average: { average/total }</p>
                    <p>Positive: { (good/total)*100 } %</p>
                </div>
            </div>
        </div>
        
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root'));
