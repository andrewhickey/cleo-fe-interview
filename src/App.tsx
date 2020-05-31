import React, { Component } from 'react'
import { Tabs } from './components'
import { StoreProvider } from './stores'
import './tailwind.generated.css'

class App extends Component {
  render() {
    return (
      <StoreProvider>
        <Tabs />
      </StoreProvider>
    )
  }
}

export default App
