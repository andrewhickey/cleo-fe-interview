/** @jsx jsx */
import { jsx } from '@emotion/core'
import BillListItem from './BillListItem'
import { Bill } from '../../stores'
import { StyleConstants } from '../../shared/constants'

type BillListProps = {
  bills: Bill[]
}
function BillList({ bills }: BillListProps) {
  return (
    <div
      className="p-6"
      css={{ backgroundColor: StyleConstants.colors.lightGrey }}
    >
      <div className="border rounded-lg overflow-hidden divide-y shadow-sm">
        {bills.map((bill) => (
          <BillListItem key={bill.id} bill={bill} />
        ))}
      </div>
    </div>
  )
}

export default BillList
