/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/core'
import { useCallback } from 'react'
import { Flipped } from 'react-flip-toolkit'
import defaultIcon from '../../assets/cleo_coin.jpg'
import { Bill } from '../../stores'
import CategoryLabel from '../CategoryLabel'

const appearAnimation = keyframes`
  from   { opacity: 0; }
  to { opacity: 1; }
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
    <Flipped
      flipId={bill.id}
      stagger="bill"
      onStart={(el) => {
        setTimeout(() => {
          el.classList.add('animate-in')
        }, 100)
      }}
    >
      <div className="bg-white border">
        <Flipped inverseFlipId={bill.id}>
          <div className="flex flex-col">
            <button
              className="py-4 px-6 flex flex-col items-center focus:outline-none"
              onClick={handleToggle}
            >
              <div className="self-end">X</div>
              <Flipped flipId={`${bill.id}-image`} delayUntil={bill.id}>
                <img
                  className="w-20 h-20 rounded-full shadow-lg"
                  src={bill.iconUrl || defaultIcon}
                  alt={`${bill.name} logo`}
                />
              </Flipped>
              <Flipped flipId={`${bill.id}-name`} delayUntil={bill.id}>
                <h3 className="text-xl font-bold mt-4">{bill.name}</h3>
              </Flipped>
              <Flipped flipId={`${bill.id}-category`} delayUntil={bill.id}>
                <CategoryLabel categoryId={bill.categoryId} />
              </Flipped>
            </button>
            <div className="divide-y text-left px-6 pb-4">
              {bill.transactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className="flex py-4 px-6"
                  css={css`
                    opacity: 0;
                    .animate-in & {
                      animation: ${appearAnimation} 0.5s forwards;
                      animation-delay: ${0.1 * index}s;
                    }
                  `}
                >
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
