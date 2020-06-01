/** @jsx jsx */
import { jsx, keyframes } from '@emotion/core'
import { useCallback } from 'react'
import { Flipped } from 'react-flip-toolkit'
import defaultIcon from '../../assets/cleo_coin.jpg'
import { Bill } from '../../stores'

const appearAnimation = keyframes`
  0%   { opacity: 0; }
  100% { opacity: 1; }
`

type BillListItemExpandedProps = {
  bill: Bill
  onToggle: (id: string) => void
}
function BillListItemExpanded({ bill, onToggle }: BillListItemExpandedProps) {
  const handleToggle = useCallback(() => {
    onToggle(bill.id)
  }, [bill.id, onToggle])

  return (
    <Flipped flipId={bill.id}>
      <div className="bg-white">
        <Flipped inverseFlipId={bill.id}>
          <div className="py-4 px-6">
            <div className="flex flex-col items-center ">
              <button className="self-end" onClick={handleToggle}>
                X
              </button>
              <Flipped flipId={`${bill.id}-image`}>
                <button className="focus:outline-none" onClick={handleToggle}>
                  <img
                    className="w-20 h-20 rounded-full shadow-lg"
                    src={bill.iconUrl || defaultIcon}
                    alt={`${bill.name} logo`}
                  />
                </button>
              </Flipped>
              <Flipped flipId={`${bill.id}-name`}>
                <h3 className="text-xl font-bold mt-4">{bill.name}</h3>
              </Flipped>
              {/* TODO, get the category info from the api */}
              <Flipped flipId={`${bill.id}-category`}>
                <h3 className="text-l font-bold mt-2">{bill.categoryId}</h3>
              </Flipped>
            </div>
            <div
              className="divide-y text-left"
              css={{
                animation: `${appearAnimation} 0.4s ease-in`,
              }}
            >
              {bill.transactions.map((transaction) => (
                <div key={transaction.id} className="flex py-4 px-6">
                  <div className="flex-1 flex flex-col justify-center">
                    <h3>{transaction.date}</h3>
                  </div>
                  <div className="flex flex-col justify-center ml-4 text-lg font-bold">
                    <h3>£{transaction.amount}</h3>
                  </div>
                  <div className="flex flex-col justify-center ml-4">
                    <h3>&nbsp;</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Flipped>
      </div>
    </Flipped>
  )
}

export default BillListItemExpanded
