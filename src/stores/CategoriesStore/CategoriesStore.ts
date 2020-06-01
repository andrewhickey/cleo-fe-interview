import ky from 'ky/umd'
import { observable } from 'mobx'
import { Category } from '../types'

class CategoriesStore {
  endpoint: string

  @observable fetching = false
  @observable finished = false
  @observable errorMessage = ''
  @observable categories: Category[] = []

  constructor(endpoint = 'http://localhost:3002/categories') {
    this.endpoint = endpoint
  }

  fetch = async () => {
    if (!this.fetching) {
      try {
        this.fetching = true
        const categories = await ky.get(this.endpoint).json()
        this.categories = categories as Category[]
        this.finished = true
      } catch (error) {
        this.errorMessage = error.message
      }

      this.fetching = false
    }
  }
}

export default CategoriesStore
