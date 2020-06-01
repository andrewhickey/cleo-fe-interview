/** @jsx jsx */
import { jsx } from '@emotion/core'
import BillListItem from './BillListItem'
import BillListItemExpanded from './BillListItemExpanded'
import { Bill } from '../../stores'
import { StyleConstants } from '../../shared/constants'
import { useState, useCallback } from 'react'
import { Flipper, Flipped } from 'react-flip-toolkit'

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
    <Flipper flipKey={expandedId} decisionData={expandedId}>
      <div css={{ backgroundColor: StyleConstants.colors.lightGrey }}>
        <div className="p-6">
          <ul className="border rounded-lg overflow-hidden divide-y shadow-sm flex flex-col bg-white">
            {bills.map((bill) => (
              <li key={bill.id}>
                {expandedId === bill.id ? (
                  <BillListItemExpanded
                    bill={bill}
                    onToggle={handleClickItem}
                  />
                ) : (
                  <BillListItem bill={bill} onToggle={handleClickItem} />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Flipper>
  )
}

export default BillList
