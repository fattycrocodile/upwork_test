import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import App from './App'
import { store, set } from './store'
import { act } from 'react-dom/test-utils'

describe('app', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    )
  })

  it("should increase the counter when it's between 0 and 10", () => {
    act(() => {
      store.dispatch(set(0))
    })
    const element = screen.getByTestId('counter')
    setTimeout(() => {
      const newCounter = parseInt(element.innerText)
      expect(newCounter).toBe(1)
    }, 1000)
  })

  it("should decrease the counter when it's less than 0", () => {
    act(() => {
      store.dispatch(set(-1))
    })
    const element = screen.getByTestId('counter')
    setTimeout(() => {
      const newCounter = parseInt(element.innerText)
      expect(newCounter).toBe(-2)
    }, 1000)
  })

  it('should stop counting when the counter is equal or greater than 10', () => {
    act(() => {
      store.dispatch(set(10))
    })
    const element = screen.getByTestId('counter')
    setTimeout(() => {
      const newCounter = parseInt(element.innerText)
      expect(newCounter).toBe(10)
    }, 1000)
  })

  it('should alert when the counter reaches 20', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation()

    act(() => {
      store.dispatch(set(20))
    })

    expect(alertMock).toHaveBeenCalledTimes(1)
  })
})
