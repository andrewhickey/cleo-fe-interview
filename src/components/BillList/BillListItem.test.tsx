import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import React from 'react'
import BillListItem from './BillListItem'

it('Renders without crashing', async () => {
  render(<BillListItem />)
})
