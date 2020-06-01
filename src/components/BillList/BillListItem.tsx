import React from 'react'
import { Bill } from '../../stores'

type BillListItemProps = {
  bill: Bill
}
function BillListItem({ bill }: BillListItemProps) {
  return <div>{bill.name}</div>
}

export default BillListItem
