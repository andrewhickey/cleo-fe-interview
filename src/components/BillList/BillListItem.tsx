/** @jsx jsx */
import { jsx } from '@emotion/core'
import defaultIcon from '../../assets/cleo_coin.jpg'
import { Bill } from '../../stores'
import { Flipped } from 'react-flip-toolkit'
import { useCallback } from 'react'
import { shouldFlip } from './utils'

type BillListItemProps = {
  bill: Bill
  onToggle: (id: string) => void
}
function BillListItem({ bill, onToggle }: BillListItemProps) {
  const handleToggle = useCallback(() => {
    onToggle(bill.id)
  }, [bill.id, onToggle])

  const totalAmount = bill.transactions.reduce(
    (runningTotal, transaction) => runningTotal + transaction.amount,
    0
  )

  return (
    <Flipped flipId={bill.id} shouldInvert={shouldFlip(bill.id)}>
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
                shouldFlip={shouldFlip(bill.id)}
                delayUntil={bill.id}
                flipId={`${bill.id}-name`}
              >
                <h3>{bill.name}</h3>
              </Flipped>
              {/* TODO, get the category info from the api */}
              <Flipped
                flipId={`${bill.id}-category`}
                shouldFlip={shouldFlip(bill.id)}
                delayUntil={bill.id}
              >
                <h3>{bill.categoryId}</h3>
              </Flipped>
            </div>
            <Flipped
              flipId={`${bill.id}-amount`}
              shouldFlip={shouldFlip(bill.id)}
            >
              <div className="flex flex-col justify-center ml-4 text-lg font-bold">
                <h3>£{totalAmount}</h3>
              </div>
            </Flipped>
            <Flipped
              flipId={`${bill.id}-open`}
              translate
              shouldFlip={shouldFlip(bill.id)}
            >
              <button
                onClick={handleToggle}
                className="flex flex-col justify-center ml-4 focus:outline-none"
              >
                <h3>&gt;</h3>
              </button>
            </Flipped>
          </div>
        </Flipped>
      </div>
    </Flipped>
  )
}

export default BillListItem
