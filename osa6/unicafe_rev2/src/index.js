import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const neutral = () => {
    store.dispatch({
      type: 'NEUTRAL'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }


  return (
    <div>
      <h2>Tell us how we did</h2>
      <button onClick={ good }>Good</button> 
      <button onClick={ neutral }>Neutral</button> 
      <button onClick={ bad }>Bad</button>
      <br />
      <button onClick={ zero }>Reset all statistics</button>
      <p />
      <strong>
      <div>Good { store.getState().good }</div>
      <div>Ok { store.getState().neutral } </div>
      <div>Bad { store.getState().bad } </div>
      </strong>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)