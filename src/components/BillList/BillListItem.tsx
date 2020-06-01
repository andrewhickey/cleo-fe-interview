/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useCallback } from 'react'
import { Flipped } from 'react-flip-toolkit'
import defaultIcon from '../../assets/cleo_coin.jpg'
import { Bill } from '../../stores'
import Button from '../Button'
import CategoryLabel from '../CategoryLabel'

const shouldFlip = (id: string) => (prev: string, current: string) =>
  id === prev || id === current

type BillListItemProps = {
  bill: Bill
  onToggle: (id: string) => void
  onChangeIsBill: (id: string, isBill: boolean) => Promise<void>
}
function BillListItem({ bill, onToggle, onChangeIsBill }: BillListItemProps) {
  const handleToggle = useCallback(() => {
    onToggle(bill.id)
  }, [bill.id, onToggle])

  const handleChangeState = useCallback(() => {
    onChangeIsBill(bill.id, !bill.isBill)
  }, [bill, onChangeIsBill])

  const totalAmount = bill.transactions.reduce(
    (runningTotal, transaction) => runningTotal + transaction.amount,
    0
  )

  return (
    <Flipped flipId={bill.id} shouldInvert={shouldFlip(bill.id)} stagger="bill">
      <div className="bg-white border">
        <Flipped inverseFlipId={bill.id}>
          <div className="flex text-left">
            <button
              className="py-4 px-6 focus:outline-none"
              onClick={handleToggle}
            >
              <div className="relative">
                <Flipped
                  flipId={`${bill.id}-image`}
                  shouldFlip={shouldFlip(bill.id)}
                  delayUntil={bill.id}
                >
                  <img
                    className="w-12 h-12 rounded-full shadow-lg"
                    src={bill.iconUrl || defaultIcon}
                    alt={`${bill.name} logo`}
                  />
                </Flipped>
                {/* <div className="absolute right-0 top-0 bg-white rounded-full p-1 shadow-lg">
                    <CategoryIcon
                      className="h-3 w-3"
                      categoryId={bill.categoryId}
                    />
                  </div> */}
              </div>
            </button>
            <button
              className="flex-1 flex flex-col items-start justify-center pl-4 focus:outline-none"
              onClick={handleToggle}
            >
              <Flipped
                delayUntil={bill.id}
                shouldFlip={shouldFlip(bill.id)}
                flipId={`${bill.id}-name`}
              >
                <h3 className="font-bold">{bill.name}</h3>
              </Flipped>
              <Flipped
                delayUntil={bill.id}
                flipId={`${bill.id}-category`}
                shouldFlip={shouldFlip(bill.id)}
              >
                <CategoryLabel categoryId={bill.categoryId} />
              </Flipped>
            </button>
            <button
              className="flex flex-col justify-center pl-4 text-lg font-bold focus:outline-none"
              onClick={handleToggle}
            >
              <h3>£{totalAmount}</h3>
            </button>
            <div className="flex flex-col justify-center pl-4">
              <Button onClick={handleChangeState}>
                {bill.isBill ? 'Remove bill' : 'Add as bill'}
              </Button>
            </div>
            <button
              onClick={handleToggle}
              className="flex flex-col justify-center px-4 focus:outline-none"
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
