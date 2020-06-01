/** @jsx jsx */
import { jsx } from '@emotion/core'
import BillListItem from './BillListItem'
import { Bill } from '../../stores'

type BillListProps = {
  bills: Bill[]
}
function BillList({ bills }: BillListProps) {
  return (
    <div className="divide-y">
      {bills.map((bill) => (
        <BillListItem bill={bill} />
      ))}
    </div>
  )
}

export default BillList
