import { observable } from 'mobx'

class BillsStore {
  id = Math.random()
  @observable title = ''
  @observable finished = false
}

export default BillsStore
