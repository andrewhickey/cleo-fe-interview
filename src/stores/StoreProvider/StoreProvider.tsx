import React, { createContext, useContext, useState } from 'react'
import BillsStore from '../BillsStore'
import CategoriesStore from '../CategoriesStore'

const createStores = () => {
  const billsStore = new BillsStore()
  const categoriesStore = new CategoriesStore()

  const stores = {
    billsStore,
    categoriesStore,
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
