import React, { Component } from 'react'
import { Tabs, Tab } from './components'
import { StoreProvider } from './stores'
import './tailwind.generated.css'

class App extends Component {
  render() {
    return (
      <StoreProvider>
        <Tabs>
          <Tab title="Bills">BILL IS HERE</Tab>
          <Tab title="Another">SOMEONE ELSE LIVES HERE</Tab>
        </Tabs>
      </StoreProvider>
    )
  }
}

export default App
