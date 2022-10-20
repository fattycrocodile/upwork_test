import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, increment, decrement, setStep } from './store'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const counter = useSelector((state: RootState) => state.counter)
  const step = useSelector((state: RootState) => state.step)

  React.useEffect(() => {
    // print mounted time
    console.log('Component mounted at', new Date())
  }, [])

  React.useEffect(() => {
    // if the counter reaches 20, show alert
    if (counter === 20) alert('Counter reached 20')
  }, [counter])

  return (
    <div className="app">
      <select
        value={step}
        onChange={(e) => dispatch(setStep(parseInt(e.target.value)))}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
      <button onClick={() => dispatch(decrement(step))}>-</button>
      <span data-testid="counter">{counter}</span>
      <button onClick={() => dispatch(increment(step))}>+</button>
    </div>
  )
}

export default App
