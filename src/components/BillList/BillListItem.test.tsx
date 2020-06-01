import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import React from 'react'
import BillListItem from './BillListItem'
import { bills } from '../../stores'

it('Renders without crashing', async () => {
  render(<BillListItem bill={bills[0]} />)
})
