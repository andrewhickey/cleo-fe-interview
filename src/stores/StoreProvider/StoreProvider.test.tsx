import React from 'react'
import ReactDOM from 'react-dom'
import { StoreProvider } from './StoreProvider'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<StoreProvider />, div)
  ReactDOM.unmountComponentAtNode(div)
})
