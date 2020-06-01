/** @jsx jsx */
import { jsx } from '@emotion/core'
import defaultIcon from '../../assets/cleo_coin.jpg'
import { Bill } from '../../stores'
import { StyleConstants } from '../../shared/constants'

type BillListItemProps = {
  bill: Bill
}
function BillListItem({ bill }: BillListItemProps) {
  const totalAmount = bill.transactions.reduce(
    (runningTotal, transaction) => runningTotal + transaction.amount,
    0
  )

  return (
    <div
      className="flex py-4 px-6"
      css={{ backgroundColor: StyleConstants.colors.veryLightGrey }}
    >
      <img
        className="w-12 h-12 rounded-full shadow-lg"
        src={bill.iconUrl || defaultIcon}
        alt={`${bill.name} logo`}
      />
      <div className="flex-1 flex flex-col justify-center ml-4">
        <h3>{bill.name}</h3>
        {/* TODO, get the category info from the api */}
        <h3>{bill.categoryId}</h3>
      </div>
      <div className="flex flex-col justify-center ml-4 text-lg font-bold">
        <h3>£{totalAmount}</h3>
      </div>
      <div className="flex flex-col justify-center ml-4">
        <h3>&gt;</h3>
      </div>
    </div>
  )
}

export default BillListItem
