import ky from 'ky/umd'
import { observable } from 'mobx'
import { Bill } from '../types'

class BillsStore {
  endpoint: string

  @observable fetching = false
  @observable finished = false
  @observable errorMessage = ''
  @observable bills: Bill[] = []

  constructor(endpoint = 'http://localhost:3002/bills') {
    this.endpoint = endpoint
  }

  fetch = async () => {
    try {
      this.fetching = true
      const bills = await ky.get(this.endpoint).json()
      this.bills = bills as Bill[]
      this.finished = true
    } catch (error) {
      this.errorMessage = error.message
    }

    this.fetching = false
  }

  setIsBill = async (billId: string, isBill: boolean) => {
    let bill = this.bills.find((bill) => bill.id === billId)
    if (bill) {
      await ky
        .patch(`${this.endpoint}/${billId}`, { json: { ...bill, isBill } })
        .json()
      bill.isBill = isBill
    }
  }
}

export default BillsStore
