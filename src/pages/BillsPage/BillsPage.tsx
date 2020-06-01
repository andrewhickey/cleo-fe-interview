/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { BillList, Tab, Tabs } from '../../components'
import { useStores } from '../../stores'
import { StyleConstants } from '../../shared/constants'
import loadingSpinner from '../../assets/loader.gif'

function BillsPage() {
  const { billsStore } = useStores()
  useEffect(() => {
    billsStore.fetch()
  }, [billsStore])

  return (
    <div
      className="h-screen"
      css={{ backgroundColor: StyleConstants.colors.lightGrey }}
    >
      <Tabs>
        <Tab title="Bills">
          {billsStore.errorMessage && billsStore.errorMessage}
          {billsStore.fetching ? (
            <img
              src={loadingSpinner}
              alt="Loading spinner"
              className="h-20 w-20"
            />
          ) : (
            <BillList
              bills={billsStore.bills.filter((bill) => bill.isBill)}
              onChangeIsBill={billsStore.setIsBill}
            />
          )}
        </Tab>
        <Tab title="Potential bills">
          {billsStore.errorMessage && billsStore.errorMessage}
          {billsStore.fetching ? (
            <img
              src={loadingSpinner}
              alt="Loading spinner"
              className="h-20 w-20"
            />
          ) : (
            <BillList
              bills={billsStore.bills.filter((bill) => !bill.isBill)}
              onChangeIsBill={billsStore.setIsBill}
            />
          )}
        </Tab>
      </Tabs>
    </div>
  )
}

export default observer(BillsPage)
