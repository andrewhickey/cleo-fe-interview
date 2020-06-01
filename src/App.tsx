import React from 'react'
import { BillsPage } from './pages'
import { StoreProvider } from './stores'
import './tailwind.generated.css'

function App() {
  return (
    <StoreProvider>
      <BillsPage />
    </StoreProvider>
  )
}

export default App
