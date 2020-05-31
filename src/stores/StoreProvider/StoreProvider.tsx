import React, { createContext, useCallback, useContext, useState } from 'react'
import BillsStore from '../BillsStore'

const createStores = () => {
  const billsStore = new BillsStore()

  const stores = {
    billsStore,
  }

  return stores
}

type StoreContextType = ReturnType<typeof createStores> | null

const StoreContext = createContext<StoreContextType>(null)

type StoreProviderProps = {
  children?: React.ReactNode
}
function StoreProvider({ children }: StoreProviderProps) {
  const [stores] = useState(createStores())

  return (
    <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
  )
}

const useStores = () => {
  const stores = useContext(StoreContext)

  if (stores) {
    return stores
  } else {
    throw new Error(
      'Stores not available, <StoreProvider /> must be in the tree'
    )
  }
}

export { StoreProvider, useStores }
