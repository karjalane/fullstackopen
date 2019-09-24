import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Display = ({ anecdote, selected, votes }) => {
    if(selected < 0) {
        return (
            <div>
                <h3>Click to get a sweet anecdote</h3>
            </div>
        )
    }
    return (
        <div>
            <h3>{anecdote[selected]}</h3>
            <p>This anecdote has {votes[selected]} votes</p>
        </div>
    )
}

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const App = (props) => {
    const [selected, setSelected] = useState(-1)
    
    const handleRandom = () => {
        setSelected(Math.floor(Math.random() * props.anecdotes.length))
    }
    const handleVote = () => {
        
    }

    return (
        <div>
            <Display anecdote={props.anecdotes} 
                selected={selected} votes={props.votes} />
            <div>
                <Button onClick={ handleVote } text="Vote" />
                <Button onClick={ handleRandom } text="Next anecdote" />
            </div>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'The best thing about a boolean is even if you are wrong, you are only off by a bit.',
    'Without requirements or design, programming is the art of adding bugs to an empty text file.',
    'Before software can be reusable it first has to be usable.',
    'The best method for accelerating a computer is the one that boosts it by 9.8 m/s2.',
    'I think Microsoft named .Net so it wouldn’t show up in a Unix directory listing.',
    'If builders built buildings the way programmers wrote programs, then the first woodpecker that came along would destroy civilization.',
    'There are two ways to write error-free programs; only the third one works.',
    'Ready, fire, aim: the fast approach to software development. Ready, aim, aim, aim, aim: the slow approach to software development.',
    'It’s not a bug – it’s an undocumented feature.',
    'One man’s crappy software is another man’s full-time job.'
]
const votes = Array(anecdotes.length).fill(0)

ReactDOM.render(
    <App anecdotes={anecdotes} votes={votes} />
    , document.getElementById('root'));