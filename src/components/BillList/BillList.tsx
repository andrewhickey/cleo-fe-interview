/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useCallback, useState } from 'react'
import { Flipper } from 'react-flip-toolkit'
import { Bill } from '../../stores'
import BillListItem from './BillListItem'
import BillListItemExpanded from './BillListItemExpanded'

type BillListProps = {
  bills: Bill[]
  onChangeIsBill: (id: string, isBill: boolean) => Promise<void>
}
function BillList({ bills, onChangeIsBill }: BillListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleClickItem = useCallback(
    (itemId) => {
      if (expandedId === itemId) {
        setExpandedId(null)
      } else {
        setExpandedId(itemId)
      }
    },
    [expandedId, setExpandedId]
  )

  return (
    <Flipper
      className="flex-1 self-start p-6"
      spring="stiff"
      flipKey={`${expandedId} + ${bills.length}`}
      decisionData={expandedId}
      staggerConfig={{
        bill: {
          reverse: expandedId !== null,
        },
      }}
    >
      <ul className="flex flex-col">
        {bills.map((bill) => (
          <li key={bill.id}>
            {expandedId === bill.id ? (
              <BillListItemExpanded bill={bill} onToggle={handleClickItem} />
            ) : (
              <BillListItem
                bill={bill}
                onToggle={handleClickItem}
                onChangeIsBill={onChangeIsBill}
              />
            )}
          </li>
        ))}
      </ul>
    </Flipper>
  )
}

export default BillList
