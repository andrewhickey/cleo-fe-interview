/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useCallback } from 'react'
import { Flipped } from 'react-flip-toolkit'
import defaultIcon from '../../assets/cleo_coin.jpg'
import { Bill } from '../../stores'

const shouldFlip = (id: string) => (prev: string, current: string) =>
  id === prev || id === current

type BillListItemProps = {
  bill: Bill
  onToggle: (id: string) => void
}
function BillListItem({ bill, onToggle }: BillListItemProps) {
  const handleToggle = useCallback(() => {
    onToggle(bill.id)
  }, [bill.id, onToggle])

  const handleChangeState = useCallback(() => {
    bill.isBill = !bill.isBill
  }, [bill.isBill])

  const totalAmount = bill.transactions.reduce(
    (runningTotal, transaction) => runningTotal + transaction.amount,
    0
  )

  return (
    <Flipped flipId={bill.id} shouldInvert={shouldFlip(bill.id)} stagger="bill">
      <div className="bg-white">
        <Flipped inverseFlipId={bill.id}>
          <div className="flex text-left py-4 px-6">
            <Flipped
              flipId={`${bill.id}-image`}
              shouldFlip={shouldFlip(bill.id)}
              delayUntil={bill.id}
            >
              <button className="focus:outline-none" onClick={handleToggle}>
                <img
                  className="w-12 h-12 rounded-full shadow-lg"
                  src={bill.iconUrl || defaultIcon}
                  alt={`${bill.name} logo`}
                />
              </button>
            </Flipped>
            <div className="flex-1 flex flex-col items-start justify-center ml-4">
              <Flipped
                delayUntil={bill.id}
                shouldFlip={shouldFlip(bill.id)}
                flipId={`${bill.id}-name`}
              >
                <h3>{bill.name}</h3>
              </Flipped>
              {/* TODO, get the category info from the api */}
              <Flipped
                delayUntil={bill.id}
                flipId={`${bill.id}-category`}
                shouldFlip={shouldFlip(bill.id)}
              >
                <h3>{bill.categoryId}</h3>
              </Flipped>
            </div>
            <div className="flex flex-col justify-center ml-4 text-lg font-bold">
              <h3>£{totalAmount}</h3>
            </div>
            <button
              onClick={handleChangeState}
              className="flex flex-col justify-center ml-4 focus:outline-none"
            >
              <h3>Make not bill</h3>
            </button>
            <button
              onClick={handleToggle}
              className="flex flex-col justify-center ml-4 focus:outline-none"
            >
              <h3>&gt;</h3>
            </button>
          </div>
        </Flipped>
      </div>
    </Flipped>
  )
}

export default BillListItem
