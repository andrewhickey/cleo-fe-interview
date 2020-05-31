import BillsStore from './BillsStore'
import bills from './bills'
import nock from 'nock'

describe('BillsStore tests', () => {
  it('can be instantiated', () => {
    new BillsStore()
  })

  it('fetches bills and stores them in state', async () => {
    nock('http://localhost').get('/bills').reply(200, bills)

    const billsStore = new BillsStore('http://localhost/bills')
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

  it('handles http errors and stores the response', async () => {
    const mock = nock('http://localhost').persist().get('/bills').reply(500)

    const billsStore = new BillsStore('http://localhost/bills')
    expect(billsStore.bills).toHaveLength(0)
    expect(billsStore.fetching).toBe(false)
    expect(billsStore.finished).toBe(false)
    expect(billsStore.errorMessage).toEqual('')

    const fetchPromise = billsStore.fetch()

    expect(billsStore.fetching).toBe(true)
    expect(billsStore.finished).toBe(false)

    await fetchPromise

    expect(billsStore.fetching).toBe(false)
    expect(billsStore.finished).toBe(false)
    expect(billsStore.bills).toHaveLength(0)
    expect(billsStore.errorMessage).toEqual('Internal Server Error')

    mock.persist(false)
  })
})
