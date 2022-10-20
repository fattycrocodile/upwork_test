import {
  configureStore,
  createAction,
  Dispatch,
  Action,
} from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

// actions for counter reducer
export const increment = createAction<number>('increment')
export const decrement = createAction<number>('decrement')
export const set = createAction<number>('set')

// actions for step reducer
export const setStep = createAction<number>('setStep')

type CustomAction = Action<string>
export type RootState = {
  counter: number
  step: number
}
type Next = (action: CustomAction) => void

// counter reducer
const counter = (state = 0, action: CustomAction) => {
  if (increment.match(action)) return state + action.payload
  if (decrement.match(action)) return state - action.payload
  if (set.match(action)) return action.payload

  return state
}

// step reducer
const step = (state = 1, action: CustomAction) => {
  if (setStep.match(action)) return action.payload
  return state
}

const rootReducer = combineReducers({ counter, step })

export const timer = ({
  getState,
  dispatch,
}: {
  getState: () => RootState
  dispatch: Dispatch<CustomAction>
}) => {
  setInterval(() => {
    const { counter, step } = getState()
    if (counter >= 10) return
    if (counter < 0) dispatch(decrement(step))
    else dispatch(increment(step))
  }, 1000)

  return (next: Next) => (action: CustomAction) => {
    next(action)
  }
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: [timer],
})
