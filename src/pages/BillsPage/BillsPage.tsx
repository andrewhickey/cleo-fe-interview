import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { BillList, Tab, Tabs } from '../../components'
import { useStores } from '../../stores'

function BillsPage() {
  const { billsStore } = useStores()
  useEffect(() => {
    billsStore.fetch()
  }, [billsStore])

  return (
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
  )
}

export default observer(BillsPage)
