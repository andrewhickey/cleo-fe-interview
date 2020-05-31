import React from 'react'
import { TabProps } from './Tab'

type TabsProps = {
  children?: Array<React.ReactElement<TabProps>>
}
function Tabs({ children }: TabsProps) {
  const headings = React.Children.map(children, (tab) => {
    if (tab) {
      const title = tab.props.title
      return <div>{title}</div>
    }
  })

  return <div>{headings}</div>
}

export default Tabs
