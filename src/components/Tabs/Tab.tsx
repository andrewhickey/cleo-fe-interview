import React from 'react'

export type TabProps = {
  title: string
  children?: React.ReactNode
}

function Tab({ children }: TabProps) {
  return <div>{children}</div>
}

export default Tab
