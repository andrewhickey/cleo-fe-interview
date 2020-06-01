import React from 'react'

export type TabProps = {
  title: string
  children?: React.ReactNode
}

function Tab({ children }: TabProps) {
  return (
    <div className="flex items-center justify-center h-full">{children}</div>
  )
}

export default Tab
