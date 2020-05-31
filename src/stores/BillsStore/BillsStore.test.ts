import React from 'react'
import ReactDOM from 'react-dom'
import BillsStore from './BillsStore'

describe('BillsStore tests', () => {
  it('can be instantiated', () => {
    new BillsStore()
  })

  it('fetches bills and stores them in state', async () => {
    const billsStore = new BillsStore()
    expect(billsStore.bills).toHaveLength(0)
    expect(billsStore.fetching).toBe(false)
    expect(billsStore.finished).toBe(false)
    expect(billsStore.errorMessage).toEqual('')
    const fetchPromise = billsStore.fetch()
    expect(billsStore.fetching).toBe(true)
    expect(billsStore.finished).toBe(false)
    await fetchPromise
    expect(billsStore.fetching).toBe(false)
    expect(billsStore.finished).toBe(true)
    expect(billsStore.bills).toHaveLength(9)
  })
})
