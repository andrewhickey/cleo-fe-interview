import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import Tabs from './Tabs'
import Tab from './Tab'

it('renders and switches between the provided tabs', async () => {
  render(
    <Tabs>
      <Tab title="Tab1">Tab content 1</Tab>
      <Tab title="Tab2">Tab content 2</Tab>
    </Tabs>
  )

  // should default to tab 1
  expect(screen.getByText('Tab content 1')).toBeVisible()
  expect(screen.queryByText('Tab content 2')).not.toBeInTheDocument()

  // click the tab2 heading
  fireEvent.click(screen.getByText('Tab2'))
  expect(screen.queryByText('Tab content 1')).not.toBeInTheDocument()
  expect(screen.getByText('Tab content 2')).toBeVisible()

  // go back to tab1
  fireEvent.click(screen.getByText('Tab1'))
  expect(screen.getByText('Tab content 1')).toBeVisible()
  expect(screen.queryByText('Tab content 2')).not.toBeInTheDocument()
})
