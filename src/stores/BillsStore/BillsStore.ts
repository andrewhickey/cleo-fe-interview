import ky from 'ky/umd'
import { observable } from 'mobx'

type Transaction = {
  amount: number
  date: string
  id: number
}

type Bill = {
  categoryId: number
  iconUrl: string
  id: string
  isBill: boolean
  name: string
  transactions: Transaction[]
}

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
}

export default BillsStore
