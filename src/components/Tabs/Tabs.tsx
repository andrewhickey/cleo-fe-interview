/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import { TabProps } from './Tab'
import { StyleConstants } from '../../shared/constants'
import { Flipper, Flipped } from 'react-flip-toolkit'

type TabsProps = {
  children?: React.ReactElement<TabProps> | Array<React.ReactElement<TabProps>>
}
function Tabs({ children }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const headings = React.Children.map(children, (tab, index) => {
    if (tab) {
      const title = tab.props.title
      return (
        <div className="flex-1 bg-white shadow-sm">
          <button
            className="w-full text-center p-4 focus:outline-none"
            css={{
              transition: 'color 0.4s ease-in-out',
              color:
                index === activeIndex
                  ? StyleConstants.colors.blue
                  : StyleConstants.colors.grey,
            }}
            onClick={() => setActiveIndex(index)}
          >
            {title}
          </button>
          <Flipped flipId={index === activeIndex ? 'active' : ''}>
            <div
              className="w-full h-1"
              css={{
                backgroundColor:
                  index === activeIndex
                    ? StyleConstants.colors.blue
                    : 'transparent',
              }}
            />
          </Flipped>
        </div>
      )
    }
  })

  return (
    <div className="h-full">
      <Flipper flipKey={activeIndex}>
        <div className="flex w-full divide-x">{headings}</div>
      </Flipper>
      <div>{React.Children.toArray(children)[activeIndex]}</div>
    </div>
  )
}

export default Tabs
