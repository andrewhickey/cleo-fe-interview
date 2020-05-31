import React from 'react'

export type TabProps = {
  title: string
}

function Tab({ title }: TabProps) {
  return <div>{title}</div>
}

export default Tab
