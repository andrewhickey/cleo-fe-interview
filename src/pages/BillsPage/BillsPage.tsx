/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { BillList, Tab, Tabs } from '../../components'
import { useStores } from '../../stores'
import { StyleConstants } from '../../shared/constants'

function BillsPage() {
  const { billsStore } = useStores()
  useEffect(() => {
    billsStore.fetch()
  }, [billsStore])

  return (
    <div
      className="h-screen "
      css={{ backgroundColor: StyleConstants.colors.lightGrey }}
    >
      <Tabs>
        <Tab title="Bills">
          {billsStore.errorMessage && billsStore.errorMessage}
          <BillList bills={billsStore.bills.filter((bill) => bill.isBill)} />
        </Tab>
        <Tab title="Not Bills">
          {billsStore.errorMessage && billsStore.errorMessage}
          <BillList bills={billsStore.bills.filter((bill) => !bill.isBill)} />
        </Tab>
      </Tabs>
    </div>
  )
}

export default observer(BillsPage)
