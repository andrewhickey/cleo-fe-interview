export type Transaction = {
  amount: number
  date: string
  id: number
}

export type Bill = {
  categoryId: number
  iconUrl: string | null
  id: string
  isBill: boolean
  name: string
  transactions: Transaction[]
}

export type Category = {
  iconUrl: string
  id: number
  name: string
}
