/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import { TabProps } from './Tab'
import { StyleConstants } from '../../shared/constants'

type TabsProps = {
  children?: React.ReactElement<TabProps> | Array<React.ReactElement<TabProps>>
}
function Tabs({ children }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const headings = React.Children.map(children, (tab, index) => {
    if (tab) {
      const title = tab.props.title
      return (
        <div className="flex-1">
          <button
            className="w-full text-center p-4 focus:outline-none"
            css={{
              color:
                index === activeIndex
                  ? StyleConstants.colors.blue
                  : StyleConstants.colors.lightGrey,
            }}
            onClick={() => setActiveIndex(index)}
          >
            {title}
          </button>
          <div
            className="w-full h-1 border-b"
            css={{
              backgroundColor:
                index === activeIndex
                  ? StyleConstants.colors.blue
                  : 'transparent',
              borderColor:
                index === activeIndex
                  ? StyleConstants.colors.blue
                  : StyleConstants.colors.lightGrey,
            }}
          />
        </div>
      )
    }
  })

  return (
    <div>
      <div className="flex w-full">{headings}</div>
      <div>{React.Children.toArray(children)[activeIndex]}</div>
    </div>
  )
}

export default Tabs
