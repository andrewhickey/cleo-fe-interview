import 'mobx-react-lite/batchingForReactDom'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import React from 'react'
import BillListItem from './BillListItem'
import { bills, StoreProvider } from '../../stores'

it('Renders without crashing', async () => {
  render(
    <StoreProvider>
      <BillListItem
        bill={bills[0]}
        onToggle={() => {}}
        onChangeIsBill={async () => {}}
      />
    </StoreProvider>
  )
})
