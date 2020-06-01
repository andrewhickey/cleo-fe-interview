/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useCallback, useState } from 'react'
import { Flipper } from 'react-flip-toolkit'
import { Bill } from '../../stores'
import BillListItem from './BillListItem'
import BillListItemExpanded from './BillListItemExpanded'

type BillListProps = {
  bills: Bill[]
}
function BillList({ bills }: BillListProps) {
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
      flipKey={`${expandedId} + ${bills.length}`}
      decisionData={expandedId}
      staggerConfig={{
        bill: {
          reverse: expandedId !== null,
        },
      }}
    >
      <div className="p-6">
        <ul className="space-y-2 flex flex-col">
          {bills.map((bill) => (
            <li key={bill.id}>
              {expandedId === bill.id ? (
                <BillListItemExpanded bill={bill} onToggle={handleClickItem} />
              ) : (
                <BillListItem bill={bill} onToggle={handleClickItem} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </Flipper>
  )
}

export default BillList
